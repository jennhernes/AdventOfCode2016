let bits = '10111011111001111';
// const disksize = 272;
const disksize = 35651584;
// let bits = '10000';
// const disksize = 20;

while (bits.length < disksize)
{
    const a = bits;
    let b = '';

    for (let i = a.length-1; i >= 0; i--)
    {
        if (a[i] === '0')
            b = b.concat('1');
        else
            b = b.concat('0');
    }

    bits = a + '0' + b;
}
// console.log(bits === '10000011110010000111110');
bits = bits.slice(0, disksize);
// console.log(bits);
let checksum = '';
while (checksum === '' || checksum.length % 2 === 0)
{
    checksum = '';
    for (let i = 0; i < bits.length; i += 2)
    {
        if (bits[i] === bits[i+1])
        {
            checksum = checksum.concat('1');
        }
        else 
        {
            checksum = checksum.concat('0');
        }
    }
    bits = checksum;
}

console.log(checksum);