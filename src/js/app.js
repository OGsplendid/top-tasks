import '../css/style.css';
import Filter from '../components/filter/Filter';
import TableBoard from '../components/table-board/Table-board';

const filterElement = new Filter(document.querySelector('.filter-widget-form'));
const board = new TableBoard(document.querySelector('.table-board'));
board.renderBoard(board.tasks);
