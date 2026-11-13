const notesList = (typeof NOTES_DATA !== 'undefined' && Array.isArray(NOTES_DATA)) ? NOTES_DATA : [];
let currentIndex = -1;

const noteHeader = document.getElementById('note-header');
const noteBody = document.getElementById('note-body');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const randomBtn = document.getElementById('random-btn');
const noteIdInput = document.getElementById('note-id-input');
const goBtn = document.getElementById('go-btn');

function renderNote(index) {
  if (notesList.length === 0) return;

  currentIndex = index;
  const note = notesList[currentIndex];
  noteHeader.textContent = `Заметка № ${note.id}`;
  noteBody.textContent = note.text;
  noteBody.scrollTop = 0;
  noteIdInput.value = note.id;
}

function showRandomNote() {
  if (notesList.length === 0) {
    noteHeader.textContent = 'Файл notes.js не найден';
    noteBody.textContent = 'Создайте notes.js из notes.json и положите его в одну папку с index.html.';
    return;
  }

  let randomIndex;
  if (notesList.length === 1) {
    randomIndex = 0;
  } else {
    do {
      randomIndex = Math.floor(Math.random() * notesList.length);
    } while (randomIndex === currentIndex);
  }

  renderNote(randomIndex);
}

function showPrevNote() {
  if (notesList.length === 0) return;
  const prevIndex = (currentIndex <= 0) ? notesList.length - 1 : currentIndex - 1;
  renderNote(prevIndex);
}

function showNextNote() {
  if (notesList.length === 0) return;
  const nextIndex = (currentIndex >= notesList.length - 1 || currentIndex === -1) ? 0 : currentIndex + 1;
  renderNote(nextIndex);
}

function goToNoteById() {
  if (notesList.length === 0) return;

  const targetId = parseInt(noteIdInput.value, 10);
  if (isNaN(targetId)) {
    noteIdInput.focus();
    return;
  }

  const foundIndex = notesList.findIndex(item => item.id === targetId);
  if (foundIndex !== -1) {
    renderNote(foundIndex);
  } else {
    const minId = notesList[0].id;
    const maxId = notesList[notesList.length - 1].id;
    noteHeader.textContent = `Заметка № ${targetId} не найдена`;
    noteBody.textContent = `Пожалуйста, введите номер заметки от ${minId} до ${maxId}.`;
    noteBody.scrollTop = 0;
  }
}

prevBtn.addEventListener('click', showPrevNote);
nextBtn.addEventListener('click', showNextNote);
randomBtn.addEventListener('click', showRandomNote);
goBtn.addEventListener('click', goToNoteById);

noteIdInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    goToNoteById();
  }
});

window.addEventListener('DOMContentLoaded', showRandomNote);
