import {
  taskIcon,
  randomIcon,
  ideaIcon,
  quoteIcon,
  editIcon,
  deleteIcon,
  archiveIcon,
} from './icons';

const notes = [
  {
    id: 1,
    name: 'Shoping list',
    created: '20/04/2021',
    category: 'Task',
    content: 'Tomatoes, Bread',
    dates: '',
  },
  {
    id: 2,
    name: 'The theory of evolution',
    created: '27/04/2021',
    category: 'Random Thought',
    content: 'The evolution...',
    dates: '',
  },
  {
    id: 3,
    name: 'New Feature',
    created: '05/05/2021',
    category: 'Idea',
    content: 'Implement new...',
    dates: '05/03/2021, 05/05/2021',
  },
  {
    id: 4,
    name: 'William Gaddis',
    created: '07/05/2021',
    category: 'Quote',
    content: "Power doesn't....",
    dates: '',
  },
  {
    id: 5,
    name: 'Books',
    created: '15/05/2021',
    category: 'Task',
    content: 'The Lean Startup',
    dates: '',
  },
];

const editButtonElement = (id) =>
  `<button data-id=${id} id="edit-button">${editIcon}</button>`;
const archiveButtonElement = (id) =>
  `<button data-id=${id} id="archive-button">${archiveIcon}</button>`;
const deleteButtonElement = (id) =>
  `<button data-id=${id} id="delete-button">${deleteIcon}</button>`;

const notesTable = document.getElementById('notes-table');

function getCategoryIcon(category) {
  switch (category) {
    case 'Task':
      return taskIcon;
      break;
    case 'Idea':
      return ideaIcon;
      break;
    case 'Quote':
      return quoteIcon;
      break;
    case 'Random Thought':
      return randomIcon;
      break;

    default:
      break;
  }
}

const showNotes = (notes) => {
  let html = '';
  const notesListElement = document.getElementById('notes-list');
  console.log('notes showNotes', notes);
  notes.forEach((note, index) => {
    html += `
    <tr>
      <td id="category-icon"><span>${getCategoryIcon(note.category)}</span></td>
      <td>${note.name}</td>
      <td>${note.created}</td>
      <td>${note.category}</td>
      <td>${note.content}</td>
      <td>${note.dates}</td>
      <td>${editButtonElement(note.id)}${archiveButtonElement(
      note.id
    )}${deleteButtonElement(note.id)}</td>
    </tr>
    `;
  });
  notesListElement.innerHTML = html;
};

const addNote = (e) => {
  e.preventDefault();
  const { inputName, selectCategory, inputContent } = e.target;
  console.log('event', inputName.value);
  console.log('event', selectCategory.value);
  console.log('event', inputContent.value);
  let modal = document.getElementById('modal-one');
  modal.classList.remove('open');

  let d = new Date();
  let currDate = d.getDate();
  let currMonth = d.getMonth() + 1;
  let currYear = d.getFullYear();
  const formatedNow = `${currDate}/${currMonth}/${currYear}`;

  const contentText = inputContent.value;
  const matcher = /\d\/\d\/\d*/gm;
  let found = contentText.match(matcher);
  console.log('found', found);
  let dates = '';
  if (found && found.length) {
    dates = found.join(', ');
  }

  notes.push({
    id: 213,
    name: inputName.value,
    category: selectCategory.value,
    content: contentText,
    dates,
    created: formatedNow,
  });
  console.log('notes addNote', notes);
  showNotes(notes);
};

export { notes, addNote, showNotes };
