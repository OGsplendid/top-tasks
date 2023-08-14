import TableBoard from '../table-board/table-board';
import findMatch from '../../js/find-match';

export default class Filter {
  constructor(element) {
    this.element = element;

    this.inputText = document.querySelector('.filter-text');
    this.icons = document.querySelectorAll('.icon');

    this.board = new TableBoard(document.querySelector('.table-board'));

    // this.onSubmit = this.onSubmit.bind(this);

    // this.element.addEventListener('input', this.onFilter);
    // this.element.addEventListener('submit', this.onSubmit);
  }

  // onSubmit(e) {
  //   e.preventDefault();
  //   const text = this.inputText.value.trim();
  //   if (!text) {
  //     console.log('There\'s no text');
  //     return;
  //   }
  //   this.board.addTask(text);
  //   this.element.reset();
  //   this.board.renderBoard();
  // }

  // onFilter(e) {
  //   console.log(this._filterHandler);
  //   e.preventDefault();
  //   if (this.timeout) {
  //     clearTimeout(this.timeout);
  //   }
  //   const text = this.inputText.value;
  //   this.timeout = setTimeout(() => this._filterHandler(text), 300);
  // }
}
