'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (start, end) => {
  // Your code here
  let temp = stacks[start].pop();
  stacks[end].push(temp);


}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (start, end) => {
  // Your code here
  //console.log(stacks[start][stacks[start].length-1]);
  //console.log(stacks[end][stacks[end].length])
  start = start.toLowerCase().trim();
  end = end.toLowerCase().trim();

  if((start === 'a' || start === 'b' || start === 'c') && (end === 'a' || end === 'b' || end === 'c')){
    if(stacks[end][stacks[end].length-1] > stacks[start][stacks[start].length-1] || stacks[end].length === 0) {
      console.log("Legal Move");
      return true;
    } else {
        return false;
    }
  } else {
      return false;
  }
}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // Your code here
  if(stacks["c"].length == 4) {
    console.log("Winner");
    return true;
  } else {
      return false;
  }

}

const resetBoard = () => {
  stacks = {
    a: [4, 3, 2, 1],
    b: [],
    c: []
  };
}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  if(isLegal(startStack, endStack)) {
    movePiece(startStack, endStack);
    checkForWin();
    if(checkForWin()){
      resetBoard();
    }
  } else {
      console.log('Illegal Move');
  }

}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
    it('check for legal input', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'd'), false);
    });
    it('check for legal input', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('A', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [], c: [4, 3, 2, 1] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}