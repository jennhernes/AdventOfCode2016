const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'))
                .toString()
                .trim()
                .split('\n')
                .map(x => x.split(''));

const lettercounts = new Array(input[0].length);
for (let i = 0; i < lettercounts.length; i++)
{
    lettercounts[i] = new Array(26).fill(0);
}

for (const message of input)
{
    for (let i = 0; i < message.length; i++)
    {
        lettercounts[i][message[i].charCodeAt(0)-'a'.charCodeAt(0)]++;
    }
}

for (const char of lettercounts)
{
    console.log(String.fromCharCode(char.indexOf(Math.min(...char)) + 'a'.charCodeAt(0)));
}