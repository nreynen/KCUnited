import axios from 'axios';

const KEY: string = "nwuziog6JX0J9K";

let api_url: string = 'https://api.kcunited.be';

if (!!(window.location.host.indexOf('localhost') > -1 || window.location.host.indexOf('staging.') > -1)) api_url = 'https://api-staging.kcunited.be';

// api_url = 'http://localhost:3051';

const instance = axios.create({
  baseURL: api_url,
  timeout: 60000,
  headers: {
    'X-KANGA-Key': KEY
  }
});

export default instance;
