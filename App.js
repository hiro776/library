/*
Project Library

This Project is inspired from The Odin Project Curriculum
*/
// Author: Rohit Mehta

let myLibrary = [];

// Book: String String Number Boolean -> Object
// creates an Object, Book, taking book's title, author, pagecount, and readstatus
//          readStatus === True;        Book is Read
//          readStatus === False;       Book is not Read or being currently reading
function Book(title, author, pageCount, readStatus) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.readStatus = readStatus;
    this.info = function () {
        return title + ', ' + author + ', ' + pageCount + ', ' + readStatus;
    }
}

// Add new book object into the myLibrary array
function addBookToLibrary(book) {
    // add to Library only if the book is a Book Object
    if (book.constructor === Book)
        myLibrary.push(book);
}

const book1 = new Book('Practical C Programming', 'Steve OUaline', 400, true);
const book2 = new Book('A Complete Guide to C++ Programming', 'Ulla Kirch', 846, false);
const book3 = new Book('Pro Git', 'Scott Chacon', 441, false);
const book4 = new Book('Clean Code', 'Robert C. Martin', 462, false);
const book5 = new Book('C Programming Tutorial', 'Tutorialspoint', 200, true);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);

// console.log(cprogramming.constructor === Book);

// get the shelf where we'll be putting our books
const shelf = document.querySelector('.shelf');

// function to add books to shelf from myLibrary
const putBooks = (books) => {

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
    }
}

putBooks(myLibrary);