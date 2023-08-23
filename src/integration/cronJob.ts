import cron from 'node-cron';
import axios from 'axios';
import constants from '../constants';
import env from '../config';
import { CurrencyType, Exchange } from '../entity';
import { currencyService } from '../services/currency.services';
import { services } from '../services';
import { AppDataSource } from '../../database/dataSource';

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
  const eurExchange = AppDataSource.getRepository(Exchange).create({
    currencyId: eurCurrency.id,
    date: date,
    rate: data.rates.UYU,
  });
  const usdExchange = AppDataSource.getRepository(Exchange).create({
    currencyId: usdCurrency.id,
    date: date,
    rate: usdRate,
  });
  const uyuExchange = AppDataSource.getRepository(Exchange).create({
    currencyId: uyuCurrency.id,
    date: date,
    rate: 1,
  });

  services.exchangeService.add({ eurExchange, usdExchange, uyuExchange });
});
