document.getElementById('search-button-id').addEventListener('click', (event) => {
    //stop submit button default characteristics
    event.preventDefault();
    //when a new search start searching, clear books found message
    document.getElementById('search-count-id').textContent = '';
    //get search text, show message if the serach text is empty and return 
    const searchText = document.getElementById('search-text-id').value.trim();
    if (searchText === '') {
        showMessage("Write The Name of book first, then search", false);
        clearSearchResult();
        return;
    }
    //clear all the data when we do a search
    clearSearchResult();
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
            //set default value if API returning undefined
            let imgSrc = setDefaultValue(element?.cover_i, 'images/book.jpg');
            if (imgSrc !== 'images/book.jpg') {
                imgSrc = `https://covers.openlibrary.org/b/id/${element?.cover_i}-M.jpg`;
            }
            const title = setDefaultValue(element?.title, "Unavailable Information");
            const author = setDefaultValue(element?.author_name?.[0], "Unavailable Information");
            const publisher = setDefaultValue(element.publisher?.[0], "Unavailable Information");
            const firstPublishYear = setDefaultValue(element?.first_publish_year, "Unavailable Information");
            const authorNameArray = setDefaultValue(element?.author_name, author);
            const publisherArray = setDefaultValue(element?.publisher, publisher);
            const publishPlace = setDefaultValue(element?.publish_place?.[0], "a nice place")
            col.innerHTML = `<div class="card p-3 card-design h-100">
                                <img class="card-img-top"
                                src="${imgSrc}"
                                height="250px" alt="Book image" onerror="images/book.jpg">
                                <div class="card-body px-0 pb-0">
                                    <h3 class="card-title text-center mb-0">${title} </h3>
                                    <h6 class="card-title text-center mb-0 pb-4">
                                        By
                                        <span class='text-primary' title="${authorNameArray}">
                                            ${author}
                                        </span>
                                    </h6>
                                    <h6 class="card-title">
                                        Publisher :
                                        <span class='text-primary' title="${publisherArray}">
                                            ${publisher}
                                        <span>
                                    </h6>
                                    <p class="card-text">
                                        First pubished in 
                                        <span title="at ${publishPlace}">
                                            <b> ${firstPublishYear} </b>
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
//clear all previous data
const clearSearchResult = () => {
    //search started so make the search input empty
    document.getElementById('search-text-id').value = '';
    //search started so clear previous results inside books-holder-id
    document.getElementById('books-holder-id').textContent = '';

}
const setDefaultValue = (fromApi, dflt) => {
    if (fromApi === undefined) {
        return dflt;
    }
    else {
        return fromApi;
    }
}

//toggle spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
