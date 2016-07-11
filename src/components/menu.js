class Popup {

  constructor(el) {

    this.el = {
      closeButton: el.querySelector('.js-popup__close-button'),
      curtain: el.querySelector('.js-popup__curtain'),
      popup: el
    }

    this.addEventListeners();

  }

  addEventListeners() {

    this.el.closeButton.addEventListener('click', (e) => {

      e.preventDefault();

      this.closePopup();

    });

    this.el.curtain.addEventListener('click', () => {

      this.closePopup();

    });

    document.addEventListener('keyup', (e) => {

      this.handleKeypress(e);

    }, false);

  }

  closePopup() {

    this.el.popup.classList.remove('is-shown');

  }

  handleKeypress(e) {

    e = e || window.event;

    let isEscape = false;

    if ('key' in e) {
      isEscape = e.key == 'Escape';
    } else {
      isEscape = e.keyCode == 27;
    }

    if (isEscape) {
      this.closePopup();
    }

    if(e.ctrlKey && (e.keyCode == 191)) {

      this.openPopup();

    }

  }

  openPopup() {

    this.el.popup.classList.add('is-shown');

  }

}

class Popups {

  constructor() {

    const popupComponents = document.querySelectorAll('.js-popup');

    this.openButtons = document.querySelectorAll('.js-popup__open-button')

    this.popups = [];

    for(let i = 0; i < popupComponents.length; i++) {

      this.popups.push(new Popup(popupComponents[i]));

    }

    this.addEventListeners();

  }

  addEventListeners() {

    for(let i = 0; i < this.openButtons.length; i++) {

      this.openButtons[i].addEventListener('click', (e) => {

        e.preventDefault();

        this.popups[e.target.dataset.popup].openPopup();

      })

    }

  }

}

export default new Popups