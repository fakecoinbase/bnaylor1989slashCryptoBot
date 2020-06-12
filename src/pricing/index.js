const config = require('configuration');
const coinbase = require('coinbase');

const apiKey = config.get('COINBASE_API_KEY');
const apiSecret = config.get('COINBASE_API_SECRET');

var client = new coinbase.Client({'apiKey': apiKey,
                         'apiSecret': apiSecret,
                          strictSSL: false});

module.exports = {

    currency: 'BTC-USD',
    getBuyPrice: async () => new Promise((resolve, reject) => {
        const currencyPair = this.currency
        client.getBuyPrice({ currencyPair }, (err, obj) => {
            err ? reject(err) : resolve(obj)
        })
    }),

    getSellPrice: async () => new Promise((resolve, reject) => {
        const currencyPair = this.currency
        client.getSellPrice({ currencyPair }, (err, obj) => {
            err ? reject(err) : resolve(obj)
        })
    })

}