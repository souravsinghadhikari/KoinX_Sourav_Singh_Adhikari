// import required modules
import cron from 'node-cron';
import axios from 'axios';
import cryptoCoin from '../models/cryptoCurrencyModel.js'; // Importing Mongoose model

// Function to fetch and save crypto data

const fetchCryptoData = async () => {
  try {
    console.log('jelo');
    // api call
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price',
      {
        params: {
          ids: 'bitcoin,matic-network,ethereum',
          vs_currencies: 'usd',
          include_market_cap: true,
          include_24hr_change: true,
        },
      }
    );

    const { bitcoin, 'matic-network': matic, ethereum } = response.data;

    const cryptoData = [
      {
        coinName: 'Bitcoin',
        coinPrice: bitcoin.usd,
        marketCap: bitcoin.usd_market_cap,
        changein24h: bitcoin.usd_24h_change,
      },
      {
        coinName: 'Matic-network',
        coinPrice: matic.usd,
        marketCap: matic.usd_market_cap,
        changein24h: matic.usd_24h_change,
      },
      {
        coinName: 'Ethereum',
        coinPrice: ethereum.usd,
        marketCap: ethereum.usd_market_cap,
        changein24h: ethereum.usd_24h_change,
      },
    ];

    console.log('Fetched Crypto Data:', cryptoData);

    // Save data to the database
    await cryptoCoin.insertMany(cryptoData, { ordered: false });
    console.log('Crypto info updated successfully in the database.');
  } catch (error) {
    console.error('Error fetching or saving crypto data:', error.message);
  }
};

// await fetchCryptoData(); // always fetch data once the server is opened then update by 2 hours
// used for every min = '* * * * *'  updation in 2h = '0 */2 * * *'

// Function to schedule fetching of crypto data every 2 hours
const updateCryptoInfo = () => {
  cron.schedule('0 */2 * * *', async () => {
    // console.log('HEllo');
    console.log('Running scheduled task to update crypto info...');
    await fetchCryptoData(); // Call the reusable function
  });
};

export default updateCryptoInfo;
