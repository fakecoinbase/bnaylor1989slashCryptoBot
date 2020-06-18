const pricing = require('pricing')
const database = require('database')
const util = require('util')
const Price = require('../model/price')
const Trading = require('../trading')
const moment = require('moment')

const setTimeoutPromise = util.promisify(setTimeout)

const mainLoop = async () => {
  const time = 10 * 1000
  try {
    const prices = await pricing.getPrices();
    const price = await Price.create(prices)

    console.log("----------");
    console.log(`Price obtained - ${Date()}`)
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

    const start = moment().subtract(1.5, 'days').toDate()
    const end = moment().subtract(1, 'days').toDate()
    const next6 = moment().subtract(1, 'days').add(6, 'hours').toDate()
    const period = 1
  
    const bollinger = await Trading.getBollinger({start, period, end})
    const prices = await Price.getRange({start: start, end: end})
    
    Trading.showAvailable({bollinger, prices})
    
  }
}


