const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'))
                .toString()
                .trim()
                .split('\n')
                .filter(x => x !== '')
                .map(x => x.split('-'))
                .map(x => {
                    for (let i = 0; i < x.length; i++)
                    {
                        x[i] = parseInt(x[i]);
                    }
                    return x;
                })
                .sort((a,b) => a[0] - b[0]);

console.log(input);
let allowed = input[0][0];
let highest = input[0][1];
for (let i = 1; i < input.length; i++)
{
    if (highest < input[i][0])
    {
        allowed += input[i][0]-highest-1;
    }
    highest = Math.max(highest, input[i][1]);
}
if (highest < 4294967295)
    allowed += 4294967295 - highest;

console.log(allowed);