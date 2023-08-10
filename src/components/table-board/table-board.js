import findMatch from '../../js/handler';

export default class TableBoard {
  constructor(element) {
    try {
      this.element = element;
    } catch (error) {
      console.log(error);
    }

    this.tasks = ['Do JS homework'];
    this.pinnedTasks = ['Visit granny'];
    this.pinnedSection = document.querySelector('.task-section-pinned');
    this.taskSection = document.querySelector('.task-section');

    this.filter = this.filter.bind(this);
    this.rangeTask = this.rangeTask.bind(this);

    this.element.addEventListener('click', this.rangeTask);
  }

  static createTask(text, pinned) {
    const task = document.createElement('li');
    task.classList.add('task');
    const taskText = document.createElement('span');
    taskText.classList.add('task-text');
    taskText.textContent = text;
    const taskIcon = document.createElement('span');
    taskIcon.classList.add('icon');
    if (pinned) {
      taskIcon.textContent = '&#128992;';
      taskIcon.classList.add('pinned');
    } else {
      taskIcon.textContent = '&#9898;';
    }
    task.insertAdjacentElement('afterbegin', taskText);
    task.insertAdjacentElement('beforeend', taskIcon);
    return task;
  }

  addTask(task) {
    this.tasks.push(task);
    console.log(this.tasks, this.pinnedTasks);
  }

  pinTask(taskText) {
    console.log(taskText);
    const index = this.tasks.indexOf(taskText);
    console.log(index);
    const removed = this.tasks.splice(index, 1);
    console.log(removed[0]);
    this.pinnedTasks.push(removed[0]);
    console.log(this.tasks, this.pinnedTasks);
    this.renderBoard(this.tasks);
  }

  unpinTask(taskText) {
    const index = this.pinnedTasks.indexOf(taskText);
    const removed = this.pinnedTasks.splice(index, 1);
    this.tasks.push(removed[0]);
    this.renderBoard(this.tasks);
  }

  rangeTask(e) {
    e.stopPropagation();
    if (!e.target.classList.contains('icon')) {
      return;
    }
    const task = e.target.closest('.task');
    const taskText = task.querySelector('.task-text').textContent;
    if (e.target.classList.contains('pinned')) {
      e.target.classList.remove('pinned');
      e.target.textContent = '&#9898;';
      this.unpinTask(taskText);
      return;
    }
    e.target.classList.add('pinned');
    e.target.textContent = '&#128992;';
    this.pinTask(taskText);
  }

  checkPinnedTasks() {
    if (this.pinnedTasks.length === 0) {
      this.pinnedSection.classList.add('hidden');
      document.querySelector('.no-tasks').classList.remove('hidden');
    } else {
      this.pinnedSection.classList.remove('hidden');
      document.querySelector('.no-tasks').classList.add('hidden');
    }
  }

  clearDOM() {
    const items = this.element.querySelectorAll('.task');
    for (const item of items) {
      item.remove();
    }
  }

  renderBoard(array = this.tasks) {
    this.clearDOM();
    this.checkPinnedTasks();
    if (this.pinnedTasks.length !== 0) {
      for (const item of this.pinnedTasks) {
        const task = TableBoard.createTask(item, true);
        const icon = task.querySelector('.icon');
        icon.classList.add('pinned');
        this.pinnedSection.insertAdjacentElement('beforeend', task);
      }
    }
    if (array.length === 0) {
      return;
    }
    for (const item of array) {
      const task = TableBoard.createTask(item);
      this.taskSection.insertAdjacentElement('beforeend', task);
    }
  }

  filter(text) {
    const filtered = this.tasks.filter((el) => findMatch(el, text));
    this.renderBoard(filtered);
    // const filterCallback = findMatch.bind(null, text);
    // this.renderBoard(filterBy(this.tasks, filterCallback));
  }
}
