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
function displayMovies(movies) {
    const movieList = document.getElementById("movie-list");
    clearMovieList(movieList); // 영화 리스트 초기화

    movies.forEach((movie, index) => {
        const movieCard = createMovieCard(movie, index); // 영화 카드 생성
        movieList.appendChild(movieCard);
    });
};

// 영화 카드 생성 함수
const createMovieCard = (movie, index) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.id = `${movie.id}`;

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    img.alt = movie.title;

    const title = createMovieTitle(movie.title); // 영화 타이틀 요소 생성
    const content = createMovieContent(movie.overview); // 영화 소개 요소 생성
    const rating = createMovieRating(movie.vote_average); // 영화 평점 요소 생성
    const placeBadge = createPlaceBadge(index); // 1위 ~ 3위 영화 뱃지 생성

    movieCard.append(img, title, rating, content);
    if (index < 3) {
        movieCard.appendChild(placeBadge);
    }

    // 영화 카드 클릭시 alert창이 뜨는 이벤트리스너
    movieCard.addEventListener("click", () => {
        const clickedCardId = movieCard.id;
        window.alert(`ID: ${clickedCardId}`);
    });

    return movieCard;
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

// 1위 ~ 3위 영화 뱃지 생성 함수
const createPlaceBadge = (index) => {
    const placeBadge = document.createElement('div');
    placeBadge.classList.add('place-badge');
    placeBadge.textContent = `${index + 1}st`;
    return placeBadge;
};

// 영화 리스트 초기화 함수
const clearMovieList = (movieList) => {
    movieList.innerHTML = "";
};

// 검색 이벤트 리스너 
const searchForm = document.getElementById("serch-form");
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputValue = searchForm.querySelector("input").value;
    filterMovies(inputValue);
});

// 입력값에 해당하는 영화 필터링 함수
const filterMovies = (inputValue) => {
    const movieCards = document.querySelectorAll(".movie-card");
    movieCards.forEach(movieCard => {
        const title = movieCard.querySelector(".movie-title").textContent.toLowerCase();
        movieCard.style.display = title.includes(inputValue.toLowerCase()) ? "block" : "none";
    });
};

// HTML 요소를 DOM으로 가져오기
const searchInput = document.getElementById("search-input");

// 메인 타이틀 클릭 시 페이지 새로고침 
document.getElementById("header-title").addEventListener("click", () => {
    searchInput.focus();
    location.reload();    
});

// 검색창 클리어 버튼 이벤트 처리 리스너
document.getElementById("input-clear-btn").addEventListener("click", () => {
    searchInput.value = "";
});

// 페이지 로드 또는 새로고침 이벤트가 발생하면 검색 입력란에 포커스
window.addEventListener("load", () => {
    searchInput.focus();
});