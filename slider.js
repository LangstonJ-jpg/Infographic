class Slider {
    constructor(slides) {
        this.slides = slides;
        this.currentSlide = 0;
    }

    init() {
        this.showSlide(this.currentSlide);
        this.setupEventListeners();
    }

    showSlide(index) {
        const slides = document.querySelectorAll('.slide');
        slides.forEach((slide, i) => {
            slide.style.display = (i === index) ? 'block' : 'none';
        });
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(this.currentSlide);
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(this.currentSlide);
    }

    setupEventListeners() {
        const nextButton = document.querySelector('.next');
        const prevButton = document.querySelector('.prev');

        nextButton.addEventListener('click', () => this.nextSlide());
        prevButton.addEventListener('click', () => this.prevSlide());
    }
}

export default Slider;