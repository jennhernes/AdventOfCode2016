// const od = 10;
// const y = 4;
// const x = 7;
// const extra = 5;
const od = 1358;
const y = 39;
const x = 31;
const extra = 11;
const destination = [y,x];

const map = new Array(y+extra);
for (let i = 0; i < map.length; i++)
{
    map[i] = new Array(x+extra).fill('#');
}
for (let i = 0; i < y+extra; i++)
{
    for (let j = 0; j < x+extra; j++)
    {
        const space = (j*j + 3*j + 2*j*i + i + i*i + od).toString(2);
        const count = (space.match(/1/g) || []).length;
        console.log(`${space}: ${count}`);
        if (count % 2 === 0)
        {
            map[i][j] = '.';
        }
    }
}

const tree = new Map();
tree.set(0, [[[1,1]]]);
let layer = 0;
let found = false;

// while (!found)
while (layer < 50)
{
    let prev = tree.get(layer);
    tree.set(layer+1, new Array());
    
    for (let i = 0; i < prev.length; i++)
    {
        let path = prev[i];
        let last = path[path.length-1];

        // if ((last[0]+1 === y && last[1] === x) || (last[0]-1 === y && last[1] === x) 
        //     || (last[0] === y && last[1]+1 === x) || (last[0] === y && last[1]-1 === x))
        // {
        //     console.log(layer+1);
        //     found = true;
        //     break;
        // }
        
        if (last[0] + 1 < map.length && map[last[0]+1][last[1]] === '.' 
            && path.filter(x => x[0] === last[0]+1 && x[1] === last[1]).length === 0)
        {
            const temp = path.slice(0);
            temp.push([last[0]+1, last[1]]);
            tree.get(layer+1).push(temp);
        }
        if (last[0] - 1 >= 0 && map[last[0]-1][last[1]] === '.' 
            && path.filter(x => x[0] === last[0]-1 && x[1] === last[1]).length === 0)
        {
            const temp = path.slice(0);
            temp.push([last[0]-1, last[1]]);
            tree.get(layer+1).push(temp);
        }
        if (last[1] + 1 < map[0].length && map[last[0]][last[1]+1] === '.' 
            && path.filter(x => x[0] === last[0] && x[1] === last[1]+1).length === 0)
        {
            const temp = path.slice(0);
            temp.push([last[0], last[1]+1]);
            tree.get(layer+1).push(temp);
        }
        if (last[1] - 1 >= 0 && map[last[0]][last[1]-1] === '.' 
            && path.filter(x => x[0] === last[0] && x[1] === last[1]-1).length === 0)
        {
            const temp = path.slice(0);
            temp.push([last[0], last[1]-1]);
            tree.get(layer+1).push(temp);
        }
    }
    layer++;
}

let locations = new Set();
for (const layer of tree.keys())
{
    let paths = tree.get(layer);
    for (const path of paths)
    {
        for (const pos of path)
        {
            locations.add(pos[0].toString().concat(',').concat(pos[1].toString()));
        }
    }
}

console.log(locations.size);