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

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}

function addBookToTheLibrary(title, author, pages, read) {
  const book = new Book(crypto.randomUUID(), title, author, pages, read);
  myLibrary.push(book);
  return book;
}

function removeBookFromLibrary(bookIdToRemove) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].id === bookIdToRemove) {
      myLibrary.splice(i, 1);
    }
  }
}

function displayBook(book) {
  const newBook = bookTemplate.cloneNode(true);

  newBook.addEventListener('click', (e) => {
    let target = e.target;

    switch(target.className) {
      case 'remove-btn':
        target.parentElement.remove();
        removeBookFromLibrary(book.id);
        break;
      case 'read-status':
        console.log(target.parentElement.getAttribute("data-book-id"));
        if (book.read) {
          book.toggleRead();
          target.style.backgroundColor = "red";
          target.textContent = "Unread";
        } else {
          book.toggleRead();
          target.style.backgroundColor = "green";
          target.textContent = "Read";
        }
        break;
      default:
        break;
    }
  });
  
  newBook.setAttribute('data-book-id', book.id);
  newBook.querySelector(".book-title").textContent = book.title;
  newBook.querySelector(".book-author").textContent = `by ${book.author}`;
  newBook.querySelector(".book-pages").textContent = `pages: ${book.pages}`;
  newBook.querySelector(".read-status").textContent = (book.read) ? "Unread" : "Read";
  
  if (book.read) {
    newBook.querySelector(".read-status").setAttribute('style', "background-color: red;");
  } else {
    newBook.querySelector(".read-status").setAttribute('style', "background-color: green;");
  }

  newBook.style.display = "grid";
  //newBook.textContent = `${book.title} by ${book.author}, ${book.pages} pages, ${book.read}`;
  libraryContainer.appendChild(newBook);
}

newBookForm.addEventListener('submit', (e) => {
  e.preventDefault(); // No reloads

  const book = addBookToTheLibrary(
    newBookForm.elements['title'].value,
    newBookForm.elements['author'].value,
    newBookForm.elements['pages'].value,
    newBookForm.elements['read'].checked
  );

  displayBook(book);
  
  // hide form
  newBookForm.setAttribute('style', "display: none;");

  newBookForm.reset();
});

newBookButton.addEventListener("click", () => {
  newBookForm.style.display = "block";
});