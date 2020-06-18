const Price = require('../model/price')
const moment = require('moment')
const BB = require('technicalindicators').BollingerBands

exports.onPrices = async function (price) {

    const start = moment().subtract(1, 'days').toDate()
    const dayMean = await Price.getMean({ start: start, end: Date() })
    const dayMax = await Price.getMax({start: start})
    const dayMin = await Price.getMin({start: start})
    const dayMedian = await Price.getMedian({start: start})
    
    console.log(`Daily Min Price:     ${dayMin}`)
    console.log(`Daily Average Price: ${dayMean}`)
    console.log(`Daily Max Price:     ${dayMax}`)
    console.log(`Daily Median Price:  ${dayMedian}`);
    console.log(`Current Price:       ${price.spot}`);

}

exports.getBollinger = async function ({start, period, end = Date()} = {}) {
    const prices = await Price.getRange({start, end})

    const total = prices.length - period
    const input = {
        period : total,
        values : prices,
        stdDev : 2
    }

    const outcome = BB.calculate(input)
    return outcome
    
}

exports.showAvailable = function({bollinger, prices} = {}) {
    const midRange = bollinger[0]['middle']
    const low = bollinger[0]['lower']
    const midLow = (midRange - low) / 2 + low
    
    const availables = prices.filter(price => price < midRange)

    console.log(prices);
    console.log("---------------------------");
    
    console.log(bollinger[0]);
    
    console.log(`Mid      ${midRange}`);
    console.log(`Mid-Low: ${midLow}`);
    console.log(`Low:     ${low}`);

    console.log(`${availables.length}/${prices.length}`)

}