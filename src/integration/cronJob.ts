import cron from 'node-cron';
import axios from 'axios';
import constants from '../constants';
import env from '../config';
import { CurrencyType } from '../entity';
import { currencyService } from '../services/currency.services';
import { services } from '../services';

cron.schedule('00 8 * * *', async () => {
  const { data } = await axios.get(`${constants.API_URL}/latest?access_key=${env.ACCESS_KEY}`);
  console.log('data: ', data); // To test if the data exists
  if (!data.success || Object.keys(data).length === 0) {
    console.log('data: ', data); // This console.log is to reflect the error on the console.
    throw new Error('Could not process the request. Try again.');
  }

  const usdCurrency = await currencyService.getOne(CurrencyType.USD);
  const eurCurrency = await currencyService.getOne(CurrencyType.EUR);
  const uyuCurrency = await currencyService.getOne(CurrencyType.UYU);

  const usdRate = data.rates.UYU / data.rates.USD;

  const date = new Date(data.date);
  const eurExchange = {
    currencyId: eurCurrency,
    date: date,
    rate: data.rates.UYU,
  };
  const usdExchange = {
    currencyId: usdCurrency,
    date: date,
    rate: usdRate,
  };
  const uyuExchange = {
    currencyId: uyuCurrency,
    date: date,
    rate: 1,
  };

  await services.exchangeService.add(eurExchange);
  await services.exchangeService.add(usdExchange);
  await services.exchangeService.add(uyuExchange);
});
