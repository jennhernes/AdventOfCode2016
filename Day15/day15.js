const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'))
                .toString()
                .trim()
                .split('\n')
                .filter(x => x !== '')
                .map(x => x.split(' '));

for (let i = 0; i < input.length; i++)
{
    input[i] = [parseInt(input[i][3]), parseInt(input[i][11].slice(0,-1))];
}
input.push([11, 0]);

let time = 0;
let won = false;
while (!won)
{
    won = true;
    for (let i = 0; i < input.length; i++)
    {
        if ((input[i][1] + time + i) % input[i][0] !== 0)
        {
            won = false;
            break;
        }
    }
    time++;
}

console.log(time-2);