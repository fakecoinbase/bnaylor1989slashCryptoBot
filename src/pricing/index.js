const config = require('configuration');
const coinbase = require('coinbase');

const apiKey = config.get('COINBASE_API_KEY');
const apiSecret = config.get('COINBASE_API_SECRET');

var client = new coinbase.Client({'apiKey': apiKey,
                         'apiSecret': apiSecret,
                          strictSSL: false});

module.exports = {

    getBuyPrice: async () => new Promise((resolve, reject) => {
        const currencyPair = 'BTC-GBP'
        client.getBuyPrice({ currencyPair }, (err, obj) => {
            err ? reject(err) : resolve(obj)
        })
    })

}