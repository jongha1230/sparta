import { showMovieCards} from './search.js';

// 모달창 오픈
const modalOpen = () => {
    document.getElementById("yearModal").style.display = "block";
}

// 연도별 영화 필터링 함수
const filterMoviesByYear = (year) => {
    const movieCards = document.querySelectorAll(".movie-card");
    movieCards.forEach(movieCard => {
        if (movieCard.classList.contains(year)) {
            movieCard.style.display = "block";
        } else {
            movieCard.style.display = "none"; // 선택된 연도의 클래스가 없는 영화 카드는 숨김
        }
    });
};

// 모달창 항목 클릭 시 연도별 필터링
const modalFilterMovie = (event) => {
    const modal = document.getElementById("yearModal");
    const target = event.target;
    // 모달 영역 밖을 클릭하면 모달 닫기
    if (event.target == modal) {
        modal.style.display = "none";
    }

    if (target.classList.contains("year-item")) {
        const yearId = target.id;
        if (yearId === "all") {
            showMovieCards(); // "All"을 선택한 경우 모든 영화 카드 보이기
            document.getElementById("movie-list-heading").textContent = "The Entire List"; // 클릭된 항목의 id를 movie-list-heading의 텍스트로 설정
        } else {
            filterMoviesByYear(yearId);
            document.getElementById("movie-list-heading").textContent = target.textContent;
        }
        modal.style.display = "none";

        if (window.innerWidth <= 768) {
            const movieList = document.getElementById("movie-list");
            movieList.scrollTo({
                left: 0,
                behavior: "smooth"
            });
        }
    }
}
export {modalOpen, modalFilterMovie};