// create node class

class Node {
    constructor(value) {
        // value given will be an array
        this.data = value;
        this.parent = null;
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
        this.found = null;
    }

    buildTree(finalPosition = this.end,startPosition = this.start) {
        const queue = [this.root];
        const array = [];
        const checkList = []
        if (startPosition[0] == finalPosition[0] && startPosition[1] == finalPosition[1]) {
                return;
        }
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
                currentNode.leftFour.parent = currentNode.leftThree.parent = currentNode.leftTwo.parent = currentNode.leftOne.parent = currentNode.rightOne.parent = currentNode.rightTwo.parent = currentNode.rightThree.parent = currentNode.rightFour.parent = currentNode;
                // add each node to queue
                queue.push(currentNode.leftFour,currentNode.leftThree,currentNode.leftTwo,currentNode.leftOne,currentNode.rightOne,currentNode.rightTwo,currentNode.rightThree,currentNode.rightFour);
                // check at end if any of the leaves matches finalPosition
                checkList.push(currentNode.leftFour,currentNode.leftThree,currentNode.leftTwo,currentNode.leftOne,currentNode.rightOne,currentNode.rightTwo,currentNode.rightThree,currentNode.rightFour);
                for (const node of checkList) {
                    if (node.data !== null) {
                        if (node.data[0] == finalPosition[0] && node.data[1] == finalPosition[1]) {
                            this.found = node;
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

    shortestPath(path=[]) {
        let parent = this.found;
        path.push(parent.data)
        while (parent.parent !== null) {
            parent = parent.parent;
            if (parent !== null) {
                path.push(parent.data)
            }
        }
        return path.reverse();
    }
}

export function runCheck(firstPosition,secondPosition) {
    const tree = new Tree(firstPosition,secondPosition);
    tree.buildTree();
    return tree.shortestPath();
}