export default class Task {
  constructor(text) {
    this.text = text;
  }

  create() {
    const li = document.createElement('li');
    const taskText = document.createElement('span');
    const taskIcon = document.createElement('img');

    li.classList.add('task');
    taskText.classList.add('task-text');
    taskIcon.classList.add('icon');

    taskText.textContent = this.text;
    taskIcon.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5tE4w4-OhqIcoQjrR5kYnhhAyRrL1tFj6Zw&usqp=CAU';

    li.insertAdjacentElement('afterbegin', taskText);
    li.insertAdjacentElement('beforeend', taskIcon);

    return li;
  }
}
