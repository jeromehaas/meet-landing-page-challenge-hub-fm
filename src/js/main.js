import { gsap } from 'gsap';
import Cookies from 'js-cookie';
import moment from 'moment';

class Animation {

  constructor() {
    this.timeline = null;
		this.elements = null;
		this.willPlay = true;
    this.init();
  };

	init() {
		this.checkAnimationCookie();
		window.addEventListener('load', () => {
			if (this.willPlay) {
				this.defineElements();
				this.playTimeline();
			}; 
		});
  };

	defineElements() {
     this.elements = {
			hero: {
			 logo: {
				 text: document.querySelector('.logo__text'),
				 points: {
					 container: document.querySelector('.logo__points-container'),
					 blue: document.querySelector('.logo__point--blue'),
					 violet: document.querySelector('.logo__point--violet'),
          }
        },
        title: document.querySelector('.intro__title'),
        text: document.querySelector('.intro__text'),
        buttons: document.querySelectorAll('.intro__button'),
        personas: document.querySelectorAll('.personas__image'),
        navigator: {
					line: document.querySelector('.hero .navigator__line'),
          index: document.querySelector('.hero .navigator__index'),
        }
      },
      usecases: {
				container: document.querySelector('.usecases'),
				images: document.querySelectorAll('.usecases__image'),
				pretitle: document.querySelector('.usecases__pretitle'),
				title: document.querySelector('.usecases__title'),
				text: document.querySelector('.usecases__text'),
				navigator: {
					line: document.querySelector('.usecases .navigator__line'),
          index: document.querySelector('.usecases .navigator__index'),
        }
      },
			cta: {
				container: document.querySelector('.cta'),
				title: document.querySelector('.cta__title'),
				text: document.querySelector('.cta__text'),
				button: document.querySelector('.cta__button')
			}
    };
	};
  
  playTimeline() {
    this.timeline = gsap.timeline({ 
			ease: 'expo',
			onComplete: () => this.playUsecasesTimeline()
		});
    this.timeline.from(this.elements.hero.logo.points.container, { autoAlpha: 0, rotate: 900, ease: 'expo', duration: 2, delay: 0.3 })
    this.timeline.from(this.elements.hero.logo.text, { y: 16, duration: 0.5, autoAlpha: 0 }, '-=1' );
    this.timeline.from(this.elements.hero.title, { autoAlpha: 0, duration: 1 }, '-=0.25' );
    this.timeline.from(this.elements.hero.text, { autoAlpha: 0, y: -16,  duration: 0.5 }, '-=0.5' );
    this.timeline.from(this.elements.hero.buttons, { autoAlpha: 0, y: 32,  duration: 0.5, stagger: 0.25 }, '-=0.5' );
    this.timeline.from(this.elements.hero.personas, { autoAlpha: 0, scale: 0, duration: 0.75, stagger: 0.025 } )
    this.timeline.from(this.elements.hero.navigator.line, { height: 0, duration: 0.25 })
    this.timeline.from(this.elements.hero.navigator.index, { scale: 0, duration: 0.25 })
    this.timeline.from(this.elements.hero.navigator.index, { autoAlpha: 0, duration: 0.25 })
		this.timeline.from(this.elements.usecases.images, { autoAlpha: 0, stagger: 0.25 });
		this.timeline.from(this.elements.usecases.title, { autoAlpha: 0, duration: 0.25 });
		this.timeline.from(this.elements.usecases.pretitle, { autoAlpha: 0, duration: 0.25, y: 16 });
		this.timeline.from(this.elements.usecases.text, { autoAlpha: 0, duration: 0.25, y: -16 }, '-=0.25');
    this.timeline.from(this.elements.usecases.navigator.line, { height: 0, duration: 0.25 })
    this.timeline.from(this.elements.usecases.navigator.index, { scale: 0, duration: 0.25 })
    this.timeline.from(this.elements.usecases.navigator.index, { autoAlpha: 0, duration: 0.25 })
		this.timeline.from(this.elements.cta.container, { autoAlpha: 0, duration: 0.5 });
		this.timeline.from(this.elements.cta.title, { autoAlpha: 0, y: 16, duration: 0.25 });
		this.timeline.from(this.elements.cta.text, { autoAlpha: 0, y: 16, duration: 0.25 });
		this.timeline.from(this.elements.cta.button, { autoAlpha: 0, y: 16, duration: 0.25 });
  };
	
	checkAnimationCookie() {
		const animationCookie = Cookies.get('last-animation-render');
		if (!animationCookie) {
			this.willPlay = true;
			const today = moment().format();
			Cookies.set('last-animation-render', today, { expires: 1 });
		} else {
			this.willPlay = false;
		};
	};

}

new Animation();