const mongoose = require('mongoose')
const { Schema }  = require('mongoose')

const PriceSchema = new Schema({
    base: {
        type: String,
        enum: ['BTC'],
        required: true
    },
    currency: {
        type: String,
        enum: ['USD', 'GBP', 'EUR'],
        required: true
    },
    buy: {
        type: Number,
        required: true
    },
    sell: {
        type: Number,
        required: true
    },
    spot: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        default: Date.now,
        index: true,
        required: true
    }
})

PriceSchema.statics.getMean = async function ({start, end = Date() } = {} ){
    const prices= await Price.find({time: {$gte: start, $lte: end}})
    const count = prices.length
    const average = prices.reduce((sum, price) => sum + price.spot, 0) / count
    return average
}

PriceSchema.statics.getMax = async function ({start, end = Date() } = {} ){
    const prices= await Price.find({time: {$gte: start, $lte: end}})
    const max = prices.reduce((max, { spot }) => Math.max(max, spot), 0)
    return max
}

PriceSchema.statics.getMin = async function ({start, end = Date() } = {} ){
    const prices= await Price.find({time: {$gte: start, $lte: end}})
    const min = prices.reduce((min, { spot }) => Math.min(min, spot), Infinity)
    return min
}

PriceSchema.statics.getMedian = async function({start, end = Date() } = {} ) {
    const prices = await Price.find({time: {$gte: start, $lte: end}})
    const spots = prices.map(price => price.spot).sort((a, b) => a - b)
    const length = spots.length
    const half = Math.floor(length / 2)
    // if odd number of elements, spots.length % 2 = 1, return the middle element
    if (spots.length % 2) {
        return spots[half]
    }
    // if even number of elements, return the sum of the middle 2 elements divided by 2.
    return (spots[half-1] + spots[half]) / 2
}

const Price = mongoose.model('Price', PriceSchema)

module.exports = Price