import {
  taskIcon,
  randomIcon,
  ideaIcon,
  quoteIcon,
  editIcon,
  deleteIcon,
  archiveIcon,
} from './icons';
import { showArchivedOpenModal, showArchivedNotes } from './modal';

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

let notes = [
  {
    id: uuidv4(),
    name: 'Shoping list',
    created: '20/04/2021',
    category: 'Task',
    content: 'Tomatoes, Bread',
    dates: '',
    archived: false,
  },
  {
    id: uuidv4(),
    name: 'The theory of evolution',
    created: '27/04/2021',
    category: 'Random Thought',
    content: 'The evolution...',
    dates: '',
    archived: false,
  },
  {
    id: uuidv4(),
    name: 'New Feature',
    created: '05/05/2021',
    category: 'Idea',
    content: 'Implement new...',
    dates: '5/3/2021, 5/5/2021',
    archived: false,
  },
  {
    id: uuidv4(),
    name: 'William Gaddis',
    created: '07/05/2021',
    category: 'Quote',
    content: "Power doesn't....",
    dates: '',
    archived: false,
  },
  {
    id: uuidv4(),
    name: 'Books',
    created: '15/05/2021',
    category: 'Task',
    content: 'The Lean Startup',
    dates: '',
    archived: false,
  },
  {
    id: uuidv4(),
    name: 'Books',
    created: '15/05/2021',
    category: 'Task',
    content:
      'I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021',
    dates: '',
    archived: true,
  },
];

const editButtonElement = (id) =>
  `<button data-id=${id} id="edit-button">${editIcon}</button>`;
const archiveButtonElement = (id) =>
  `<button data-id=${id} id="archive-button">${archiveIcon}</button>`;
const deleteButtonElement = (id) =>
  `<button data-id=${id} id="delete-button">${deleteIcon}</button>`;

const notesTable = document.getElementById('notes-table');

export const getCategoryIcon = (category) => {
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
};

const addActionListeners = () => {
  const editButton = document.querySelectorAll('#edit-button');
  const archiveButton = document.querySelectorAll('#archive-button');
  const deleteButton = document.querySelectorAll('#delete-button');

  editButton.forEach(function (currentBtn) {
    currentBtn.addEventListener('click', editNoteOpenModal, false);
  });
  archiveButton.forEach(function (currentBtn) {
    currentBtn.addEventListener('click', archiveNote, false);
  });
  deleteButton.forEach(function (currentBtn) {
    currentBtn.addEventListener('click', deleteNote, false);
  });
};

const showNotes = (notes) => {
  let html = '';
  const notesListElement = document.getElementById('notes-list');
  notes.forEach((note, index) => {
    if (!note.archived) {
      html += `
      <tr>
      <td id="table-category-icon"><span>${getCategoryIcon(
        note.category
      )}</span></td>
      <td id="table-name">${note.name}</td>
      <td id="table-created">${note.created}</td>
      <td id="table-category">${note.category}</td>
      <td id="table-content">${note.content}</td>
      <td id="table-dates">${note.dates}</td>
      <td id="table-action-buttons">${editButtonElement(
        note.id
      )}${archiveButtonElement(note.id)}${deleteButtonElement(note.id)}</td>
        </tr>
        `;
    }
  });
  notesListElement.innerHTML = html;
  addActionListeners();
};

const getDatesTextFromContent = (contentText) => {
  const matcher = /\d\/\d\/\d*/gm;
  let found = contentText.match(matcher);
  let dates = '';
  if (found && found.length) {
    dates = found.join(', ');
  }
  return dates;
};

const addNote = (e) => {
  e.preventDefault();
  const { inputName, selectCategory, inputContent } = e.target;
  let modal = document.getElementById('modal-new-note');
  modal.classList.remove('open');

  let d = new Date();
  let currDate = d.getDate();
  let currMonth = d.getMonth() + 1;
  let currYear = d.getFullYear();
  const formatedNow = `${currDate}/${currMonth}/${currYear}`;

  const contentText = inputContent.value;

  notes.push({
    id: uuidv4(),
    name: inputName.value,
    category: selectCategory.value,
    content: contentText,
    dates: getDatesTextFromContent(contentText),
    created: formatedNow,
    archived: false,
  });
  inputName.value = '';
  inputContent.value = '';
  showNotes(notes);
  showStats(notes);
};

const countByCategory = (notes, category, isArchived) => {
  return notes
    .filter((note) => note.category === category)
    .filter((note) => note.archived === isArchived).length;
};

const showStats = (notes) => {
  let html = '';
  const notesListElement = document.getElementById('notes-stats-list');
  const categories = Array.from(new Set(notes.map((note) => note.category)));

  categories.sort().forEach((category) => {
    const countNotArchived = countByCategory(notes, category, false);
    const countArchived = countByCategory(notes, category, true);
    const countArchivedEl =
      countArchived > 0
        ? `<td id="table-stats-archived"><button>${countArchived}</button></td>`
        : `<td id="table-stats-archived">${countArchived}</td>`;
    html += `
    <tr>
      <td id="table-stats-category-icon"><span>${getCategoryIcon(
        category
      )}</span></td>
      <td id="table-stats-category">${category}</td>
      <td id="table-stats-active">${countNotArchived}</td>
      ${countArchivedEl}
    </tr>
    `;
  });
  notesListElement.innerHTML = html;
  addListenersToArchivedCount(notes);
};

const addListenersToArchivedCount = (notes) => {
  let archivedCount = document.querySelectorAll('#table-stats-archived button');
  archivedCount.forEach((archivedCountEl) => {
    archivedCountEl.addEventListener(
      'click',
      (e) => showArchivedOpenModal(e, notes),
      false
    );
  });
};

const editNoteOpenModal = (e) => {
  let createNoteForm = document.getElementById('add-note-form');

  let createNoteFormNew = createNoteForm.cloneNode(true);
  createNoteForm.parentNode.replaceChild(createNoteFormNew, createNoteForm);

  const id = e.currentTarget.dataset.id;

  const [{ name, category, content }] = notes.filter((note) => note.id === id);

  let modal = document.getElementById('modal-new-note');
  modal.classList.add('open');

  let exit = modal.querySelector('.modal-close');
  exit.addEventListener('click', function (event) {
    event.preventDefault();
    modal.classList.remove('open');
  });

  let inputName = document.getElementById('input-name');
  let selectCategory = document.getElementById('select-category');
  let inputContent = document.getElementById('input-content');
  inputName.value = name;
  selectCategory.value = category;
  inputContent.value = content;

  createNoteFormNew.addEventListener('submit', (e) => editNote(e, id), false);
};

const editNote = (e, id) => {
  e.preventDefault();
  const { inputName, selectCategory, inputContent } = e.target;
  let modal = document.getElementById('modal-new-note');
  modal.classList.remove('open');

  const contentText = inputContent.value;
  notes.forEach((note) => {
    if (note.id === id) {
      note.name = inputName.value;
      note.category = selectCategory.value;
      note.content = inputContent.value;
      note.dates = getDatesTextFromContent(contentText);
    }
  });
  inputName.value = '';
  inputContent.value = '';
  showNotes(notes);
  showStats(notes);
};

const archiveNote = (e) => {
  const id = e.currentTarget.dataset.id;
  notes.forEach((note) => {
    if (note.id === id) {
      note.archived = true;
    }
  });
  showNotes(notes);
  showStats(notes);
  addListenersToArchivedCount(notes);
};

const unarchiveNote = (e) => {
  const id = e.currentTarget.dataset.id;
  notes.forEach((note) => {
    if (note.id === id) {
      note.archived = false;
    }
  });
  showNotes(notes);
  showStats(notes);
  showArchivedNotes(notes);
  addListenersToArchivedCount(notes);
};

const deleteNote = (e) => {
  const id = e.currentTarget.dataset.id;
  const newNotes = notes.filter((note) => note.id !== id);
  notes = newNotes.slice();
  showNotes(newNotes);
  showStats(newNotes);
};

export { notes, addNote, showNotes, showStats, unarchiveNote };
