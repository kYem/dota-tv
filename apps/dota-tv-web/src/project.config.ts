const config = {
  apiHostname: import.meta.env.VITE_API_HOSTNAME || 'http://127.0.0.1:8008',
  wsEndpoint: import.meta.env.VITE_WS_ENDPOINT || 'ws://127.0.0.1:8008/ws',
}

export default config
