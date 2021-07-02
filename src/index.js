import './styles.scss';
import { notes, addNote, showNotes, showStats } from './notes';

function init() {
  showNotes(notes);
  showStats(notes);

  let createNoteModal = document.getElementById('create-note');

  createNoteModal.addEventListener('click', (event) => {
    event.preventDefault();
    let modal = document.getElementById('modal-new-note');
    modal.classList.add('open');
    let exits = modal.querySelectorAll('.modal-exit');
    exits.forEach((exit) => {
      exit.addEventListener('click', (event) => {
        event.preventDefault();
        modal.classList.remove('open');
      });
    });
  });

  let createNoteForm = document.getElementById('add-note-form');
  createNoteForm.addEventListener('submit', addNote);
}

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', function () {
    init();
  });
}
