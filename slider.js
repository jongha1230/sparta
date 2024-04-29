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
    const firstLi = target.querySelector(`li`);    
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

// 슬라이더 아이템 이벤트 리스너 추가
const slideMoveCard = (event) => {
    const modalButton = document.getElementById("movie-list-heading");
    if (modalButton.textContent === "The Entire List") {
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
    }

}

export { displaySlides, moveSlide, slideMoveCard, toggleSlider };