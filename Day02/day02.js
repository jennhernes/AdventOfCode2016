const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'))
                .toString()
                .trim()
                .split('\n');

const numpad = [['x','x','x','x','x','x','x'],
                ['x','x','x', 1 ,'x','x','x'],
                ['x','x', 2 , 3 , 4 ,'x','x'],
                ['x', 5 , 6 , 7 , 8 , 9 ,'x'],
                ['x','x','A','B','C','x','x'],
                ['x','x','x','D','x','x','x'],
                ['x','x','x','x','x','x','x']];
let button = [3,1];
let code = '';
for (const instruction of input)
{
    for (const move of instruction)
    {
        console.log(move);
        if (move === 'U')
        {
            button[0]--;
            if (numpad[button[0]][button[1]] === 'x')
            {
                button[0]++;
            }
        }
        else if (move === 'D')
        {
            button[0]++;
            if (numpad[button[0]][button[1]] === 'x')
            {
                button[0]--;
            }
        }
        if (move === 'L')
        {
            button[1]--;
            if (numpad[button[0]][button[1]] === 'x')
            {
                button[1]++;
            }
        }
        if (move === 'R')
        {
            button[1]++;
            if (numpad[button[0]][button[1]] === 'x')
            {
                button[1]--;
            }
        }
    }
    code = code.concat(numpad[button[0]][button[1]]);
}

console.log(code);