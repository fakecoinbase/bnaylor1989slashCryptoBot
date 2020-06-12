const pricing = require('pricing');

// import pricing from '../pricing/index'
module.exports = {
  start: async () => {

    const buyPrice = await pricing.getBuyPrice();
    const sellPrice = await pricing.getSellPrice();
    
    console.log(`Buy price: ${buyPrice.data.amount}`)
    console.log(`Sell price: ${sellPrice.data.amount}`)
  
  }
}

