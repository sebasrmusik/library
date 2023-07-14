const libraryContainer = document.querySelector('.library');
const library = [];
const bookForm = document.querySelector('#add-book-form');
const bookModal = new bootstrap.Modal(document.querySelector('#add-book'))
const bookModalCloseBtn = document.querySelector('#add-book-close-btn')

function Book (title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

bookModalCloseBtn.addEventListener('click', () => {
    bookForm.reset()
})

bookForm.addEventListener('submit', e => {
    e.preventDefault();
    if(!bookForm.checkValidity()){
        bookForm.classList.add('was-validated');
    } else {
        library.push(new Book(
            bookForm.querySelector('#book-title').value, 
            bookForm.querySelector('#author-name').value, 
            bookForm.querySelector('#page-num').value, 
            bookForm.querySelector('#read').checked
            ));
            //console.log(library);
        const newElement = document.createElement('div');
        newElement.classList.add('col')
            
        const element = library.length - 1;

        newElement.innerHTML = `
            <div class="card p-3 text-center bg-light rounded-3 h-100" data-book-num="${element}">
                <h3 class="title">${library[element].title}</h3>
                <h5 class="">${library[element].author}</h5>
                <p class="">${library[element].pages} pages</p>
                <button class="btn ${library[element].read ? 'btn-success' : 'btn-danger'} mb-2" id="read-toggle">${library[element].read ? 'Read' : 'Not read'}</button>
                <button class="btn btn-dark" id="book-remove">Remove</button>
            </div>
            `
        libraryContainer.appendChild(newElement)
        const btn = newElement.querySelector('#read-toggle')
        btn.addEventListener('click', () => {
            const elementId = btn.parentElement.getAttribute('data-book-num')
            library[elementId].read = !library[elementId].read;
            if(library[elementId].read){
                btn.classList.remove('btn-danger')
                btn.classList.add('btn-success')
                btn.innerText = 'Read'
            } else {
                btn.classList.remove('btn-success')
                btn.classList.add('btn-danger')
                btn.innerText = 'Not read'
            }
        })

        const btnRemove = newElement.querySelector('#book-remove')
        btnRemove.addEventListener('click', () => {
            const elementId = btn.parentElement.getAttribute('data-book-num')
            const element = btn.parentElement.parentElement;
            element.parentNode.removeChild(element)
            library.splice(elementId, 1);
        })

        bookModal.hide();
        bookForm.reset();
    }
})

