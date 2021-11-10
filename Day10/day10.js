const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'))
                .toString()
                .split('\n')
                .filter(x => x !== '');

let robots = new Map();
let rules = [];
for (const instr of input)
{
    const tokens = instr.split(' ');
    if (tokens[0] === 'value')
    {
        const r = parseInt(tokens[tokens.length-1]);
        if (!robots.has(r))
        {
            robots.set(r, []);
        }
        robots.get(r).push(parseInt(tokens[1]));
    }
    else 
    {
        rules.push({bot: parseInt(tokens[1]), low: parseInt(tokens[6]), high: parseInt(tokens[11])});
        
        if (tokens[5] === 'output')
        {
            rules[rules.length-1].low = -1 * (rules[rules.length-1].low + 1);
        }
        else 
        {
            if (!robots.has(parseInt(tokens[6])))
            {
                robots.set(parseInt(tokens[6]), []);
            }
        }
        if (tokens[10] === 'output')
        {
            rules[rules.length-1].high = -1 * (rules[rules.length-1].high + 1);
        }
        else 
        {
            if (!robots.has(parseInt(tokens[11])))
            {
                robots.set(parseInt(tokens[11]), []);
            }
        }
    }
}
console.log(robots);
// console.log(rules);
let done = false;
let seventeen = new Set();
let sixtyone = new Set();
let result = 1;

while (!done)
{
    done = true;
    for (const bot of robots.keys())
    {
        const chips = robots.get(bot);
        // console.log(chips);
        if (chips.indexOf(61) > -1)
        {
            sixtyone.add(bot);
        }
        if (chips.indexOf(17) > -1)
        {
            seventeen.add(bot);
        }
        
        if (chips.indexOf(61) > -1 && chips.indexOf(17) > -1)
        {
            console.log(bot);
        }

        if (chips.length == 2)
        {
            done = false;
            const botrule = rules.filter(x => x.bot === bot)[0];
            // console.log(`${bot}: ${chips[0]}, ${chips[1]}`);
            // console.log(botrule);
            if (chips[0] > chips[1])
            {
                if (botrule.high >= 0)
                {
                    robots.get(botrule.high).push(chips[0]);
                }
                else if (botrule.high === -1 || botrule.high === -2 || botrule.high === -3) {
                    result *= chips[0];
                }
                if (botrule.low >= 0)
                {
                    robots.get(botrule.low).push(chips[1]);
                }
                else if (botrule.low === -1 || botrule.low === -2 || botrule.low === -3) {
                    result *= chips[1];
                }
            }
            else 
            {
                if (botrule.high >= 0)
                {
                    robots.get(botrule.high).push(chips[1]);
                }
                else if (botrule.high === -1 || botrule.high === -2 || botrule.high === -3) {
                    result *= chips[1];
                }
                if (botrule.low >= 0)
                {
                    robots.get(botrule.low).push(chips[0]);
                }
                else if (botrule.low === -1 || botrule.low === -2 || botrule.low === -3) {
                    result *= chips[0];
                }
            }
            robots.set(bot, []);
        }
    }
}

console.log(result);
// console.log(seventeen);
// console.log(sixtyone);
