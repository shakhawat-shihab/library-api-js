document.getElementById('search-button-id').addEventListener('click', (event) => {
    //stop submit button default characteristics
    event.preventDefault();
    //when a new search start, clear previous results and run spinner
    const booksHolder = document.getElementById('books-holder-id');
    booksHolder.textContent = '';
    //when a new search start, clear books found
    document.getElementById('search-count-id').textContent = '';
    //get search text and make search box empty after getting the text
    const searchText = document.getElementById('search-text-id').value.trim();
    if (searchText === '') {
        showMessage("Write The Name of book first, then search", false);
        return;
    }
    document.getElementById('search-text-id').value = '';
    //show spinner when search begins
    toggleSpinner('block');
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(response => response.json())
        .then(json => getSearchedBook(json, searchText))
});

const getSearchedBook = (data, searchText) => {
    //hide the spinner, as search is completed
    toggleSpinner('none');
    //get number of books found after search and the array consisting of books
    const numFound = data.numFound;
    const arrBooks = data.docs.slice(0, 50);
    const booksHolder = document.getElementById('books-holder-id');
    if (numFound !== 0) {
        //show the books found after search in website
        showMessage(`${numFound} Books found by searching '${searchText}'`, true);
        //loop through all the books and append them
        arrBooks.forEach(element => {
            const col = document.createElement('div');
            col.classList.add('col');
            col.innerHTML = `<div class="card p-3 card-design h-100">
                                <img class="card-img-top"
                                src="https://covers.openlibrary.org/b/id/${element?.cover_i}-M.jpg"
                                height="250px" alt="Book image">
                                <div class="card-body px-0 pb-0">
                                    <h3 class="card-title text-center mb-0">${element?.title} </h3>
                                    <h6 class="card-title text-center mb-0 pb-4">
                                        By
                                        <span class='text-primary' title="${element?.author_name}">
                                            ${element?.author_name?.[0]}
                                        </span>
                                    </h6>
                                    <h6 class="card-title">
                                        Publisher :
                                        <span class='text-primary' title="${element?.publisher}">
                                            ${element.publisher?.[0]}
                                        <span>
                                    </h6>
                                    <p class="card-text">
                                        First pubished in 
                                        <span title="at ${element?.publish_place?.[0]}">
                                            <b> ${element?.first_publish_year} </b>
                                        <span>
                                    </p>
                                 </div>
                            </div>`;
            booksHolder.appendChild(col);
        });

    }
    else {
        //show a message for no book found 
        showMessage(`No Book found by searching '${searchText}' `, false);
    }
}

//show message for search status
const showMessage = (message, isSuccess) => {
    const searchStatus = document.getElementById('search-count-id');
    if (isSuccess === true) {
        searchStatus.innerText = message;
        searchStatus.classList.remove('text-danger');
        searchStatus.classList.add('text-success');
    }
    else {
        searchStatus.innerText = message;
        searchStatus.classList.remove('text-success');
        searchStatus.classList.add('text-danger');
    }

}
//toggle spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}