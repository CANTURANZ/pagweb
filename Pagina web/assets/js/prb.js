class CarouselManager {
  constructor(carouselSelector, arrowBtnsSelector, cardBtnsSelector) {
    this.carousel = document.querySelector(carouselSelector);
    this.arrowBtns = document.querySelectorAll(arrowBtnsSelector);
    this.cardBtns = document.querySelectorAll(cardBtnsSelector);
    this.currentCard = 0;
    this.direction = 1;
    this.initializeCarousel();
    this.numCards = this.cardBtns.length;
  }

  initializeCarousel() {
    this.setupArrowBtnHandlers();
    this.setupCardBtnHandlers();
    this.moveCards();
  }

  setupArrowBtnHandlers() {
    this.arrowBtns.forEach((btn, i) => {
      this.applyPointerEffect(btn, 'expo', '0 3px 4px #00000050');
      btn.onclick = () => {
        this.direction = i === 1 ? 1 : -1; 
        this.currentCard += i === 1 ? 1 : -1; // Invierte la lógica de avance/retroceso
        this.currentCard = Math.min(this.numCards - 1, Math.max(0, this.currentCard));
        this.moveCards(0.75);
      };
    });
  }

  setupCardBtnHandlers() {
    this.cardBtns.forEach((btn, i) => {
      this.applyPointerEffect(btn, 'power3', (i === this.currentCard) ? '0 6px 11px #00000030' : '0 0px 0px #00000030');
      btn.onclick = () => {
        this.direction = i < this.currentCard ? 1 : -1;
        this.currentCard = i;
        this.moveCards(0.75);
      };
    });
  }

  applyPointerEffect(btn, ease, shadow) {
    btn.onpointerenter = () => gsap.to(btn, { ease, 'box-shadow': shadow });
    btn.onpointerleave = () => gsap.to(btn, { ease, 'box-shadow': '0 6px 8px #00000030' });
  }

  moveCards(duration = 0) {
    const cardWidth = 270;
    gsap.timeline({ defaults: { duration, ease: 'power3', stagger: { each: -0.03 * this.direction } } })
      .to('.card', {
        x: -cardWidth * this.currentCard,
        y: (i) => (i === this.currentCard) ? 0 : 15,
        height: (i) => (i === this.currentCard) ? 270 : 240,
        ease: 'elastic.out(0.4)'
      }, 0)
      .to('.card', {
        cursor: (i) => (i === this.currentCard) ? 'default' : 'pointer',
        'box-shadow': (i) => (i === this.currentCard) ? '0 6px 11px #00000030' : '0 0px 0px #00000030',
        border: (i) => (i === this.currentCard) ? '2px solid #26a' : '0px solid #fff',
        background: (i) => (i === this.currentCard) ? 'radial-gradient(100% 100% at top, #fff 0%, #fff 99%)' : 'radial-gradient(100% 100% at top, #fff 20%, #eee 175%)',
        ease: 'expo'
      }, 0)
      .to('.icon svg', {
        attr: {
          stroke: (i) => (i === this.currentCard) ? 'transparent' : '#36a',
          fill: (i) => (i === this.currentCard) ? '#36a' : 'transparent'
        }
      }, 0)
      .to('.arrow-btn-prev, .arrow-btn-next', {
        autoAlpha: (i) => (i === 0 && this.currentCard === 0) || (i === 1 && this.currentCard === this.numCards - 1) ? 0 : 1
      }, 0)
      .to('.card h4', {
        y: (i) => (i === this.currentCard) ? 0 : 8,
        opacity: (i) => (i === this.currentCard) ? 1 : 0,
      }, 0);
  }
}

const carouselManager = new CarouselManager('.carousel', '.arrow-btn', '.card');