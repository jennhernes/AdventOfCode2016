const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'))
                .toString()
                .trim()
                .split('\n')
                .map(x => x.split(' '))
                .map(x => x.filter(y => y !== ''))
                .map(x => x.map(y => y = parseInt(y)));

function part1()
{
    let numvalid = 0;
    for (const triangle of input)
    {
        if (triangle[0] + triangle[1] > triangle[2]
            && triangle[1] + triangle[2] > triangle[0]
            && triangle[0] + triangle[2] > triangle[1])
        {
            numvalid++;
        }
    }
    console.log(numvalid);
}

function part2()
{
    let numvalid = 0;
    for (let i = 0; i < input.length - 2; i+=3)
    {
        for (let j = 0; j < 3; j++)
        {
            if (input[i][j] + input[i+1][j] > input[i+2][j]
                &&input[i][j] + input[i+2][j] > input[i+1][j]
                &&input[i+1][j] + input[i+2][j] > input[i][j])
            {
                numvalid++;
            }
        }
    }
    console.log(numvalid);
}

part2();