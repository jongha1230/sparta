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
        moveSlide('.right', 'right');
        moveSlide('.left', 'left');
    })
    .catch(err => console.error(err));

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
document.getElementById("movie-list").addEventListener("click", (event) => {
    // 클릭된 요소가 영화 카드 또는 그 자식 요소인 경우에 처리
    const movieCard = event.target.closest(".movie-card");
    if (movieCard) {
        const clickedCardId = movieCard.id;        
        setTimeout(function() {
            window.alert(`ID: ${clickedCardId}`);
        }, 0);
    }
});

// 영화 카드들을 보이도록 설정하는 함수
const showMovieCards = () => {
    const movieCards = document.querySelectorAll(".movie-card");
    movieCards.forEach(movieCard => {
        movieCard.style.display = "block";
    });
};


// 화면에 슬라이드 표시
const displaySlides = (movies) => {
    const slider = document.querySelector(".right");
    const reverseSlider = document.querySelector(".left");

    // 각 영화의 이미지 URL을 가져와 슬라이드 항목을 생성하고 추가
    movies.forEach((movie, index) => {
        const slideItem = createSlideItem(movie);
        if (index < 10) {
            slider.appendChild(slideItem); // 인덱스가 0부터 9까지는 .slider에 추가
        } else {
            reverseSlider.appendChild(slideItem); // 인덱스가 10부터 19까지는 .slider.reverse에 추가
        }
    });
};
// 슬라이드 항목 생성
const createSlideItem = (movie) => {
    const slideItem = document.createElement("li");
    slideItem.classList.add("slide-item");

    // 영화 이미지
    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`; // 수정 필요한 부분
    img.alt = movie.title;

    slideItem.appendChild(img);
    return slideItem;
};
// 슬라이드 이동 함수
const moveSlide = (targetEl, direction) => {    
    const target = document.querySelector(targetEl);
    const firstLi = document.querySelector('li');
    const slideWidth = firstLi.offsetWidth + 16;
    const animation = target.animate([

        { right: direction === "right" ? `${slideWidth}px` : `-${slideWidth}px` }
    ], {
        duration: 4000,
        easing: 'linear'
    });

    animation.onfinish = () => {
        if (direction === "right") {
            target.appendChild(firstLi);
        } else {
            const lastLi = target.querySelector('li:last-child');
            target.insertBefore(lastLi, target.firstChild);
        }
        target.style.right = '0px';        
        moveSlide(targetEl, direction);
        
    }
};
// 슬라이더 열기/ 닫기 버튼
const toggleSlider = () => {
    const sliderContainer = document.querySelector('.slider-container');
    const sliderToggleBtn = document.getElementById('slider-toggle-btn');
    if (sliderContainer.style.display === 'none') {
        sliderContainer.style.display = 'block';
        sliderToggleBtn.textContent = '슬라이더 닫기';        
    } else {
        sliderContainer.style.display = 'none';
        sliderToggleBtn.textContent = '슬라이더 열기';        
    }
}

document.getElementById('slider-toggle-btn').addEventListener('click', toggleSlider);

// 슬라이더 아이템 이벤트 리스너 추가
document.querySelector('.slider-container').addEventListener('click', event => {
    const clickedSlideItem = event.target.closest('.slide-item');
    if (!clickedSlideItem) return;

    // 슬라이더 아이템의 alt값 == movie-card의 타이틀
    const movieTitle = clickedSlideItem.querySelector('img').alt;
    const movieCards = document.querySelectorAll('.movie-card');

    const targetMovieCard = Array.from(movieCards).find(movieCard => movieCard.querySelector('.movie-title').textContent === movieTitle);

    if (targetMovieCard) {
        targetMovieCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        console.log('Scrolled to movie card:', targetMovieCard);
    }
});

// 검색 입력 요소 참조
const searchInput = document.getElementById("search-input");
const headerTitle = document.getElementById("header-title");
const inputClearBtn = document.getElementById("input-clear-btn");
const lightmodeToggle = document.getElementById('light-mode-toggle');
const movieListHeading = document.getElementById("movie-list-heading");
// 검색 이벤트 리스너 
const searchForm = document.getElementById("serch-form");
searchForm.addEventListener("submit", (event) => {
    event.preventDefault(); // 폼 제출 방지
    const inputValue = searchForm.querySelector("input").value;
    filterMovies(inputValue);
});
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
// 페이지 초기화
const handlePageClear = () => {
    searchInput.value = "";
    showMovieCards();
    movieListHeading.textContent = "The Entire List";
};
// 페이지 새로고침
const reloadPage1 = () => {
    window.location.reload();
};

const setupEventListeners = () => {
    headerTitle.addEventListener("click", reloadPage1);
    inputClearBtn.addEventListener("click", handlePageClear);
    searchInput.addEventListener("input", handleSearch);
    lightmodeToggle.addEventListener('change', toggleLightmode);
}


// 라이트 모드 토글 함수
const toggleLightmode = () => {
    const body = document.body;
    const lightModeEnabled = !body.classList.contains('light-mode');
    body.classList.toggle('light-mode');

    // 라이트 모드 상태를 localStorage에 저장
    localStorage.setItem('lightModeEnabled', lightModeEnabled);
};

// 초기화 함수
const initialize = () => {
    setupEventListeners();
    const lightmodeToggle = document.getElementById('light-mode-toggle');
    const lightModeEnabled = localStorage.getItem('lightModeEnabled') === 'true';
    if (lightModeEnabled) {
        toggleLightmode();
        lightmodeToggle.checked = false;
    } else {
        lightmodeToggle.checked = true;
    }
};
const modalButton = document.getElementById("movie-list-header");

// "movie-list-header" 클릭 이벤트 리스너 추가
document.getElementById("movie-list-header").addEventListener("click", function () {
    document.getElementById("yearModal").style.display = "block";
});

// 모달 내 연도 항목 클릭 이벤트 리스너 추가
document.getElementById("yearModal").addEventListener("click", function (event) {
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

// 페이지 초기화
initialize();
setupEventListeners();