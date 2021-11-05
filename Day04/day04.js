const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'))
                .toString()
                .trim()
                .split('\n')
                .map(x => x.split('['))
                .map(x => [x[0],x[1] = x[1].slice(0, x[1].length-1)])

// console.log(input);

// let sum = 0;
const validrooms = [];
for (const room of input)
{
    const splitindex = room[0].lastIndexOf('-');
    const name = room[0].slice(0, splitindex);
    let lettercounts = new Array(26).fill(0);
    for (const letter of name)
    {
        if (letter.match(/[a-z]/))
        {
            lettercounts[letter.charCodeAt(0) - 'a'.charCodeAt(0)]++;;
        }
    }
    let checksum = [[0,lettercounts[0]]];
    for (let i = 1; i < 26; i++)
    {
        for (let j = 0; j < checksum.length; j++)
        {
            if (lettercounts[i] > checksum[j][1]
                || (lettercounts[i] === checksum[j][1] && i < checksum[j][0]))
            {
                checksum.splice(j,0,[i,lettercounts[i]]);
                if (checksum.length > 5)
                {
                    checksum = checksum.slice(0,5);
                }
                break;
            }
        }
        if (checksum.length < 5 && checksum.filter(x => x[0] === i).length === 0)
        {
            checksum.push([i, lettercounts[i]]);
        }
    }

    let match = true;
    for (let i = 0; i < checksum.length; i++)
    {
        if (checksum[i][0] !== room[1][i].charCodeAt(0) - 'a'.charCodeAt(0))
        {
            match = false;
            break;
        }
    }
    if (match) 
    {
        // console.log(room[0].slice(splitindex+1));
        // sum += parseInt(room[0].slice(splitindex+1));
        validrooms.push([room[0].slice(0,splitindex), parseInt(room[0].slice(splitindex+1))]);
    }
}

for (const room of validrooms)
{
    let shift = room[1] % 26;
    let realname = '';
    for (const c of room[0])
    {
        if (c.match(/[a-z]/))
        {
            realname = realname.concat(String.fromCharCode((c.charCodeAt(0) - 'a'.charCodeAt(0) + shift) % 26 + 'a'.charCodeAt(0)));
        }
        else
        {
            realname = realname.concat(c);
        }
    }
    console.log(realname + " " + room[1]);
}

// console.log(sum);
                