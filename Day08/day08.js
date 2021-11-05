const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'))
                .toString()
                .trim()
                .split('\n')
                .map(x => x.split(' '));

// console.log(input);

let screen = new Array(6);
for (let i = 0; i < screen.length; i++)
{
    screen[i] = new Array(50).fill('.');
}
for (const instruction of input)
{
    if (instruction[0] === 'rect')
    {
        const rect = instruction[1].split('x').map(x => parseInt(x));
        console.log(rect)
        for (let i = 0; i < rect[1]; i++)
        {
            for (let j = 0; j < rect[0]; j++)
            {
                screen[i][j] = '#';
            }
        }
    }
    else if (instruction[0] === 'rotate')
    {
        if (instruction[1] === 'row')
        {
            const row = parseInt(instruction[2].split('=')[1]);
            const shift = parseInt(instruction[4]);

            let s = '';
            for (const pixel of screen[row])
            {
                s = s.concat(pixel);
            }

            for (let i = 0; i < screen[row].length; i++)
            {
                screen[row][i] = s[(i + s.length - shift) % s.length];
            }
        }
        else if (instruction[1] === 'column')
        {
            const col = parseInt(instruction[2].split('=')[1]);
            const shift = parseInt(instruction[4]);
            let s = '';
            for (const row of screen)
            {
                s = s.concat(row[col]);
            }
            console.log(col + ' ' + shift + ' ' + s);
            for (let i = 0; i < screen.length; i++)
            {
                screen[i][col] = s[(i + s.length - shift) % s.length];
            }
        }
    }
    for (const row of screen)
    {
        console.log(row.join(''));
    }
    console.log();
}

let lit = 0;
for (let i = 0; i < screen.length; i++)
{
    for (let j = 0; j < screen[i].length; j++)
    {
        if (screen[i][j] === '#')
        {
            lit++;
        }
    }
}

console.log(lit);