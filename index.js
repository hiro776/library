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
const formWrapper = document.querySelector(".form-wrapper");
const formCancelBtn = document.querySelector(
    'form[name="add-new-book"] button.cancel'
);
const addBookBtn = document.querySelector("button.add-book");

// Book class
class Book {
    constructor(title, author, length, haveRead) {
        this.title = title; // String
        this.author = author; // String
        this.length = length; // Number
        this.haveRead = haveRead; // True means yes, False means no
        this.getBookInfo = _ => {
            return {
                title: this.title,
                author: this.author,
                length: this.length,
                haveRead: this.haveRead,
                toggleReadStatus: this.togglehaveRead,
            };
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
addBookBtn.addEventListener("click", _ => {
    formWrapper.classList.remove("hidden");
    form.title.focus();
});

formCancelBtn.addEventListener("click", _ => {
    formWrapper.classList.add("hidden");
});

// Some keyboard shortcuts for the form
document.addEventListener("keydown", e => {
    if (e.ctrlKey && e.key === "a") {
        addBookBtn.click();
    }
    if (e.key === "Escape") {
        formCancelBtn.click();
    }
});

form.addEventListener("submit", e => {
    e.preventDefault(); // Prevent default form submit event
    const formDataReader = new FormData(form);
    const data = {};
    formDataReader.forEach(function (value, key) {
        data[key] = value;
    });

    addNewBook(
        new Book(data.title, data.author, data.pgcount, data.read === "yes")
    );
    console.log(Library);

    updateLibraryDisplay();
    formWrapper.classList.add("hidden");
    form.reset();
});

// remove the Book from Library at index i
const deleteBook = i => {
    Library.splice(i, 1);
    updateLocalStorage();
};

// Create a new Book DOM element and return it
const createBookElement = i => {
    const currentBookInfo = Library[i].getBookInfo();
    console.log(currentBookInfo);

    const bookWrapper = document.createElement("div");
    bookWrapper.classList.add(
        "book",
        "my-3",
        "mx-auto",
        "w-58",
        "rounded-lg",
        "bg-red",
        "shadow",
        "text-center"
    );
    bookWrapper.setAttribute("data-id", i);

    const book = document.createElement("div");
    book.classList.add("p-4");

    const titleH3 = document.createElement("h3");
    titleH3.classList.add(
        "title",
        "text-xl",
        "font-medium",
        "text-gray-900",
        "text-center",
        "border-b-2"
    );
    titleH3.textContent = currentBookInfo.title;

    const authorP = document.createElement("p");
    authorP.classList.add("author", "mt-1", "text-gray-500");
    authorP.textContent = currentBookInfo.author;

    const lengthP = document.createElement("p");
    lengthP.classList.add("author", "mt-1", "text-gray-500");
    lengthP.textContent = currentBookInfo.length + " Pages";

    const readStatusP = document.createElement("p");
    readStatusP.classList.add("author", "mt-1", "text-gray-500");
    readStatusP.textContent = currentBookInfo.haveRead
        ? "Read ✅"
        : "Not Read ❌";

    const bookControls = document.createElement("div");
    bookControls.classList.add("flex", "justify-center", "mt-2", "space-x-2");

    const toggleReadStatusBtn = document.createElement("button");
    toggleReadStatusBtn.classList.add(
        "rounded-lg",
        "border",
        "border-primary-500",
        "bg-green-500",
        "text-sm",
        "text-white",
        "px-2",
        "py-1.5",
        "text-center",
        "shadow-sm",
        "transition-all",
        "hover:border-primary-700",
        "hover:bg-green-300",
        "focus:ring",
        "focus:ring-primary-200"
    );
    toggleReadStatusBtn.textContent = currentBookInfo.haveRead
        ? "Mark as Unread"
        : "Mark as Read";
    toggleReadStatusBtn.addEventListener("click", _ => {
        currentBookInfo.toggleReadStatus();
        updateLocalStorage();
        updateLibraryDisplay();
    });

    const deleteBookBtn = document.createElement("button");
    deleteBookBtn.classList.add(
        "rounded-lg",
        "border",
        "border-primary-500",
        "bg-green-500",
        "text-sm",
        "text-white",
        "px-2",
        "py-1.5",
        "text-center",
        "shadow-sm",
        "transition-all",
        "hover:border-primary-700",
        "hover:bg-green-300",
        "focus:ring",
        "focus:ring-primary-200"
    );
    deleteBookBtn.textContent = "Delete";
    deleteBookBtn.addEventListener("click", _ => {
        deleteBook(i);
        updateLibraryDisplay();
    });

    bookControls.appendChild(toggleReadStatusBtn);
    bookControls.appendChild(deleteBookBtn);

    book.appendChild(titleH3);
    book.appendChild(authorP);
    book.appendChild(lengthP);
    book.appendChild(readStatusP);
    book.appendChild(bookControls);

    bookWrapper.appendChild(book);

    return bookWrapper;
};

const updateLibraryDisplay = () => {
    // remove all children of book in the DOM
    self.innerHTML = "";

    // and add new ones instead
    for (let i = 0; i < Library.length; i++) {
        const book = createBookElement(i);
        shelf.appendChild(book);
    }
};

updateLibraryDisplay();
