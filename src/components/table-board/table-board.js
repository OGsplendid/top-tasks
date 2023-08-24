import Task from '../task/Task';

export default class TableBoard {
  constructor(element) {
    this.element = element;

    this.tasks = [];

    this.pinnedSection = document.querySelector('.task-section-pinned');
    this.taskSection = document.querySelector('.task-section');

    this.rangeTask = this.rangeTask.bind(this);
    this.element.addEventListener('click', this.rangeTask);
  }

  set tasks(array) {
    this._tasks = array;
  }

  get tasks() {
    return this._tasks;
  }

  static createTaskElement(taskObject) {
    const task = new Task(taskObject.text);
    return task.create();
  }

  pinTask(taskText) {
    const task = this.tasks.find((el) => el.text === taskText);
    task.pinned = true;
    this.renderBoard(this.tasks);
  }

  unpinTask(taskText) {
    const task = this.tasks.find((el) => el.text === taskText);
    task.pinned = false;
    this.renderBoard(this.tasks);
  }

  rangeTask(e) {
    if (!e.target.classList.contains('icon')) {
      return;
    }
    const taskText = e.target.closest('.task').querySelector('.task-text').textContent;
    const taskObject = this.tasks.find((el) => el.text === taskText);
    if (!taskObject.pinned) {
      this.pinTask(taskObject.text);
    } else {
      this.unpinTask(taskObject.text);
    }
  }

  static switch(el) {
    const taskIcon = el.querySelector('.icon');
    if (taskIcon.src === 'https://w7.pngwing.com/pngs/294/523/png-transparent-circle-font-circle-orange-sphere-circle.png') {
      taskIcon.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5tE4w4-OhqIcoQjrR5kYnhhAyRrL1tFj6Zw&usqp=CAU';
    } else {
      taskIcon.src = 'https://w7.pngwing.com/pngs/294/523/png-transparent-circle-font-circle-orange-sphere-circle.png';
    }
  }

  checkPinnedTasks() {
    const hiddenSection = document.querySelector('.no-tasks');
    if (!this.tasks.some((el) => el.pinned === true)) {
      this.pinnedSection.classList.add('hidden');
      hiddenSection.classList.remove('hidden');
      return;
    }
    this.pinnedSection.classList.remove('hidden');
    hiddenSection.classList.add('hidden');
  }

  clearDOM() {
    if (this.element.querySelector('.task')) {
      const items = this.element.querySelectorAll('.task');
      items.forEach((el) => el.remove());
    }
  }

  renderBoard(array) {
    this.clearDOM();
    this.checkPinnedTasks();

    if (array.length === 0) {
      return;
    }

    for (const item of array) {
      const task = TableBoard.createTaskElement(item);
      if (item.pinned) {
        TableBoard.switch(task);
        this.pinnedSection.insertAdjacentElement('beforeend', task);
      } else {
        this.taskSection.insertAdjacentElement('beforeend', task);
      }
    }
  }
}
