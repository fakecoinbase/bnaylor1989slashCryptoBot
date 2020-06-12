const pricing = require('pricing')
const database = require('database')
const util = require('util')

const setTimeoutPromise = util.promisify(setTimeout)
pricing.setCurrency('BTC-GBP')

const mainLoop = async () => {
  const buyPrice = await pricing.getBuyPrice();
  const sellPrice = await pricing.getSellPrice();
  const spotPrice = await pricing.getSpotPrice();

  console.log(`Buy: ${buyPrice.amount}`)
  console.log(`Sell: ${sellPrice.amount}`)
  console.log(`Spot: ${spotPrice.amount}`)

  const time = 5 * 1000
  await setTimeoutPromise(time)
  mainLoop()
}

module.exports = {


  start: async () => {
    
    await database.connect()
    mainLoop()

  }
}

