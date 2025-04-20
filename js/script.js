const myLibrary = [];

const newBookButton = document.querySelector("#new-book-btn");
const newBookForm = document.querySelector("#new-book-form");

const libraryContainer = document.querySelector(".library-container");

const bookTemplate = document.querySelector("#book-template");

function Book(id, title, author, pages, read) {
  if (!new.target) {
    throw Error("Use new keyword to call Book constructor");
  }
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToTheLibrary(title, author, pages, read) {
  const book = new Book(crypto.randomUUID(), title, author, pages, read);
  myLibrary.push(book);
  return book;
}

function displayBook(book) {
  const newBook = bookTemplate.cloneNode(true);
  
  newBook.querySelector(".book-title").textContent = book.title;
  newBook.querySelector(".book-author").textContent = book.author;
  newBook.querySelector(".book-pages").textContent = `pages: ${book.pages}`;
  
  if (book.read) {
    newBook.querySelector(".read-status").setAttribute('style', "background-color: green;");
  } else {
    newBook.querySelector(".read-status").setAttribute('style', "background-color: red;");
  }

  newBook.style.display = "grid";
  //newBook.textContent = `${book.title} by ${book.author}, ${book.pages} pages, ${book.read}`;
  libraryContainer.appendChild(newBook);
}

newBookForm.addEventListener('submit', (e) => {
  e.preventDefault(); // No reloads

  displayBook(addBookToTheLibrary(
    newBookForm.elements['title'].value,
    newBookForm.elements['author'].value,
    newBookForm.elements['pages'].value,
    newBookForm.elements['read'].checked
  ));
  
  // hide form
  newBookForm.setAttribute('style', "display: none;");
});

newBookButton.addEventListener("click", () => {
  newBookForm.style.display = "block";
});
