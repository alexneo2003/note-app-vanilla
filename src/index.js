import './styles.scss';
import { notes, addNote, showNotes } from './notes';

function init() {
  showNotes(notes);

  const editButton = document.querySelectorAll('#edit-button');
  const archiveButton = document.querySelectorAll('#archive-button');
  const deleteButton = document.querySelectorAll('#delete-button');

  function editNote(e) {
    console.log(e.currentTarget.dataset.id);
  }

  function archiveNote(e) {
    console.log(e.currentTarget.dataset.id);
  }

  function deleteNote(e) {
    console.log(e.currentTarget.dataset.id);
  }

  editButton.forEach(function (currentBtn) {
    currentBtn.addEventListener('click', editNote, false);
  });
  archiveButton.forEach(function (currentBtn) {
    currentBtn.addEventListener('click', archiveNote, false);
  });
  deleteButton.forEach(function (currentBtn) {
    currentBtn.addEventListener('click', deleteNote, false);
  });

  let createNoteModal = document.getElementById('create-note');

  createNoteModal.addEventListener('click', function (event) {
    event.preventDefault();
    let modal = document.getElementById('modal-one');
    modal.classList.add('open');
    let exits = modal.querySelectorAll('.modal-exit');
    exits.forEach(function (exit) {
      exit.addEventListener('click', function (event) {
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
