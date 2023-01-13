/**
 * Project Library
 *
 * This Project is inspired from The Odin Project Curriculum
 *
 * Author: Rohit Mehta
 **/

// Constants:
const shelf = document.getElementById("shelf");
const form = document.querySelector('form[name="add-new-book"]');
const formWrapper = document.querySelector('.form-wrapper');
const formCancelBtn = document.querySelector('form[name="add-new-book"] button.cancel');
const addBookBtn = document.querySelector("button.add-book");

// Book class
class Book {
    constructor(title, author, length, haveRead) {
        this.title = title; // String
        this.author = author; // String
        this.length = length; // Number
        this.haveRead = haveRead; // True means yes, False means no
        this.getBookInfo = _ => {
            return `${this.title} by ${this.author}, ${this.length} pages, ${
                this.haveRead ? "Read" : "Not Read"
            }`;
        };
        this.togglehaveRead = _ => {
            if (this.haveRead) this.haveRead = false;
            else this.haveRead = true;
        };
    }
}

const Library = JSON.parse(localStorage.getItem("data")) || [];

// Reconstruct the Book objects from the saved data
for (let i = 0; i < Library.length; i++) {
    const book = Library[i];
    Library[i] = new Book(book.title, book.author, book.length, book.haveRead);
}

// save the current library to the local storage
const saveData = () => {
    // Book constructor information is lost in saving.
    // reconstruct when reading from localStorage
    localStorage.setItem("data", JSON.stringify(Library));
};

const deleteData = () => {
    localStorage.clear();
};

const updateLocalStorage = () => {
    deleteData();
    saveData();
};

const addNewBook = book => {
    if (book.constructor === Book) {
        Library.push(book);
        updateLocalStorage();
    }
};

// Event Listeners:
addBookBtn.addEventListener('click', _ => {
    formWrapper.classList.remove('hidden');
});

formCancelBtn.addEventListener('click', _ => {
    formWrapper.classList.add('hidden');
});

// TODO:
const clearForm = () => {
    form.title.value = null;
    form.author.value = null;
    form.pgcount.value = null;
    form.read.value = null;
};

form.addEventListener("submit", e => {
    const read = form.read.value === "true" ? true : false;
    const newBook = new Book(
        form.title.value,
        form.author.value,
        form.pgcount.value,
        read
    );
    addNewBook(newBook);

    updateLibraryDisplay();

    clearForm();
    closeForm();

    e.preventDefault();
});
// form.cancel.addEventListener("click", closeForm);

// remove the Book from Library at index i
const deleteBook = i => {
    Library.splice(i, 1);
    updateLocalStorage();
};

// Number -> DocumentElement
// create a div element with class 'book' and data-id as the
// given number. Add book information from the Library[i]
const createBookElement = i => {
    const book = document.createElement("div");
    book.setAttribute("class", "book");
    book.setAttribute("data-id", i);

    const spanClose = document.createElement("span");
    spanClose.setAttribute("class", "close");
    spanClose.setAttribute("title", "Remove this book");
    spanClose.textContent = "x";

    spanClose.addEventListener("click", () => {
        const index = spanClose.parentNode.getAttribute("data-id");

        // console.log(index);

        deleteBook(index);

        updateLibraryDisplay();
    });

    const titleDiv = document.createElement("div");
    titleDiv.setAttribute("class", "title");
    titleDiv.textContent = Library[i].title;

    const authorDiv = document.createElement("div");
    authorDiv.setAttribute("class", "author");
    authorDiv.textContent = Library[i].author;

    const pg = document.createElement("div");
    pg.setAttribute("class", "pg");
    pg.textContent = Library[i].length + " Pages";

    const readDiv = document.createElement("div");
    readDiv.setAttribute("class", "read");
    readDiv.setAttribute("title", "Toggle Read Status");
    readDiv.textContent = Library[i].haveRead ? "Read ✅" : "Not Read ❌";

    readDiv.addEventListener("click", () => {
        const index = readDiv.parentNode.getAttribute("data-id");

        Library[index].togglehaveRead();

        updateLibraryDisplay();
    });

    book.appendChild(spanClose);
    book.appendChild(titleDiv);
    book.appendChild(authorDiv);
    book.appendChild(pg);
    book.appendChild(readDiv);

    return book;
};

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
};

// for testing:
// const book1 = new Book('Practical C Programming', 'Steve OUaline', 400, true);
// const book2 = new Book('A Complete Guide to C++ Programming', 'Ulla Kirch', 846, false);
// const book3 = new Book('Pro Git', 'Scott Chacon', 441, false);
// const book4 = new Book('Clean Code', 'Robert C. Martin', 462, false);
// const book5 = new Book('C Programming Tutorial', 'Tutorialspoint', 200, true);
// // console.log(cprogramming.constructor === Book);

// addNewBook(book1);
// addNewBook(book2);
// addNewBook(book3);
// addNewBook(book4);
// addNewBook(book5);

updateLibraryDisplay();
