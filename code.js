class PriorityQueue {
  constructor() {
    this.size = 0;
    this.data = [];
  }

  swap(i, j) {
    const temp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = temp;
  }

  bubbleUp(index) {
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);

      if (this.data[index][1] < this.data[parent][1]) {
        this.swap(index, parent);
        index = parent;
      } else {
        break;
      }
    }
  }

  sinkDown(index) {
    while (2 * index + 1 < this.size) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let smallest = index;

      if (left < this.size && this.data[left][1] < this.data[smallest][1]) {
        smallest = left;
      }

      if (right < this.size && this.data[right][1] < this.data[smallest][1]) {
        smallest = right;
      }

      if (smallest !== index) {
        this.swap(index, smallest);
        index = smallest;
      } else {
        break;
      }
    }
  }

  insert(value, priority) {
    this.data[this.size] = [value, priority];

    this.bubbleUp(this.size);

    this.size++;
  }

  extractMin() {
    if (this.size === 0) return null;

    const minItem = this.data[0];

    this.data[0] = this.data[--this.size];

    this.sinkDown(0);

    return minItem;
  }

  isEmpty() {
    return this.size === 0;
  }

  print() {
    for (let i = 0; i < this.size; ++i) {
      const [value, priority] = this.data[i];

      console.log(`(${value}, ${priority})`);
    }

    console.log();
  }
}

function dijkstra(graph, sourceNode) {
  const num_nodes = graph.length;
  const inf = 9999;

  const distances = new Array(num_nodes).fill(inf);
  const previous = new Array(num_nodes).fill(null);

  const nodes = new PriorityQueue();

  distances[sourceNode] = 0;

  // Initialize the priority queue
  for (let i = 0; i < num_nodes; i++) {
    const dist = i === sourceNode ? 0 : inf;
    nodes.insert(i, dist);
  }

  while (!nodes.isEmpty()) {
    let [currentNode, currentDist] = nodes.extractMin();

    if (currentDist > distances[currentNode]) continue;

    let neighbors = graph[currentNode];

    neighbors.forEach(([neighbor, weight]) => {
      let tmpDist = distances[currentNode] + weight;

      if (tmpDist < distances[neighbor]) {
        distances[neighbor] = tmpDist;
        previous[neighbor] = currentNode;

        nodes.insert(neighbor, tmpDist);
      }
    });
  }

  return distances;
}
