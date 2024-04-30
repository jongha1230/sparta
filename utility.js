import {movieListHeading} from './search.js'

// 영화 카드들을 보이도록 설정하는 함수
const showMovieCards = () => {
    const movieCards = document.querySelectorAll(".movie-card");
    movieCards.forEach(movieCard => {
        movieCard.style.display = "block";
    });
};


// 페이지 초기화
const handlePageClear = () => {
    const searchInput = document.getElementById("search-input");
    searchInput.value = "";
    showMovieCards();
    movieListHeading.textContent = "The Entire List";
};

// 페이지 새로고침
const reloadPage1 = () => {
    window.location.reload();
};


// 라이트 모드 토글 함수
const toggleLightmode = () => {
    const body = document.body;
    const lightModeEnabled = !body.classList.contains('light-mode');
    body.classList.toggle('light-mode');

    // 라이트 모드 상태를 localStorage에 저장
    localStorage.setItem('lightModeEnabled', lightModeEnabled);
};

export {toggleLightmode, reloadPage1, handlePageClear};