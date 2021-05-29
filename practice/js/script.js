//get the UI element
let form = document.querySelector('#book_form');
let book_list = document.querySelector('#book_list');
let container = document.querySelector('.container');


//define class
//book class
class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI class
class UI {
    static addToBooklist(book){
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#">x</a></td>
        `;
        book_list.appendChild(row);
    }
    static clearFields(){
         document.querySelector('#title').value = '';
         document.querySelector('#author').value = '';
         document.querySelector('#isbn').value = '';
    }
    static showAlert(message,cName){
        let div = document.createElement('div');
        div.className =   `alert ${cName}`;
        div.appendChild(document.createTextNode(message));
        container.insertBefore(div,form);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        },3000)
    }
    static removeFromBook(target){
        if (target.hasAttribute('href')) {
            target.parentElement.parentElement.remove();
            Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
            UI.showAlert('Book deleted successfully!','error');
        }
    }
}
// store class
class Store{
    static getBook(){
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
static addBook(book){
    let books = Store.getBook();
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
}

    static displayBook(){
        let books = Store.getBook();
        books.forEach(book => {
            UI.addToBooklist(book);
        });
    }
    static removeBook(isbn){
        let books = Store.getBook();
        books.forEach((book,index) => {
            if (book.isbn === isbn) {
                books.splice(index,1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}



//define add event listener
form.addEventListener('submit', newBook);
book_list.addEventListener('click',removeBook);
document.addEventListener('DOMContentLoaded', Store.displayBook());

//define function
function newBook(e) {
    let title = document.querySelector('#title').value,
    author = document.querySelector('#author').value,
    isbn = document.querySelector('#isbn').value;
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('All Field required!','error');
    }
    else{
        let book = new Book(title,author,isbn);
        UI.addToBooklist(book);
        Store.addBook(book);
        UI.clearFields();
        UI.showAlert('Book added successfully!','success');
    }
    

    e.preventDefault();
}

function  removeBook(e) {
        UI.removeFromBook(e.target);
}