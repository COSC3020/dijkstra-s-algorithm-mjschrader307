# Dijkstra's Algorithm

Recall the pseudocode for Dijkstra's algorithm:
- initialize the dist to each vertex to $\infty$, source to 0
- while there are unmarked vertices left in the graph
    - select the unmarked vertex $v$ with the lowest dist
    - mark $v$ with distance dist
    - for each edge $(v,w)$
        - dist($w$) = min $\left(\textrm{dist}(w), \textrm{dist}(v) + \textrm{weight of }(v, w)\right)$

Implement Dijkstra's algorithm. Start with the template I provided in `code.js`
and test your new function.

I have not provided any test code, but you can base yours on test code from
other exercises. Your tests must check the correctness of the result of running
the function and run automatically when you commit through a GitHub action.

The choice of data structures is up to you -- your implementation does not have
to be the most efficient one, but please make sure that it is not unnecessarily
inefficient.

## Runtime Analysis

What is the big $\Theta$ complexity of your implementation? Add your
answer, including your reasoning, to this markdown file.

---

### Answer:

I chose to use a priority queue (implemented as a binary heap) to handle processing of nodes with weighted edges, because the second part of the algorithm described below becomes straightforward.

#### First part: Initial population of priority queue

The complexity of insertion into a binary heap is $\Theta(\log(|V|)$, and I want to do that $|V|$ times. Therefore, the initial population of the priority queue used to process vertices is $\Theta(|V|\log(|V|))$.

#### Second part:

Choosing the unvisited vertex with the shortest distance to the source is pretty straightforward using a priority queue. As a binary heap, this takes $\Theta(\log(|V|))$ time.

For each of the current vertex's unvisited neighbor vertices (linear in edges), I am calculating a tentative distance from the source and updating the distance if the new calculated distance is lower (all in constant time).

### Worst Case
In the worst case, here's what happens:
- Initial population of priority queue (doesn't change): $O(|V|\log(|V|))$
- Reinsert entry into priority queue after every neighbor encounter ($|E|$ times): $O(|E|\log(|V|))$

Overall: $O(|V|\log(|V|) + |E|\log(|V|)) = O((|V| + |E|)\log(|V|))$

### Best Case

- Initial population of priority queue: $\Omega(|V|\log(|V|)$
- No reinsertions of entries into priority queue because the initial calculation of the distance from the source is already the smallest it can be
	- However, the initial calculation of distances happens linearly in edges and each insertion happens logarithmically in vertices, so this part still has a complexity of $\Omega(|E|\log(|V|))$

Overall: $\Omega(|V|\log(|V|) + |E|\log(|V|)) = \Omega((|V| + |E|)\log(|V|))$

### Final Answer

Since the worst and best cases have the same complexity, the overall runtime complexity for this implementation is $\Theta((|V| + |E|)\log(|V|))$

---

I read a couple articles on Dijkstra's algorithm (from w3schools.com and Programiz.com) to learn a little more about the algorithm in general and see more examples of it working out. This is where I found the suggestion to use a priority queue.

**I certify that I have listed all sources used to complete this exercise, including the use
of any Large Language Models. All of the work is my own, except where stated
otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is
suspected, charges may be filed against me without prior notice.**