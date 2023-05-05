import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'vuetest',
  apiKey: process.env.API_KEY,
});