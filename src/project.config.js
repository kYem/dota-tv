export default {
  apiHostname: process.env.REACT_APP_API_HOSTNAME || 'http://127.0.0.1:8008',
  dotaImageCdn: 'https://api.opendota.com/apps/dota2/images',
  wsEndpoint: process.env.REACT_APP_WS_ENDPOINT || 'ws://127.0.0.1:8008/ws',
  isProd: false,
}
