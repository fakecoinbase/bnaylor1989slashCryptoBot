const Price = require('../model/price')
const moment = require('moment')

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