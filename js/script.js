//get the ui element
let form = document.getElementById('book_form'),
book_list = document.querySelector('#book_list');



//book class
class Book {
    constructor(title, author,icbn){
        this.title = title;
        this.author = author;
        this.icbn = icbn;
    }
}

// UI class
class UI{
   
   static addToBooklist(book){
        let list = document.querySelector('#book_list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.icbn}</td>
        <td><a href="#" class='delete'>X</a></td>`;
        list.appendChild(row)
    };
    static  clearFields(){
       document.getElementById('title').value = '',
       document.getElementById('author').value = '';
       document.getElementById('icbn').value = '';
    }
    static  showAlert(message, className){
        let div = document.createElement('div');
        div.className = `alert ${className}`
        div.appendChild(document.createTextNode(message))
        let container = document.querySelector('.container');
        let form = document.getElementById('book_form');
        container.insertBefore(div,form);

        setTimeout(() => {
            document.querySelector('.alert').remove()
        },3000)
    }

    static deleteFromBook(target){
        if (target.hasAttribute('href')) {
            target.parentElement.parentElement.remove();
            Store.removeBook(target.parentElement.previousElementSibling.textContent.trim())
            UI.showAlert('Removed successfully!', 'success');
        }
    }

}

// Local Storage class
class Store{
    static getBooks(){
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
        console.log(books);
    }
    static displayBook(){
        let books = Store.getBooks();
        books.forEach(book => {
            UI.addToBooklist(book);
        });
    }
    static removeBook(icbn){
        let books = Store.getBooks();

        books.forEach((book,index) => {
            if (book.icbn === icbn) {
                books.splice(index,1)
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }

}


//add eventLIstener
form.addEventListener('submit', newBook);
book_list.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded',Store.displayBook())


// define function
function newBook(e){
    let title = document.getElementById('title').value,
     author = document.getElementById('author').value,
     icbn = document.getElementById('icbn').value

     if (title === '' || author === '' || icbn === '') {
        UI.showAlert('Please fill all the fields!', 'error')
     }
     else {
        let book = new Book(title,author,icbn);
    
       
        UI.addToBooklist(book);
        UI.clearFields()
        UI.showAlert('Book added successfully!', 'success')
        Store.addBook(book);
     }

  ;


    e.preventDefault();
}


//book remove function 
function removeBook(e){
    UI.deleteFromBook(e.target);
    
    e.preventDefault();
}