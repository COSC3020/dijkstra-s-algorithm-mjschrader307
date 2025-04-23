const fs = require("fs");
eval(fs.readFileSync("code.js") + "");

const test = [
  {
    // Asterisk-looking graph (starting in the center (0))
    Graph: [
      [
        [1, 1],
        [2, 1],
        [3, 1],
        [4, 1],
        [5, 1],
        [6, 1],
        [7, 1],
        [8, 1],
      ],
      [[0, 1]],
      [[0, 1]],
      [[0, 1]],
      [[0, 1]],
      [[0, 1]],
      [[0, 1]],
      [[0, 1]],
      [[0, 1]],
    ],
    Source: 0,
    Expected: [0, 1, 1, 1, 1, 1, 1, 1, 1],
  },
  {
    // Graph from lecture slides
    Graph: [
      [
        [1, 2],
        [2, 1],
        [3, 4],
      ],
      [
        [2, 1],
        [4, 10],
        [5, 2],
      ],
      [
        [0, 9],
        [4, 8],
      ],
      [[2, 2]],
      [
        [3, 7],
        [6, 1],
      ],
      [[7, 3]],
      [
        [4, 4],
        [5, 2],
      ],
      [[6, 1]],
    ],
    Source: 2,
    Expected: [9, 11, 0, 13, 8, 11, 9, 14],
  },
  {
    // Linear graph, starting at 0
    Graph: [[[1, 1]], [[2, 1]], [[3, 1]], []],
    Source: 0,
    Expected: [0, 1, 2, 3],
  },
  {
    // Disjoint graph (unreachable nodes should be infinity (9999 with my implementation)) starting at 0
    Graph: [[[1, 1]], [], [[3, 1]], []],
    Source: 0,
    Expected: [0, 1, 9999, 9999],
  },
];

function arraysEqual(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

function testFxn() {
  test.forEach((testCase, index) => {
    const graph = testCase["Graph"];
    const source = testCase["Source"];
    const expected = testCase["Expected"];

    const result = dijkstra(graph, source);

    const match = arraysEqual(result, expected);

    if (!match) {
      throw new Error(`Test ${index + 1} failed.`);
    }
  });
}

testFxn();