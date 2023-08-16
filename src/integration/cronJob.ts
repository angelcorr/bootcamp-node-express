import cron from 'node-cron';
import axios from 'axios';
import constants from '../constants';
import env from '../config';
import { CurrencyType, Exchange } from '../models';
import { currencyService } from '../services/currency.services';
import { services } from '../services';

cron.schedule('00 06 * * *', async () => {
  const { data } = await axios.get(`${constants.API_URL}/latest?access_key=${env.ACCESS_KEY}`);
  if (!data) {
    throw new Error('Could no process the request. Try again.');
  }

  const usdCurrency = currencyService.getByCode(CurrencyType.USD);
  const eurCurrency = currencyService.getByCode(CurrencyType.EUR);
  const uyuCurrency = currencyService.getByCode(CurrencyType.UYU);

  const date = new Date(data.date);
  const eurExchange = new Exchange(eurCurrency.id, date, data.rates.UYU);
  const usdExchange = new Exchange(usdCurrency.id, date, data.rates.UYU / data.rates.USD);
  const uyuExchange = new Exchange(uyuCurrency.id, date, 1);

  services.exchangeService.add({ eurExchange, usdExchange, uyuExchange });
});
