class ListNode 
{
    constructor(data) 
    {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

class LinkedList
{
    constructor(head = null)
    {
        this.head = head;
        this.tail = head;
        this.size = 0;
        if (head) this.size = 1;
    }

    add (data)
    {
        let node = new ListNode(data);

        if (this.head == null)
            this.head = node;
        else 
        {
            let current = this.tail;

            current.next = node;
            node.prev = current;
        }
        this.tail = node;
        this.size++;
    }

    delete (node)
    {
        let prev = node.prev;
        let next = node.next;
        if (prev)
        {
            prev.next = next;
        }
        else
        {
            this.head = node.next;
        }
        if (next)
        {
            next.prev = prev;
        }
        else 
        {
            this.tail = prev;
        }
        this.size--;
    }

    find (data)
    {
        let current = this.head;
        while (current !== null && current.data != data)
        {
            current = current.next;
        }

        return current;
    }
}

const input = 3012210;
let elves = new LinkedList();
for (let i = 1; i < input+1; i++)
{
    elves.add(i);
}

let index = Math.floor((elves.size) / 2);
let acrossprev = elves.find(index);
elves.delete(acrossprev.next);
while (elves.size > 1)
{
    if (elves.size % 2 === 0) 
    {
        acrossprev = acrossprev.next;
    }
    if (!acrossprev) acrossprev = elves.head;

    if (!acrossprev.next) elves.delete(elves.head);
    else elves.delete(acrossprev.next);
}

console.log(`${input}: ${elves.head.data}`);