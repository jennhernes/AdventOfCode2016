const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'))
                .toString()
                .trim()
                .replace(/\s/g, '');

console.log(input.length);
let dlen = calculatelength(input);

function calculatelength(sequence)
{
    let index = sequence.indexOf('(');
    if (index === -1)
    {
        sequence.replace(/\s/g, '');
        return sequence.length;
    }
    else 
    {
        let result = index;
        let end = sequence.indexOf(')', index);
        if (end === -1)
        {
            result += sequence.slice(index).replace(/\s/g, '').length;
            return result;
        }
        let marker = sequence.slice(index+1, end).split('x');
        result += parseInt(marker[1]) * calculatelength(sequence.slice(end+1, end+1+parseInt(marker[0])))
                    + calculatelength(sequence.slice(end+1+parseInt(marker[0])));
        return result;
    }
}

console.log(dlen);