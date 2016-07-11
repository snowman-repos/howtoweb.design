require('whatwg-fetch');

class BuyMeADrink {

  constructor() {

    this.el = {
      button: document.querySelector('.js-buy-me-a-drink-button')
    }

    this.handler = StripeCheckout.configure({
      key: 'pk_live_102DFGBPzfPJw3yapvo2fSs6',
      image: '/images/darryl-snow.jpg',
      locale: 'auto',
      token: (token) => {
        fetch('/charge', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            stripeToken: token.id
          })
        }).then((response) => {
          if(response.status === 500)
            throw error;
          else
            return response;
        }).then((data) => {
          console.log(data);
        }).catch((err) => {
          console.error(err);
        });
      }
    });

    this.addEventListeners();

  }

  addEventListeners() {

    this.el.button.addEventListener('click', (e) => {

      e.preventDefault();

      this.handler.open({
        name: 'Darryl Snow',
        description: 'Buy me a drink',
        currency: 'usd',
        amount: 500
      });

    });

    window.addEventListener('popstate', (e) => {

      this.handler.close();

    });

  }

}

export default new BuyMeADrink