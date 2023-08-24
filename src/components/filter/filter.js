import TableBoard from '../table-board/Table-board';
import findMatch from '../../js/find-match';

export default class Filter {
  constructor(element) {
    this.element = element;
    this.inputText = document.querySelector('.filter-text');
    this.icons = document.querySelectorAll('.icon');

    this.board = new TableBoard(document.querySelector('.table-board'));

    this.onFilter = this.onFilter.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.element.addEventListener('input', this.onFilter);
    this.element.addEventListener('submit', this.onSubmit);
  }

  onSubmit(e) {
    e.preventDefault();
    const text = this.inputText.value.trim();
    if (!text) {
      console.log('There\'s no text');
      return;
    }
    const taskObject = {
      text,
      pinned: false,
    };
    this.board.tasks.push(taskObject);
    this.element.reset();
    this.board.renderBoard(this.board.tasks);
  }

  onFilter(e) {
    const text = this.inputText.value;
    if (!text) {
      this.board.renderBoard(this.board.tasks);
    }
    const filtered = this.board.tasks.filter((el) => findMatch(el.text, text));
    this.board.renderBoard(filtered);
  }
}
