// create node class

class Node {
    constructor(value) {
        // value given will be an array
        this.data = value;
        this.leftFour = null; // + (-2,-1)
        this.leftThree = null; // + (-1,-2)
        this.leftTwo = null; // + (-2,1)
        this.leftOne = null; // + (-1,2)
        this.rightOne = null; // + (2,-1)
        this.rightTwo = null; // + (1,-2)
        this.rightThree = null; // + (2,1)
        this.rightFour = null; // + (1,2)
    }
}

class Tree {
    constructor(originalPosition,finalPosition) {
        this.root = new Node(originalPosition);
        this.start = originalPosition;
        this.end = finalPosition;
    }

    buildTree(finalPosition = this.end,startPosition = this.start) {
        const queue = [this.root];
        const array = [];
        const checkList = []
        if (startPosition[0] == finalPosition[0] && startPosition[1] == finalPosition[1]) {
            console.log('done')
            return;
        }
        // for (let i=0;i<1;i++)
        while(queue.length>0) {
            const currentNode = queue.shift();
            if (currentNode.data !== null) {
                array.push(currentNode.data);
                // add coordinates to each property of Node
                currentNode.leftFour = new Node(this.evaluatePosition(currentNode.data,[-2,-1]));
                currentNode.leftThree = new Node(this.evaluatePosition(currentNode.data,[-1,-2]));
                currentNode.leftTwo = new Node(this.evaluatePosition(currentNode.data,[-2,1]));
                currentNode.leftOne = new Node(this.evaluatePosition(currentNode.data,[-1,2]));
                currentNode.rightOne = new Node(this.evaluatePosition(currentNode.data,[2,-1]));
                currentNode.rightTwo = new Node(this.evaluatePosition(currentNode.data,[1,-2]));
                currentNode.rightThree = new Node(this.evaluatePosition(currentNode.data,[2,1]));
                currentNode.rightFour = new Node(this.evaluatePosition(currentNode.data,[1,2]));
                // add each node to queue
                queue.push(currentNode.leftFour,currentNode.leftThree,currentNode.leftTwo,currentNode.leftOne,currentNode.rightOne,currentNode.rightTwo,currentNode.rightThree,currentNode.rightFour);
                // check at end if any of the leaves matches finalPosition
                checkList.push(currentNode.leftFour,currentNode.leftThree,currentNode.leftTwo,currentNode.leftOne,currentNode.rightOne,currentNode.rightTwo,currentNode.rightThree,currentNode.rightFour);
                for (const node of checkList) {
                    if (node.data !== null) {
                        if (node.data[0] == finalPosition[0] && node.data[1] == finalPosition[1]) {
                            return;
                        }
                    }
                }
                checkList.splice(0,checkList.length);
            } else continue;
        }
    }

    evaluatePosition(startPosition,operation) {
        const newPosition = [startPosition[0]+operation[0],startPosition[1]+operation[1]];
        if (newPosition[0] > 7 || newPosition[0] < 0 || newPosition[1] > 7 || newPosition[1] < 0) {
            return null;
        } else {
            return newPosition;
        }
    }

    shortestPath(array=[],queue=[this.root],length=0) {
        // use algorithm to find shortest path
        // use level order traversal
        while (queue.length > 0) {
            let results = [];
            for (let i=0;i<(8**length);i++) {
                const currentNode=queue.shift();
                if (currentNode == null) {
                    results.push(null)
                    for (let i = 0;i<8;i++) {
                        queue.push(null);
                    }
                    continue;
                };
                results.push(currentNode.data);
                queue.push(currentNode.leftFour,currentNode.leftThree,currentNode.leftTwo,currentNode.leftOne,currentNode.rightOne,currentNode.rightTwo,currentNode.rightThree,currentNode.rightFour);
            }
            
            array[length] = results;
            for (const item of results) {
                if ((item !== null) && (item[0] == this.end[0] && item[1] == this.end[1])) {
                    // find index of current result
                    // since idx will always be in array[length], or the last array of the array
                    // go to array[length - 1] and use idx
                    let path = [];
                    path.push(item);
                    let idx = results.indexOf(item)
                    length--;
                    while (length >= 0) {
                        idx = Math.trunc(idx/8);
                        path.push(array[length--][idx])
                    }
                    return path.reverse();
                }
            }
            length++;
        }
    }
}

export function runCheck() {
    const tree = new Tree([3,3],[4,3]);
    tree.buildTree();
    console.log(tree.shortestPath());
}