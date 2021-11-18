const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const salt = 'ngcjuoqr';
// const salt = 'abc';

let keys = [];
let index = 0;
let hashes = [];
let hash = '';
while(true)
{
    if (hashes[index])
        hash = hashes[index];
    else
    {
        hash = crypto.createHash('md5').update(salt.concat(index)).digest('hex').toString().toLowerCase();
        for (let i = 0; i < 2016; i++)
        {
            hash = crypto.createHash('md5').update(hash).digest('hex').toString().toLowerCase();
        }
        hashes[index] = hash;
    }
    let repeated = hash.match(/(.)\1{2}/);
    if (repeated !== null)
    {
        // console.log(repeated[1]);
        let found = false;
        for (let i = 1; i < 1001; i++)
        {
            if (hashes[index+i])
                hash = hashes[index+i];
            else
            {
                hash = crypto.createHash('md5').update(salt.concat(index+i)).digest('hex').toString().toLowerCase();
                for (let i = 0; i < 2016; i++)
                {
                    hash = crypto.createHash('md5').update(hash).digest('hex').toString().toLowerCase();
                }
                hashes[index+i] = hash;
            }
            let second = hash.match(/(.)\1{4}/);
            if (second && second[1] === repeated[1])
            {
                found = true;
                break;
            }
        }
        if (found)
        {
            keys.push(index);
            console.log(index);
            if (keys.length === 64)
            {
                break;
            }
        }
    }
    index++;
}