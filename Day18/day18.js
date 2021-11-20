const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'))
                .toString()
                .trim();

let hallway = [input];
let count = 0;

for (let i = 0; i < input.length; i++)
{
    if (input[i] === '.') count++;
}

for (let i = 0; i < 399999; i++)
{
    hallway.push('');
    for (let j = 0; j < input.length; j++)
    {
        let left = '.';
        if (j > 0) left = hallway[i][j-1];
        let centre = hallway[i][j];
        let right = '.';
        if (j < input.length - 1) right = hallway[i][j+1];

        if (left !== right)
        {
            hallway[i+1] += '^';
        }
        else
        {
            hallway[i+1] += '.';
            count++;
        }
    }
}

console.log(count);