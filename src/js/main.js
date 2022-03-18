import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

class Animation {

  constructor() {
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
        container: document.querySelector('.usecases')
      }
    }
    this.timelines = {
      hero: null,
      usecases: null,
      cta: null
    };
    this.init();
    console.log(this.elements.usecases.container);
  }

  init() {
    console.log('init');
    this.playHeroTimeline();
    this.playUsecasesTimeline();
  }
  
  playHeroTimeline() {
    this.timelines.hero = gsap.timeline({ ease: 'expo'});
    this.timelines.hero.from(this.elements.hero.logo.points.container, { opacity: 0, rotate: 900, ease: 'expo', duration: 2 })
    this.timelines.hero.from(this.elements.hero.logo.text, { y: 16, duration: 0.5, opacity: 0 }, '-=1' );
    this.timelines.hero.from(this.elements.hero.title, { opacity: 0, duration: 1 }, '-=0.25' );
    this.timelines.hero.from(this.elements.hero.text, { opacity: 0, y: -16,  duration: 0.5 }, '-=0.5' );
    this.timelines.hero.from(this.elements.hero.buttons, { opacity: 0, y: 32,  duration: 0.5, stagger: 0.25 }, '-=0.5' );
    this.timelines.hero.from(this.elements.hero.personas, { opacity: 0, scale: 0, duration: 1, stagger: 0.05 } )
    this.timelines.hero.from(this.elements.hero.navigator.line, { height: 0 })
    this.timelines.hero.from(this.elements.hero.navigator.index, { scale: 0 })
    this.timelines.hero.from(this.elements.hero.navigator.index, { color: 'transparent', duration: 0.25 })
  };

  playUsecasesTimeline() {
    this.timelines.usecases = gsap.timeline({ 
      scrollTrigger: {
        trigger: '.usecases__images', 
        start: 'bottom 80%',
        end: 'bottom 20%',
        markers: true 
      }
    });
    this.timelines.usecases.from('.usecases__images', { scale: 0, opacity: 0 });
  }

}

new Animation();