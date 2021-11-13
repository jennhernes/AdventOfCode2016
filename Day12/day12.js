const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'))
                .toString()
                .split('\n')
                .filter(x => x !== '')
                .map(x => x.split(' '));

console.log(input);
let a = 0;
let b = 0;
let c = 1;
let d = 0;
for (let i = 0; i < input.length; i++)
{
    const instr = input[i];
    // console.log(`${i}: ${instr}`);
    if (instr[0] === 'cpy' && instr[1] !== instr[2])
    {
        let temp = 0;
        if (instr[1] === 'a')
        {
            temp = a;
        }
        else if (instr[1] === 'b')
        {
            temp = b;
        }
        else if (instr[1] === 'c')
        {
            temp = c;
        }
        else if (instr[1] === 'd')
        {
            temp = d;
        }
        else 
        {
            temp = parseInt(instr[1]);
        }

        if (instr[2] === 'a')
        {
            a = temp;
        }
        else if (instr[2] === 'b')
        {
            b = temp;
        }
        else if (instr[2] === 'c')
        {
            c = temp;
        }
        else if (instr[2] === 'd')
        {
            d = temp;
        }
    }
    else if (instr[0] === 'inc')
    {
        if (instr[1] === 'a')
        {
            a++;
        }
        else if (instr[1] === 'b')
        {
            b++;
        }
        else if (instr[1] === 'c')
        {
            c++;
        }
        else if (instr[1] === 'd')
        {
            d++;
        }
    }
    else if (instr[0] === 'dec')
    {
        if (instr[1] === 'a')
        {
            a--;
        }
        else if (instr[1] === 'b')
        {
            b--;
        }
        else if (instr[1] === 'c')
        {
            c--;
        }
        else if (instr[1] === 'd')
        {
            d--;
        }
    }
    else if (instr[0] === 'jnz')
    {
        if ((instr[1] === 'a' && a != 0)
            || (instr[1] === 'b' && b != 0)
            || (instr[1] === 'c' && c != 0)
            || (instr[1] === 'd' && d != 0)
            || (instr[1] !== 'a' && instr[1] !== 'b' && instr[1] !== 'c' 
                && instr[1] !== 'd' && instr[1] !== '0'))
        {
            i += parseInt(instr[2]) - 1;
        }
    }
    // console.log(`a=${a}, b=${b}, c=${c}, d=${d}`);
}

console.log(a);