const pricing = require('pricing')
const database = require('database')
const util = require('util')
const Price = require('../model/price')
const Trading = require('../trading')

const setTimeoutPromise = util.promisify(setTimeout)

const mainLoop = async () => {
  const time = 10 * 1000
  try {
    const prices = await pricing.getPrices();
    const price = await Price.create(prices)
    console.log("Price obtained")
    await Trading.onPrices(price)
  } catch (err) {
    console.log(err)
  }
}

module.exports = {

  start: async () => {
    
    await database.connect()
    setInterval(mainLoop, 10 * 1000)
    mainLoop()
  }
}


