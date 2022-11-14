// use strict mode to execute the js 
'use strict';

// create class Carousel
class Carousel {
  // Create a constructor / object
  constructor(el) {
    // this refer to the object el and assign it to (el) to access it easy
    this.el = el;

    // the controllers for the slider
    this.carouselOptions = ['previous', 'next'];

    // the slider data in our case the images
    this.carouselData = [
      {
        'id': '1',
        'src': 'game-1.png',
      },
      {
        'id': '2',
        'src': 'game-2.jpg',
      },
      {
        'id': '3',
        'src': 'game-3.png',
      },
      {
        'id': '4',
        'src': 'game-4.jpg',
      },
      {
        'id': '5',
        'src': 'game-5.jpg',
      },
      
    ];
    
    // add the above data to the view 
    this.carouselInView = [1, 2, 3, 4, 5];
   
    // create the container
    this.carouselContainer;
    this.carouselPlayState;
  }

  mounted() {
    // setup the  
    this.setupCarousel();
  }


  setupCarousel() {
    // create element for the container and controllers
    const container = document.createElement('div');
    const controls = document.createElement('div');

    // add the container and the controllers
    this.el.append(container, controls);
    container.className = 'carousel-container';
    controls.className = 'carousel-controls';

    // loop through the data and append them 
    this.carouselData.forEach((item, index) => {
      const carouselItem = item.src ? document.createElement('img') : document.createElement('div');

      container.append(carouselItem);
      

      carouselItem.className = `carousel-item carousel-item-${index + 1}`;
      carouselItem.src = item.src;
      carouselItem.setAttribute('loading', 'lazy');

      carouselItem.setAttribute('data-index', `${index + 1}`);
    });

    this.carouselOptions.forEach((option) => {
      const btn = document.createElement('button');
      const axSpan = document.createElement('span');

      axSpan.innerText = option;
      axSpan.className = 'ax-hidden';
      btn.append(axSpan);

      btn.className = `carousel-control carousel-control-${option}`;
      btn.setAttribute('data-name', option);

      controls.append(btn);
    });

    this.setControls([...controls.children]);
    this.carouselContainer = container;
  }

  setControls(controls) {
    controls.forEach(control => {
      control.onclick = (event) => {
        event.preventDefault();

        this.controlManager(control.dataset.name);
      };
    });
  }

  controlManager(control) {
    if (control === 'previous') return this.previous();
    if (control === 'next') return this.next();
    return;
  }

  previous() {
    this.carouselData.unshift(this.carouselData.pop());

    this.carouselInView.push(this.carouselInView.shift());

    this.carouselInView.forEach((item, index) => {
      this.carouselContainer.children[index].className = `carousel-item carousel-item-${item}`;
    });

    this.carouselData.slice(0, 5).forEach((data, index) => {
      document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
    });
  }

  next() {
    this.carouselData.push(this.carouselData.shift());

    this.carouselInView.unshift(this.carouselInView.pop());

    this.carouselInView.forEach((item, index) => {
      this.carouselContainer.children[index].className = `carousel-item carousel-item-${item}`;
    });

    this.carouselData.slice(0, 5).forEach((data, index) => {
      document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
    });
  }

}

const el = document.querySelector('.carousel');
const exampleCarousel = new Carousel(el);
exampleCarousel.mounted();
