const crypto = require('crypto');

const input = 'ojvtpuvg';
// const input = 'abc';

let password = ['x','x','x','x','x','x','x','x'];
let index = 0;
for (let i = 0; i < 8; i++)
{
    console.log(i);
    while (true)
    {
        let hash = crypto.createHash('md5').update(input.concat(index)).digest('hex').toString();
        index++;
        if (hash.slice(0,5) === '00000')
        {
            console.log(hash[5] + " " + hash[6]);
            if (hash[5].match(/[0-7]/) && password[hash[5]] === 'x')
            {
                password[parseInt(hash[5])] = hash[6];
                break;
            }
        }
    }
}
console.log(password);