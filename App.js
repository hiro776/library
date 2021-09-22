/**
 * Project Library
 *
 * This Project is inspired from The Odin Project Curriculum
 *
 * Author: Rohit Mehta
**/

// Constants:
const shelf = document.querySelector('.shelf');
const form = document.querySelector('form');
const cancelBtn = document.querySelector('button.cancel');
const submitBtn = document.querySelector('button[type="submit"]');
const addBookBtn = document.querySelector('button.add-book');

const Library = [];

// Book Object Constructor.
function Book(title, author, pageCount, readStatus) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.readStatus = readStatus; // True -means read, False -in all other cases
    this.info = function () {
        return title + ', ' + author + ', ' + pageCount + ', ' + readStatus;
    }
}

const addBookToLibrary = (book) => {
    if (book.constructor === Book)
        Library.push(book);
}

addBookBtn.addEventListener('click', () => {
    form.parentNode.style.visibility = 'visible';
});
cancelBtn.onclick = () => form.parentNode.style.visibility = 'hidden';

form.addEventListener("submit", (event) => {
    // form.parentNode.style.visibility = 'hidden';

    console.log(form.name);
});



// remove the Book from Library at index i
const removeBook = i => {
    Library.splice(i, 1);
}

// Toggle read status of the book at index i
const toggleReadAt = i => {
    if (Library[i].readStatus)
        Library[i].readStatus = false;
    else
        Library[i].readStatus = true;
}

// Number -> DocumentElement
// create a div element with class 'book' and data-id as the
// given number. Add book information from the Library[i]
const createBookElement = (i) => {
    const book = document.createElement('div');
    book.setAttribute('class', 'book');
    book.setAttribute('data-id', i);

    const spanClose = document.createElement('span');
    spanClose.setAttribute('class', 'close');
    spanClose.setAttribute('title', 'Remove this book');
    spanClose.textContent = 'x';

    spanClose.addEventListener('click', () => {
        const index = spanClose.parentNode.getAttribute('data-id');

        console.log(index);

        removeBook(index);

        updateLibraryDisplay();
    });

    const titleDiv = document.createElement('div');
    titleDiv.setAttribute('class', 'title');
    titleDiv.textContent = Library[i].title;

    const authorDiv = document.createElement('div');
    authorDiv.setAttribute('class', 'author');
    authorDiv.textContent = Library[i].author;

    const pg = document.createElement('div');
    pg.setAttribute('class', 'pg');
    pg.textContent = Library[i].pageCount + ' Pages';

    const readDiv = document.createElement('div');
    readDiv.setAttribute('class', 'read');
    readDiv.setAttribute('title', 'Toggle Read Status');
    readDiv.textContent = 'Read ' + ((Library[i].readStatus) ? '✅' : '❌');

    readDiv.addEventListener('click', () => {
        const index = readDiv.parentNode.getAttribute('data-id');

        toggleReadAt(index);

        updateLibraryDisplay();
    });

    book.appendChild(spanClose);
    book.appendChild(titleDiv);
    book.appendChild(authorDiv);
    book.appendChild(pg);
    book.appendChild(readDiv);

    return book;
}

const updateLibraryDisplay = () => {
    // remove all old childs from the shelf
    while (shelf.firstChild) {
        shelf.removeChild(shelf.firstChild);
    }

    // and add new ones instead
    for (let i = 0; i < Library.length; i++) {
        const book = createBookElement(i);
        shelf.appendChild(book);
    }
}

// for testing:
const book1 = new Book('Practical C Programming', 'Steve OUaline', 400, true);
const book2 = new Book('A Complete Guide to C++ Programming', 'Ulla Kirch', 846, false);
const book3 = new Book('Pro Git', 'Scott Chacon', 441, false);
const book4 = new Book('Clean Code', 'Robert C. Martin', 462, false);
const book5 = new Book('C Programming Tutorial', 'Tutorialspoint', 200, true);
// console.log(cprogramming.constructor === Book);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);
// ^^for testing.

console.log(Library);
updateLibraryDisplay(Library);