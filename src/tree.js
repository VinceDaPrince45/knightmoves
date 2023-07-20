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

    buildTree(finalPosition = this.end,startPosition = this.root) {
        const queue = [startPosition];
        const array = [];
        const checkList = []
        let result;
        if (startPosition == finalPosition) {
            result = 'done';
            return result;
        }
        while(queue.length>0) {
            const currentNode = queue.shift();
            if (currentNode.value !== null) {
                array.push(currentNode.data);
                // add coordinates to each property of Node
                    // check if node is within the gameboard, from: [0-7,0-7]
                currentNode.leftFour = this.evaluatePosition([-2,-1]);
                currentNode.leftThree = this.evaluatePosition([-1,-2]);
                currentNode.leftTwo = this.evaluatePosition([-2,1]);
                currentNode.leftOne = this.evaluatePosition([-1,2]);
                currentNode.rightOne = this.evaluatePosition([2,-1]);
                currentNode.rightTwo = this.evaluatePosition([1,-2]);
                currentNode.rightThree = this.evaluatePosition([2,1]);
                currentNode.rightFour = this.evaluatePosition([1,2]);
                // check at end if any of the leaves matches finalPosition
                checkList.push(currentNode.leftFour,currentNode.leftThree,currentNode.leftTwo,currentNode.leftOne,currentNode.rightOne,currentNode.rightTwo,currentNode.rightThree,currentNode.rightFour);
                for (const node of checkList) {
                    if (node == finalPosition) {
                        
                    }
                }
            }
        }
        return result
    }

    evaluatePosition(operation,startPosition=this.start,finalPosition=this.end) {
        const newPosition = [startPosition[0]+operation[0],startPosition[1]+operation[1]];
        if (newPosition[0] > 7 || newPosition[0] < 0 || newPosition[1] > 7 || newPosition[1] < 0) {
            return null;
        } else {
            return newPosition;
        }
    }

    evalulateAll(array) {
        for (const item of array) {
            if (item.value == 'found') {
                return 'done';
            }
        }
        return;
    }
}