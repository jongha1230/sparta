import { movieCardClickHandler, generateMovieCards } from './movieCard.js';
import { toggleLightmode, reloadPage1, handlePageClear } from './utility.js';
import { modalOpen, modalFilterMovie } from './modal.js';
import {searchInput, handleSearch, classicSerch} from './search.js'
import {moveSlide, slideMoveCard, toggleSlider} from './slider.js'


const headerTitle = document.getElementById("header-title");
const lightmodeToggle = document.getElementById('light-mode-toggle');
const modalButton = document.getElementById("movie-list-header"); // 모달 오픈 버튼
const modal = document.getElementById("yearModal");
const inputClearBtn = document.getElementById("input-clear-btn");
const searchForm = document.getElementById("serch-form");
const sliderToggleBtn = document.getElementById('slider-toggle-btn');
const sliderContainer = document.querySelector('.slider-container');
const moiveList = document.getElementById("movie-list");

const setupEventListeners = () => {
    headerTitle.addEventListener("click", reloadPage1); // 홈페이지 제목 클릭시 페이지 초기화
    inputClearBtn.addEventListener("click", handlePageClear); // 검색창 클리어 버튼 클릭 시 검색 창 초기화
    searchInput.addEventListener("input", handleSearch); // 실시간 검색 기능
    lightmodeToggle.addEventListener('change', toggleLightmode); // 라이트/다크 모드 온 오프
    moiveList.addEventListener("click", movieCardClickHandler); // 영화 카드 클릭시 ID창 출력
    modalButton.addEventListener("click", modalOpen); // 버튼 클릭 시 모달창 켜기 
    modal.addEventListener("click", modalFilterMovie); // 모달창 항목 클릭 시 영화 연도별 필터링
    searchForm.addEventListener("submit", classicSerch); // 기본 폼으로 검색 이벤트
    sliderToggleBtn.addEventListener('click', toggleSlider); // 슬라이더 토글 버튼
    sliderContainer.addEventListener('click', slideMoveCard); // 슬라이더 항목 클릭 시 해당 영화 카드 위치로 이동
}

const initialize = async () => {
    setupEventListeners();
    const lightmodeToggle = document.getElementById('light-mode-toggle');
    const lightModeEnabled = localStorage.getItem('lightModeEnabled') === 'true';
    if (lightModeEnabled) {
        toggleLightmode();
        lightmodeToggle.checked = false;
    } else {
        lightmodeToggle.checked = true;
    }

    try {
        await generateMovieCards();
        moveSlide('.right', 'right');
        moveSlide('.left', 'left');
    } catch (error) {
        console.error('Error initializing the page:', error);
    }
};

initialize();