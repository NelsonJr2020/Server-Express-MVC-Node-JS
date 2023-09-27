document.addEventListener('DOMContentLoaded', function() {
    const pageLinks = document.querySelectorAll('.page-link');
    const previousPage = document.getElementById('previous-page');
    const nextPage = document.getElementById('next-page');
    let currentPage = getCurrentPageFromUrl();

    pageLinks.forEach(link => {
        const pageNumber = parseInt(link.getAttribute('data-page'));
    
            if (pageNumber === currentPage) {
                link.parentElement.classList.add('active');
            } else {
                link.parentElement.classList.remove('active');
            }
    });

    previousPage.addEventListener('click', (e) => {
        e.preventDefault();
        const currentPage = getCurrentPageFromUrl();
        if (currentPage > 1) {
            const previousPageNumber = currentPage - 1;
            window.location.href = `/posts/page/${previousPageNumber}`;
        }
        updatePaginationButtons();
    });

    nextPage.addEventListener('click', (e) => {
        e.preventDefault();
        const currentPage = getCurrentPageFromUrl();
        const totalPageCount = pageLinks.length - 2;
        if (currentPage < totalPageCount) {
            const nextPageNumber = currentPage + 1;
            window.location.href = `/posts/page/${nextPageNumber}`;
        }
        updatePaginationButtons();
    });

    function getCurrentPageFromUrl() {
        const url = window.location.href;
        const match = url.match(/\/page\/(\d+)/);
        if (match && match[1]) {
            return parseInt(match[1]);
        }
        return 1;
    }

    function updatePaginationButtons() {
        const currentPage = getCurrentPageFromUrl();
        const totalPageCount = pageLinks.length - 2;
        previousPage.classList.toggle('disabled', currentPage === 1);
        nextPage.classList.toggle('disabled', currentPage === totalPageCount);
    }
    
    updatePaginationButtons();
});