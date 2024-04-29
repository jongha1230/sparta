// 영화 카드들을 보이도록 설정하는 함수
const showMovieCards = () => {
    const movieCards = document.querySelectorAll(".movie-card");
    movieCards.forEach(movieCard => {
        movieCard.style.display = "block";
    });
};

const searchInput = document.getElementById("search-input");
const movieListHeading = document.getElementById("movie-list-heading");

// 검색 이벤트 리스너 
const searchForm = document.getElementById("serch-form");

const classicSerch = (event) => {
    event.preventDefault(); // 폼 제출 방지
    const inputValue = searchForm.querySelector("input").value;
    filterMovies(inputValue);
}

// 검색 이벤트 처리
const handleSearch = (event) => {
    event.preventDefault();
    const inputValue = searchInput.value.trim(); // 입력된 검색어
    if (inputValue.length >= 3) {
        filterMovies(inputValue);
        movieListHeading.textContent = "Filtered List";
    } else {
        showMovieCards();
        movieListHeading.textContent = "The Entire List";
    }
};

// 입력값에 해당하는 영화 필터링 함수
const filterMovies = (inputValue) => {
    const movieCards = document.querySelectorAll(".movie-card");
    movieCards.forEach(movieCard => {
        const title = movieCard.querySelector(".movie-title").textContent.toLowerCase();
        movieCard.style.display = title.includes(inputValue.toLowerCase()) ? "block" : "none";
    });
};

export {searchInput, movieListHeading, handleSearch, classicSerch, showMovieCards};
