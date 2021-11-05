const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'))
                .toString()
                .trim()
                .split('\n')
                .map(x => x.split(/\[|\]/));

// console.log(input);

function part1()
{
    let numtls = 0;
    for (const ip of input)
    {
        let tls = false;
        for (let i = 0; i < ip.length; i+=2)
        {
            let segment = ip[i];
            for (let j = 0; j < segment.length - 3; j++)
            {
                if (segment[j] !== segment[j+1] && 
                    segment[j] === segment[j+3] && segment[j+1] === segment[j+2])
                {
                    tls = true;
                    break;
                }
            }
            if (tls)
            {
                break;
            }
        }

        if (!tls) 
        {
            continue;
        }
        for (let i = 1; i < ip.length; i+=2)
        {
            let segment = ip[i];
            for (let j = 0; j < segment.length - 3; j++)
            {
                if (segment[j] !== segment[j+1] && 
                    segment[j] === segment[j+3] && segment[j+1] === segment[j+2])
                {
                    tls = false;
                    break;
                }
            }
            if (!tls)
            {
                break;
            }
        }

        if (tls)
        {
            numtls++;
        }
    }

    console.log(numtls);
}

function part2()
{
    let numtls = 0;
    for (const ip of input)
    {
        let tls = false;
        let sequences = [];
        for (let i = 0; i < ip.length; i+=2)
        {
            let segment = ip[i];
            for (let j = 0; j < segment.length - 2; j++)
            {
                if (segment[j] !== segment[j+1] && segment[j] === segment[j+2])
                {
                    tls = true;
                    sequences.push(segment[j]+segment[j+1]+segment[j+2]);
                }
            }
        }

        if (!tls) 
        {
            continue;
        }
        tls = false;
        for (let i = 1; i < ip.length; i+=2)
        {
            let segment = ip[i];
            for (let j = 0; j < segment.length - 2; j++)
            {
                if (segment[j] !== segment[j+1] && segment[j] === segment[j+2]
                    && sequences.indexOf(segment[j+1]+segment[j]+segment[j+1]) !== -1)
                {
                    tls = true;
                    break;
                }
            }
            if (tls)
            {
                break;
            }
        }

        if (tls)
        {
            numtls++;
        }
    }

    console.log(numtls);
}

part2();