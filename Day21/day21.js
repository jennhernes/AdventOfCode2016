const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'))
                .toString()
                .trim()
                .split('\n')
                .filter(x => x !== '')
                .map(x => x.split(' '));

function partone()
{                
    let password = ['a','b','c','d','e','f','g','h'];
    for (const op of input)
    {
        if (op[0] === 'swap')
        {
            if (op[1] === 'position')
            {
                let x = parseInt(op[2]);
                let y = parseInt(op[5]);
                let temp = password[x];
                password[x] = password[y];
                password[y] = temp;
            }
            else 
            {
                for (let i = 0; i < password.length; i++)
                {
                    if (password[i] === op[2]) password[i] = op[5];
                    else if (password[i] === op[5]) password[i] = op[2];
                }
            }
        }
        else if (op[0] === 'rotate')
        {
            if (op[1] === 'left')
            {
                let shift = parseInt(op[2]);
                password = password.slice(shift).concat(password.slice(0, shift));
            }
            else if (op[1] === 'right')
            {
                let shift = parseInt(op[2]);
                password = password.slice(-1 * shift).concat(password.slice(0,-1 * shift));
            }
            else
            {
                let shift = password.indexOf(op[6]) + 1;
                if (shift > 4) shift++;
                shift %= password.length;
                password = password.slice(-1 * shift).concat(password.slice(0,-1 * shift));
            }
        }
        else if (op[0] === 'reverse')
        {
            let left = parseInt(op[2]);
            let right = parseInt(op[4]);
            for (let i = left, j = right; i < j; i++, j--)
            {
                let temp = password[i];
                password[i] = password[j];
                password[j] = temp;
            }
        }
        else if (op[0] === 'move')
        {
            let x = parseInt(op[2]);
            let y = parseInt(op[5]);
            let letter = password.splice(x, 1)[0];
            password.splice(y,0, letter);
        }
        console.log(password)
    }
}

function parttwo()
{
    let password = ['f','b','g','d','c','e','a','h'];
    // let password = ['d','e','c','a','b'];
    for (let i = input.length - 1; i >= 0; i--)
    {
        let op = input[i];
        if (op[0] === 'swap')
        {
            if (op[1] === 'position')
            {
                let x = parseInt(op[2]);
                let y = parseInt(op[5]);
                let temp = password[x];
                password[x] = password[y];
                password[y] = temp;
            }
            else 
            {
                for (let i = 0; i < password.length; i++)
                {
                    if (password[i] === op[2]) password[i] = op[5];
                    else if (password[i] === op[5]) password[i] = op[2];
                }
            }
        }
        else if (op[0] === 'rotate')
        {
            if (op[1] === 'left')
            {
                let shift = parseInt(op[2]);
                password = password.slice(-1 * shift).concat(password.slice(0,-1 * shift));
            }
            else if (op[1] === 'right')
            {
                let shift = parseInt(op[2]);
                password = password.slice(shift).concat(password.slice(0, shift));
            }
            else
            {
                let shift = password.indexOf(op[6]);
                if (shift % 2 === 0) shift += password.length;
                shift = Math.floor(shift/2) + 1;
                shift %= password.length;
                password = password.slice(shift).concat(password.slice(0, shift));
            }
        }
        else if (op[0] === 'reverse')
        {
            let left = parseInt(op[2]);
            let right = parseInt(op[4]);
            for (let i = left, j = right; i < j; i++, j--)
            {
                let temp = password[i];
                password[i] = password[j];
                password[j] = temp;
            }
        }
        else if (op[0] === 'move')
        {
            let y = parseInt(op[2]);
            let x = parseInt(op[5]);
            let letter = password.splice(x, 1)[0];
            password.splice(y,0, letter);
        }
    }
    console.log(password)
}

parttwo();