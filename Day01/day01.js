const path = require('path');
const fs = require('fs');

const instructions = fs.readFileSync(path.join(__dirname, 'input.txt'))
                        .toString()
                        .split(', ');
console.log(instructions);
let direction = [0,0]; // e,n
let locations = ['(0,0)'];
let facing = 'n';
for (const instruction of instructions)
{
    if (facing === 'n' && instruction[0] === 'L'
        || facing === 's' && instruction[0] === 'R')
    {
        facing = 'w';
    }
    else if (facing === 'n' && instruction[0] === 'R'
            || facing === 's' && instruction[0] === 'L')
    {
        facing = 'e'
    }
    else if (facing === 'e' && instruction[0] === 'L'
            || facing === 'w' && instruction[0] === 'R')
    {
        facing = 'n';
    }
    else if (facing === 'e' && instruction[0] === 'R'
            || facing === 'w' && instruction[0] === 'L')
    {
        facing = 's';
    }

    const distance = parseInt(instruction.slice(1));
    let dup = false;
    if (facing === 'n')
    {
        for (let i = 1; i < distance + 1; i++)
        {
            if (locations.indexOf(`(${direction[0]},${direction[1]+i})`) !== -1)
            {
                dup = true;
                locations.push(`(${direction[0]},${direction[1]+i})`);
                break;
            }
            locations.push(`(${direction[0]},${direction[1]+i})`);
        }
        direction[1] += distance;
    }
    else if (facing === 's')
    {
        for (let i = 1; i < distance + 1; i++)
        {
            if (locations.indexOf(`(${direction[0]},${direction[1]-i})`) !== -1)
            {
                dup = true;
                locations.push(`(${direction[0]},${direction[1]-i})`);
                break;
            }
            locations.push(`(${direction[0]},${direction[1]-i})`);
        }
        direction[1] -= distance;
    }
    else if (facing === 'e')
    {
        for (let i = 1; i < distance + 1; i++)
        {
            if (locations.indexOf(`(${direction[0]+i},${direction[1]})`) !== -1)
            {
                dup = true;
                locations.push(`(${direction[0]+i},${direction[1]})`);
                break;
            }
            locations.push(`(${direction[0]+i},${direction[1]})`);
        }
        direction[0] += distance;
    }
    else if (facing === 'w')
    {
        for (let i = 1; i < distance + 1; i++)
        {
            if (locations.indexOf(`(${direction[0]-i},${direction[1]})`) !== -1)
            {
                dup = true;
                locations.push(`(${direction[0]-i},${direction[1]})`);
                break;
            }
            locations.push(`(${direction[0]-i},${direction[1]})`);
        }
        direction[0] -= distance;
    }

    console.log(locations);
    if (dup)
    {
        direction = locations[locations.length-1].split(',');
        direction[0] = parseInt(direction[0].slice(1));
        direction[1] = parseInt(direction[1].slice(0, direction[1].length-1));
        console.log(direction);
        break;
    }

}

console.log(Math.abs(direction[0]) + Math.abs(direction[1]));