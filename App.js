/**
 * Project Library
 *
 * This Project is inspired from The Odin Project Curriculum
 *
 * Author: Rohit Mehta
**/

// Constants:
const shelf = document.querySelector('.shelf');
const form = document.querySelector('form.book-form');
const formWrapper = document.querySelector('div.form-wrapper');
const cancelBtn = document.querySelector('button.cancel');
const submitBtn = document.querySelector('button.submit');
const addBookBtn = document.querySelector('button.add-book');

let myLibrary = [];

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

function addBookToLibrary(book) {
    if (book.constructor === Book)
        myLibrary.push(book);
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

addBookBtn.onclick = () => formWrapper.style.visibility = 'visible';
cancelBtn.onclick = () => formWrapper.style.visibility = 'hidden';

// put them on the shelf
const displayLibrary = (books) => {
/* 
    for (let i = 0; i < books.length; i++) {
        const div = document.createElement('div');
        div.setAttribute('class', 'book');

        const title = document.createElement('header');
        title.setAttribute('class', 'title');
        title.textContent = books[i].title;

        const author = document.createElement('p');
        author.textContent = books[i].author;

        const readStatus = document.createElement('div');
        readStatus.setAttribute('class', 'read-status');
        readStatus.textContent = books[i].readStatus ? 'Read ✅' : 'Not Read ❌';

        div.appendChild(title);
        div.appendChild(author);
        div.appendChild(readStatus);

        shelf.appendChild(div);
    } */

}

displayLibrary(myLibrary);