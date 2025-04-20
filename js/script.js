const myLibrary = [];

const bookTitleInput = document.querySelector("#book-title");
const bookAuthorInput = document.querySelector("#book-author");
const addBookBtn = document.querySelector("#add-book-btn");

function Book(id, title, author) {
  if (!new.target) {
    throw Error("Use new keyword to call Book constructor");
  }
  this.id = id;
  this.title = title;
  this.author = author;
}

function addBookToTheLibrary(title, author) {
  const book = new Book(crypto.randomUUID(), title, author);
  console.log(`${book.title} ${book.author}`);
}

addBookBtn.addEventListener("click", () => {
  addBookToTheLibrary(bookTitleInput.value, bookAuthorInput.value);
});