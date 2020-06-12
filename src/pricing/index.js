const config = require('configuration');
const coinbase = require('coinbase');

const apiKey = config.get('COINBASE_API_KEY');
const apiSecret = config.get('COINBASE_API_SECRET');

var client = new coinbase.Client({'apiKey': apiKey,
                         'apiSecret': apiSecret,
                          strictSSL: false});

let currency = 'BTC-GBP'

module.exports = {

    setCurrency: curr => {
        currency; curr
    },
    getSpotPrice: async () => new Promise((resolve, reject) => {
        const currencyPair = currency
        client.getSpotPrice({ currencyPair }, (err, obj) => {
            err ? reject(err) : resolve(obj.data)
        })
    }),
    getBuyPrice: async () => new Promise((resolve, reject) => {
        const currencyPair = currency
        client.getBuyPrice({ currencyPair }, (err, obj) => {
            err ? reject(err) : resolve(obj.data)
        })
    }),

    getSellPrice: async () => new Promise((resolve, reject) => {
        const currencyPair = currency
        client.getSellPrice({ currencyPair }, (err, obj) => {
            err ? reject(err) : resolve(obj.data)
        })
    })

}