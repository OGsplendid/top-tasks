export default class Task {
  constructor(text) {
    this.text = text;
  }

  create() {
    const li = document.createElement('li');
    const taskText = document.createElement('span');
    const taskIcon = document.createElement('span');

    li.classList.add('task');
    taskText.classList.add('task-text');
    taskIcon.classList.add('icon');

    taskText.textContent = this.text;
    taskIcon.innerText = '\u25CB';

    li.insertAdjacentElement('afterbegin', taskText);
    li.insertAdjacentElement('beforeend', taskIcon);

    return li;
  }
}
