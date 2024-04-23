// 옵션 설정
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDdjM2E5NTI2YTU3NzhiMzE0NzBmOTRiZjNhNTBhMiIsInN1YiI6IjY2MjViOTY1NjJmMzM1MDEzMWQ3NmI4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-66TRfv5_e2cKiMh5hxDpVFBWQLsa6hWTCzAB64WOwc'
    }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(data => {
        // 받아온 데이터를 변수에 저장
        const movies = data.results;
        sortAndDisplayMovies(movies); // 평점 순으로 정렬 후 화면에 표시
    })
    .catch(err => console.error(err));

// 평점 순으로 정렬 후 영화 표시 함수
const sortAndDisplayMovies = (movies) => {
    const sortedMovies = movies.sort((a, b) => b.vote_average - a.vote_average);
    displayMovies(sortedMovies);
};

// 화면에 영화 목록 표시 함수
const displayMovies = (movies) => {
    const movieList = document.getElementById("movie-list");
    const fragment = document.createDocumentFragment(); // DOM 조작을 위한 프래그먼트 생성

    movies.forEach((movie, index) => {
        const movieCard = createMovieCard(movie, index); // 영화 카드 생성
        fragment.appendChild(movieCard); // 프래그먼트에 영화 카드 추가
    });

    movieList.appendChild(fragment); // 프래그먼트를 한 번에 DOM에 추가
};

// 영화 타이틀 요소 생성 함수
const createMovieTitle = (titleText) => {
    const title = document.createElement("h3");
    title.classList.add("movie-title");
    title.textContent = titleText;
    return title;
};

// 영화 소개 요소 생성 함수
const createMovieContent = (overviewText) => {
    const content = document.createElement("p");
    content.classList.add("movie-content");
    content.textContent = overviewText;
    return content;
};

// 영화 평점 요소 생성 함수
const createMovieRating = (voteAverage) => {
    const rating = document.createElement('div');
    rating.classList.add('movie-rating');
    rating.textContent = `⭐ ${voteAverage.toFixed(1)}`;
    return rating;
};

// 영화 순위 뱃지 생성 함수
const createPlaceBadge = (index) => {
    const placeBadge = document.createElement('div');
    placeBadge.classList.add('place-badge');
    placeBadge.textContent = `${index + 1}`;
    return placeBadge;
};


// 영화 카드 생성 함수
const createMovieCard = (movie, index) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.id = `${movie.id}`;

    // 출시 연도에 따라 클래스 추가
    const releaseYear = parseInt(movie.release_date.split('-')[0]);
    if (releaseYear < 1960) {
        movieCard.classList.add("before1960");
    } else if (releaseYear < 1970) {
        movieCard.classList.add("1960s");
    } else if (releaseYear < 1980) {
        movieCard.classList.add("1970s");
    } else if (releaseYear < 1990) {
        movieCard.classList.add("1980s");
    } else if (releaseYear < 2000) {
        movieCard.classList.add("1990s");
    } else if (releaseYear < 2010) {
        movieCard.classList.add("2000s");
    } else {
        movieCard.classList.add("after2010");
    }

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    img.alt = movie.title;

    const title = createMovieTitle(movie.title); // 영화 타이틀 요소 생성
    const content = createMovieContent(movie.overview); // 영화 소개 요소 생성
    const rating = createMovieRating(movie.vote_average); // 영화 평점 요소 생성
    const placeBadge = createPlaceBadge(index); // 영화 뱃지 생성

    movieCard.append(img, title, rating, content, placeBadge);
    return movieCard;
};

// 검색 이벤트 리스너 
const searchForm = document.getElementById("serch-form");
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputValue = searchForm.querySelector("input").value;
    filterMovies(inputValue);
});
// 영화 카드들을 보이도록 설정하는 함수
const showMovieCards = () => {
    const movieCards = document.querySelectorAll(".movie-card");
    movieCards.forEach(movieCard => {
        movieCard.style.display = "block";
    });
};

window.addEventListener('DOMContentLoaded', () => {
    // HTML 요소를 DOM으로 가져오기
    const searchInput = document.getElementById("search-input");
    const headerTitle = document.getElementById("header-title");
    const inputClearBtn = document.getElementById("input-clear-btn");

    headerTitle.addEventListener("click", pageClear);
    inputClearBtn.addEventListener("click", pageClear);
    // 검색어 입력창에 이벤트 리스너 추가
    searchInput.addEventListener("input", () => {
        const inputValue = searchInput.value.trim(); // 입력된 검색어
        if (inputValue.length >= 3) {
            filterMovies(inputValue);
        } else {
            showMovieCards();
        }
    });

    // 검색창 클리어 버튼 이벤트 처리 리스너
    function pageClear() {
        searchInput.value = "";
        showMovieCards();
    };
});

// 입력값에 해당하는 영화 필터링 함수
const filterMovies = (inputValue) => {
    const movieCards = document.querySelectorAll(".movie-card");
    movieCards.forEach(movieCard => {
        const title = movieCard.querySelector(".movie-title").textContent.toLowerCase();
        movieCard.style.display = title.includes(inputValue.toLowerCase()) ? "block" : "none";
    });
};

// 영화 리스트의 부모 요소에 클릭 이벤트 리스너 추가
document.getElementById("movie-list").addEventListener("click", (event) => {
    // 클릭된 요소가 영화 카드 또는 그 자식 요소인 경우에 처리
    const movieCard = event.target.closest(".movie-card");
    if (movieCard) {
        const clickedCardId = movieCard.id;
        window.alert(`ID: ${clickedCardId}`);
    }
});

// 다크 모드 토글 함수
const toggleLightmode = () => {
    const body = document.body;
    const lightModeEnabled = !body.classList.contains('light-mode');
    body.classList.toggle('light-mode');

    // 다크 모드 상태를 localStorage에 저장
    localStorage.setItem('lightModeEnabled', lightModeEnabled);
};

// 페이지 로드 시 localStorage에서 다크 모드 설정 가져오기
window.addEventListener('DOMContentLoaded', () => {
    const lightModeEnabled = localStorage.getItem('lightModeEnabled') === 'true';
    const lightmodeToggle = document.getElementById('light-mode-toggle');

    // 다크 모드 설정이 저장된 경우에만 다크 모드를 활성화하고 체크박스를 업데이트합니다.
    if (lightModeEnabled) {
        toggleLightmode();
        lightmodeToggle.checked = false;
    } else {
        lightmodeToggle.checked = true;
    }
});

// 다크 모드 토글 체크박스의 이벤트 리스너
document.getElementById('light-mode-toggle').addEventListener('change', toggleLightmode);

// "year-button" 클릭 이벤트 리스너 추가
document.getElementById("year-button").addEventListener("click", function () {
    // 모달 표시
    document.getElementById("yearModal").style.display = "block";
});

// 모달 영역 밖을 클릭하면 모달 닫기
window.onclick = function (event) {
    var modal = document.getElementById("yearModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// 모달 내 연도 항목 클릭 이벤트 리스너 추가
document.getElementById("yearModal").addEventListener("click", function(event) {
    const target = event.target;
    if (target.classList.contains("year-item")) {
        const yearId = target.id;
        if (yearId === "all") {
            showMovieCards(); // "All"을 선택한 경우 모든 영화 카드 보이기
        } else {
            filterMoviesByYear(yearId);
        }
    }
});
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