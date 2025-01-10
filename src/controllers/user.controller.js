import cryptoCoin from '../models/cryptoCurrencyModel.js'; // Ensure the correct import for your model

// Controller for the /stats API
export const getStats = async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).send({ message: 'Please provide a coin name in the query parameter.' });
    }

    try {
        // Fetch the most recent record for the specified coin
        // console.log(`Fetching latest stats for coin: ${coin}`);
        
        const cryptoData = await cryptoCoin.findOne({
            coinName: coin.charAt(0).toUpperCase() + coin.slice(1), // Capitalize the first letter of the coin name
        }).sort({ createdAt: -1 });

        if (!cryptoData) {
            console.log(`No data found for coin: ${coin}`);
            return res.status(404).send({ message: `Coin not found: ${coin}` });
        }

        // Return the latest price, market cap, and 24-hour change
        // console.log(`Fetched stats for ${coin}:`, {
        //     coinPrice: cryptoData.coinPrice,
        //     marketCap: cryptoData.marketCap,
        //     '24hChange': cryptoData.changein24h,
        // });

        res.send({
            coinPrice: cryptoData.coinPrice,
            marketCap: cryptoData.marketCap,
            '24hChange': cryptoData.changein24h,
        });
    } catch (error) {
        console.error('Error fetching stats:', error.message);
        res.status(500).send({ message: 'Server error while fetching crypto stats' });
    }
};

// Controller for the /deviation API
export const getDeviation = async (req, res) => {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).send({ message: 'Please provide a coin name in the query parameter.' });
    }

    try {
        console.log(`Fetching price data to calculate deviation for coin: ${coin}`);

        // Fetch the last 100 records for the specified coin
        const records = await cryptoCoin.find({
            coinName: coin.charAt(0).toUpperCase() + coin.slice(1),
        })
            .sort({ createdAt: -1 })
            .limit(100);

        if (records.length === 0) {
            console.log(`No records found for coin: ${coin}`);
            return res.status(404).send({ message: `No records found for the coin: ${coin}` });
        }

        // Calculate standard deviation of prices
        const prices = records.map((record) => record.coinPrice);
        const mean = prices.reduce((acc, coinPrice) => acc + coinPrice, 0) / prices.length;
        const variance = prices.reduce((acc, coinPrice) => acc + Math.pow(coinPrice - mean, 2), 0) / prices.length;
        const deviation = Math.sqrt(variance);

        console.log(`Calculated deviation for ${coin}: ${deviation.toFixed(2)}`);
        
        res.send({ deviation: parseFloat(deviation.toFixed(2)) });
    } catch (error) {
        console.error('Error calculating deviation:', error.message);
        res.status(500).send({ message: 'Server error while calculating deviation' });
    }
};

