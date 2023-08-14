import Task from '../task/Task';

export default class TableBoard {
  constructor(element) {
    this.element = element;

    this.tasks = ['Do JS homework'];
    this.pinnedTasks = ['Visit granny'];
    this.pinnedSection = document.querySelector('.task-section-pinned');
    this.taskSection = document.querySelector('.task-section');

    this.rangeTask = this.rangeTask.bind(this);

    this.element.addEventListener('click', this.rangeTask);
  }

  createTask(text) {
    this.tasks.push(text);
    const task = new Task(text);
    return task.create();
  }

  pinTask(taskText) {
    const index = this.tasks.indexOf(taskText);
    const removed = this.tasks.splice(index, 1);
    this.pinnedTasks.push(removed[0]);
    this.renderBoard(this.tasks);
  }

  unpinTask(taskText) {
    const index = this.pinnedTasks.indexOf(taskText);
    const removed = this.pinnedTasks.splice(index, 1);
    this.tasks.push(removed[0]);
    this.renderBoard(this.tasks);
  }

  rangeTask(e) {
    if (!e.target.classList.contains('icon')) {
      return;
    }
    const taskText = e.target.closest('.task').querySelector('.task-text');
    if (e.target.classList.contains('pinned')) {
      this.unpinTask(taskText);
      return;
    }
    this.pinTask(taskText);
  }

  static switch(el) {
    const taskIcon = el.querySelector('.icon');
    if (taskIcon.innerText === '\u25CB') {
      taskIcon.innerText = '\u1F7E0';
    } else {
      taskIcon.innerText = '\u25CB';
    }
    taskIcon.classList.add('pinned');
  }

  checkPinnedTasks() {
    const hiddenSection = document.querySelector('.no-tasks');
    if (this.pinnedTasks.length === 0) {
      this.pinnedSection.classList.add('hidden');
      hiddenSection.classList.remove('hidden');
      return;
    }
    this.pinnedSection.classList.remove('hidden');
    hiddenSection.classList.add('hidden');
  }

  clearDOM() {
    const items = this.element.querySelectorAll('.task');
    items.forEach((el) => el.remove());
  }

  renderBoard() {
    this.clearDOM();
    this.checkPinnedTasks();
    if (this.pinnedTasks.length !== 0) {
      for (const item of this.pinnedTasks) {
        const task = this.createTask(item);
        TableBoard.switch(task);
        this.pinnedSection.insertAdjacentElement('beforeend', task);
      }
    }
    if (this.tasks.length === 0) {
      return;
    }
    for (const item of this.tasks) {
      const task = this.createTask(item);
      this.taskSection.insertAdjacentElement('beforeend', task);
    }
  }
}
