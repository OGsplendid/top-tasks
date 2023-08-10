// import Table from '../components/table-rendering/Table';
// import '../css/style.css';

// const table = new Table(document.querySelector('.table'));
// table.startGame();

import '../css/style.css';
import TableBoard from '../components/table-board/table-board';
import Filter from '../components/filter/filter';

const board = new TableBoard(document.querySelector('.table-board'));
const filter = new Filter(document.querySelector('.filter-widget-form'), board.filter);
board.renderBoard(board.tasks);
