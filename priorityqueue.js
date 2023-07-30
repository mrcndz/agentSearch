class PriorityQueue {
  constructor() {
    this.elements = [];
  }

  isEmpty() {
    return !this.elements.length;
  }

  enqueue(element, priority) {
    this.elements.push({element, priority});
    this.elements.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.elements.shift().element;
  }

  includes(element) {
    return this.elements.find(e => e.element === element) !== undefined;
  }

  slice() {
    return this.elements.map(e => e.element);
  }
}