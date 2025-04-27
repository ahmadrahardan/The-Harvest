$(document).ready(function() {
    let currentSlide = 0;
    const slides = $('.slide');
    const dots = $('.dot');
    const totalSlides = slides.length;
    let sliderInterval = setInterval(nextSlide, 3000);

    function updateSlider() {
        $('.slider-wrapper').css('transform', `translateX(-${currentSlide * 100}%)`);
        dots.removeClass('active');
        dots.eq(currentSlide).addClass('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    function goToSlide(idx) {
        currentSlide = idx;
        updateSlider();
    }

    dots.each(function(idx) {
        $(this).on('click', function() {
            goToSlide(idx);
            resetInterval();
        });
    });

    $('.img-slider').hover(
        function() { clearInterval(sliderInterval); },
        function() { sliderInterval = setInterval(nextSlide, 3000); }
    );

    function resetInterval() {
        clearInterval(sliderInterval);
        sliderInterval = setInterval(nextSlide, 3000);
    }

    // Inisialisasi posisi awal
    updateSlider();
});







let logoIndex = 0;
const logosVisible = 3; // berapa logo tampil dalam viewport (desktop)
const $track = $('.logo-slider-track');
const $items = $('.logo-item');
const total = $items.length;

function updateSlider() {
    const itemWidth = $items[0].offsetWidth + 48; // 48px gap
    let maxIdx = total - logosVisible;
    if (logoIndex < 0) logoIndex = 0;
    if (logoIndex > maxIdx) logoIndex = maxIdx;
    $track.css('transform', `translateX(${-logoIndex * itemWidth}px)`);
}

// Tombol prev/next
$('.logo-slider-btn.prev').click(function() {
    logoIndex--;
    updateSlider();
});
$('.logo-slider-btn.next').click(function() {
    logoIndex++;
    updateSlider();
});

// Responsive logo count
function adjustVisible() {
    if (window.innerWidth <= 900) {
        logosVisible = 2;
    } else {
        logosVisible = 3;
    }
    updateSlider();
}
$(window).on('resize', adjustVisible);
$(document).ready(function() {
    adjustVisible();
});
