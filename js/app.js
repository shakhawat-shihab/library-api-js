const startSearch = () => {
    //search text
    const search = document.getElementById('search-text-id').value;
    console.log(search)
}
document.getElementById('search-button-id').addEventListener('click', (event) => {
    //stop submit button default characteristics
    event.preventDefault();
    //search text
    const search = document.getElementById('search-text-id').value;
    console.log(search)
})