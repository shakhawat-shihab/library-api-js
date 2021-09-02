document.getElementById('search-button-id').addEventListener('click', (event) => {
    //stop submit button default characteristics
    event.preventDefault();
    //get search text and make search box empty after getting the text
    const searchText = document.getElementById('search-text-id').value;
    document.getElementById('search-text-id').value = '';
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(response => response.json())
        .then(json => getSearchedBook(json, searchText))
});

const getSearchedBook = (data, searchText) => {
    console.log('search text : ', searchText);
    console.log(data.numFound);
    console.log(data.docs);
    console.log(data.docs.length);

    const numFound = data.numFound;
    const arrBooks = data.docs;
    if (numFound !== 0) {
        //show number of books found
        const searchStatus = document.getElementById('search-count-id');
        searchStatus.innerText = `${numFound} Books found by searching '${searchText}'`;
        searchStatus.classList.remove('text-danger');
        searchStatus.classList.add('text-success');
        //loop through all the books and append them
        const booksHolder = document.getElementById('books-holder-id');
        arrBooks.forEach(element => {
            const col = document.createElement('div');
            col.classList.add('col');
            col.innerHTML = `<div class="card p-3 card-design h-100">
                                <img class="card-img-top"
                                src="https://covers.openlibrary.org/b/id/${element?.cover_i}-M.jpg"
                                height="300px" alt="Card image cap">
                                <div class="card-body px-0 pb-0">
                                    <h3 class="card-title text-center mb-0">${element?.title} </h3>
                                    <h6 class="card-title text-center mb-0 pb-4">
                                        By
                                        <span class='text-primary' title="${element?.author_name}">
                                            ${element?.author_name[0]}
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
        const searchStatus = document.getElementById('search-count-id');
        searchStatus.innerText = `No Book found by searching '${searchText}'`;
        searchStatus.classList.add('text-danger');
    }
}