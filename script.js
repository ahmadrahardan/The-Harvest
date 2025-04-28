// Image Slider
document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;
    const sliderWrapper = document.querySelector('.slider-wrapper');
    let sliderInterval = setInterval(nextSlide, 3000);

    function updateSlider() {
        sliderWrapper.style.transition = 'transform 0.7s cubic-bezier(.77,0,.18,1)';
        sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    function goToSlide(idx) {
        currentSlide = idx;
        updateSlider();
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', function() {
            goToSlide(idx);
            resetInterval();
        });
    });

    const imgSlider = document.querySelector('.img-slider');
    if (imgSlider) {
        imgSlider.addEventListener('mouseenter', function() {
            clearInterval(sliderInterval);
        });
        imgSlider.addEventListener('mouseleave', function() {
            sliderInterval = setInterval(nextSlide, 3000);
        });
    }

    function resetInterval() {
        clearInterval(sliderInterval);
        sliderInterval = setInterval(nextSlide, 3000);
    }

    updateSlider();
});

// Hamburger
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger-btn');
    const nav = document.querySelector('.header-left nav');
    hamburger.addEventListener('click', function (e) {
        e.stopPropagation(); 
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });
    document.addEventListener('click', function (e) {
        if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        }
    });
});

// Logo Slider
document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector('.logo-slider-track');
    const wrap = document.querySelector('.logo-slider-track-wrap');
    const btnPrev = document.querySelector('.logo-slider-btn.prev');
    const btnNext = document.querySelector('.logo-slider-btn.next');

    let currentTranslate = 0;
    const itemWidth = 160 + 39; 
    const totalItems = track.children.length;

    function getMaxTranslate() {
        const totalWidth = itemWidth * totalItems;
        const visibleWidth = wrap.offsetWidth;
        if (totalWidth <= visibleWidth) return 0;
        return visibleWidth - totalWidth;
    }

    btnNext.addEventListener('click', function () {
        const maxTranslate = getMaxTranslate();
        if (currentTranslate - itemWidth < maxTranslate) {
            currentTranslate = maxTranslate;
        } else {
            currentTranslate -= itemWidth;
        }
        track.style.transform = `translateX(${currentTranslate}px)`;
    });

    btnPrev.addEventListener('click', function () {
        currentTranslate += itemWidth;
        if (currentTranslate > 0) currentTranslate = 0;
        track.style.transform = `translateX(${currentTranslate}px)`;
    });

    window.addEventListener('resize', () => {
        currentTranslate = 0;
        track.style.transform = `translateX(0px)`;
    });
});