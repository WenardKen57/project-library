const myLibrary = [];

const newBookForm = document.querySelector("#new-book-form");

const bookDisplayContainer = document.createElement("div");

function Book(id, title, author, pages, isRead) {
  if (!new.target) {
    throw Error("Use new keyword to call Book constructor");
  }
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToTheLibrary(title, author, pages, isRead) {
  const book = new Book(crypto.randomUUID(), title, author, pages, isRead);
  myLibrary.push(book);
}

newBookForm.addEventListener('submit', (e) => {
  e.preventDefault(); // No reloads

  addBookToTheLibrary(
    newBookForm.elements['title'].value,
    newBookForm.elements['author'].value,
    newBookForm.elements['pages'].value,
    newBookForm.elements['read'].checked
  );
  
  // hide form
  newBookForm.setAttribute('style', "display: none;");
})
