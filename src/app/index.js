const pricing = require('pricing');

// import pricing from '../pricing/index'
module.exports = {
  start: async () => {

    const price = await pricing.getBuyPrice();
    console.log(price)
  
  }
}

