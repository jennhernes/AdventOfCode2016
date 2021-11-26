const path = require('path');
const fs = require('fs');
const { sign } = require('crypto');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'))
                .toString()
                .split('\n')
                .filter(x => x !== '')
                .map(x => x.split(' '));

console.log(input);
let a = 12;
let b = 0;
let c = 0;
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
            if (instr[2] === 'a')
            {
                i += a;
            }
            else if (instr[2] === 'b')
            {
                i += b;
            }
            else if (instr[2] === 'c')
            {
                i += c;
            }
            else if (instr[2] === 'd')
            {
                i += d;
            }
            else
            {
                i += parseInt(instr[2]);
            }
            i--;
        }
    }
    else if(instr[0] === 'tgl')
    {
        let shift = 0;
        if (instr[1] === 'a') 
        {
            shift = a;
        }
        else if (instr[1] === 'b')
        {
            shift = b;
        }
        else if (instr[1] === 'c') 
        {
            shift = c;
        }
        else if (instr[1] === 'd')
        {
            shift = d;
        }
        else
        {
            shift = parseInt(instr[1]);
        }
        
        if (i+shift < 0 || i+shift >= input.length) 
        {
            continue;
        }

        const old = input[i+shift][0];
        let change = '';
        if (old === 'inc') change = 'dec';
        else if (old === 'dec') change = 'inc';
        else if (old === 'tgl') change = 'inc';
        else if (old === 'cpy') change = 'jnz';
        else if (old === 'jnz') change = 'cpy';

        input[i+shift][0] = change;
    }
    // console.log(input);
    // console.log(`a=${a}, b=${b}, c=${c}, d=${d}`);
}

console.log(input);
console.log(`a=${a}, b=${b}, c=${c}, d=${d}`);