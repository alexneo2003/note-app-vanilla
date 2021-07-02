import { unarchiveIcon } from './icons';
import { getCategoryIcon, unarchiveNote } from './notes';

const unarchiveButtonElement = (id) =>
  `<button data-id=${id} id="unarchive-button">${unarchiveIcon}</button>`;

const addActionListeners = () => {
  const unarchiveButton = document.querySelectorAll('#unarchive-button');

  unarchiveButton.forEach(function (currentBtn) {
    currentBtn.addEventListener('click', unarchiveNote, false);
  });
};

export const showArchivedNotes = (notes) => {
  let html = '';
  const notesListElement = document.getElementById('archived-notes-list');
  notes.forEach((note, index) => {
    if (note.archived) {
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
          <td id="table-action-buttons">${unarchiveButtonElement(note.id)}</td>
        </tr>
      `;
    }
  });
  notesListElement.innerHTML = html;
  addActionListeners();
};

const showArchivedOpenModal = (e, notes) => {
  let modal = document.getElementById('modal-archived');
  modal.classList.add('open');

  showArchivedNotes(notes);

  // const id = e.currentTarget.dataset.id;

  // const [{ name, category, content }] = notes.filter((note) => note.archived);

  // let modal = document.getElementById('modal-new-note');
  // modal.classList.add('open');

  let exit = modal.querySelector('.modal-close');
  exit.addEventListener('click', function (event) {
    event.preventDefault();
    modal.classList.remove('open');
  });

  // let inputName = document.getElementById('input-name');
  // let selectCategory = document.getElementById('select-category');
  // let inputContent = document.getElementById('input-content');
  // inputName.value = name;
  // selectCategory.value = category;
  // inputContent.value = content;

  // createNoteFormNew.addEventListener('submit', (e) => editNote(e, id), false);
};

export { showArchivedOpenModal };
