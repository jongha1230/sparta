import { displaySlides } from './slider.js';

const generateMovieCards = async () => {
    try {
        const movies = await fetchData(); // fetchData는 외부 모듈에서 가져오거나 정의된 함수입니다.        
        sortAndDisplayMovies(movies); // 영화를 화면에 표시하는 함수        
    } catch (error) {
        console.error('Error generating movie cards:', error);
    }
}

// 평점 순으로 정렬 후 영화 표시 함수
const sortAndDisplayMovies = (movies) => {
    const sortedMovies = movies.sort((a, b) => b.vote_average - a.vote_average);
    displayMovies(sortedMovies);
    displaySlides(movies);
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

// 영화 이미지 생성 함수
const createMovieImage = (imageUrl, title) => {
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = title;
    return img;
}

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

    const img = createMovieImage(`https://image.tmdb.org/t/p/w500${movie.poster_path}`, movie.title);
    const title = createMovieTitle(movie.title); // 영화 타이틀 요소 생성
    const content = createMovieContent(movie.overview); // 영화 소개 요소 생성
    const rating = createMovieRating(movie.vote_average); // 영화 평점 요소 생성
    const placeBadge = createPlaceBadge(index); // 영화 뱃지 생성

    movieCard.append(img, title, rating, content, placeBadge);
    return movieCard;
};

// 영화 리스트의 부모 요소에 클릭 이벤트 리스너 추가
const movieCardClickHandler = (event) => {
    // 클릭된 요소가 영화 카드 또는 그 자식 요소인 경우에 처리
    const movieCard = event.target.closest(".movie-card");
    if (movieCard) {
        const clickedCardId = movieCard.id;
        setTimeout(function () {
            window.alert(`ID: ${clickedCardId}`);
        }, 0);
    }
}

const fetchData = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDdjM2E5NTI2YTU3NzhiMzE0NzBmOTRiZjNhNTBhMiIsInN1YiI6IjY2MjViOTY1NjJmMzM1MDEzMWQ3NmI4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-66TRfv5_e2cKiMh5hxDpVFBWQLsa6hWTCzAB64WOwc'
        }
    };

    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return [];
    }
};

export { movieCardClickHandler, generateMovieCards, fetchData };