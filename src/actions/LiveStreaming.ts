export type EventCallback = (msg: any, err?: Error) => any;

interface SubEvent {
  reference: string;
  parameters: any;
  serviceName: string;
  callback: EventCallback
}

interface SingleEvent {
  callback: EventCallback
}

export default class LiveStreaming {

  connectLock = false
  isOpen = false

  /** The number of milliseconds to delay before attempting to reconnect. */
  reconnectInterval = 1000
  /** The maximum number of milliseconds to delay a reconnection attempt. */
  maxReconnectInterval = 30000
  /** The rate of increase of the reconnect delay. Allows reconnect attempts to back off when problems persist. */
  reconnectDecay = 1.5
  /** The maximum time in milliseconds to wait for a connection to succeed before closing and retrying. */
  timeoutInterval = 4000
  /** The maximum number of reconnection attempts to make. Unlimited if null. */
  maxReconnectAttempts = null

  events: {[key: string]: SingleEvent } = {}
  subscriptions: {[key: string]: SubEvent} = {}
  private readonly connectionString: string;
  private socket?: WebSocket
  private timeout?: NodeJS.Timeout;

  constructor(wsUri: string) {
    this.connectionString = wsUri
    window.addEventListener('beforeunload', () => {
      if (this.socket) {
        this.socket.close()
      }
    })
  }

  sockedOpen = (onConnect?: Event) => {
    this.isOpen = true
  }

  onClose = (e: CloseEvent) => {
    console.log(`connection closed (${e.code})`)
    this.isOpen = false
    this.events = {}
    this.reconnect()
      .catch((error) => {
        this.events = {}
        console.log(error)
      })
  }

  reconnect = () => this.connect().then(() => {
    if (this.isOpen) {
      console.log('Reconnected')
      Object.values(this.subscriptions).forEach((sub) => {
        this.subscribe(sub.serviceName, sub.parameters, sub.reference, sub.callback)
      })
    }
  })

  onMessage = (e: MessageEvent) => {
    const msg = JSON.parse(e.data)

    if (this.subscriptions[msg.event]) {
      this.subscriptions[msg.event].callback(msg)
    } else if (this.events[msg.event]) {
      this.events[msg.event].callback(msg)
      delete this.events[msg.event]
    } else {
      console.log(`message received, not found handler: ${msg.event}`)
    }
  }

  emit(event: string, params: {}, reference: string) {
    this.connect().then(() => this.socket?.send(JSON.stringify({ event, params, reference })))
  }

  connect = () => new Promise((resolve, reject) => {
      // Already opened
    if (this.isOpen) {
      resolve()
      return
    }

    if (this.connectLock) {
      reject('Locked')
      return
    }

    this.connectLock = true
    if (!this.socket || this.socket.readyState !== WebSocket.CONNECTING || this.socket.readyState !== WebSocket.OPEN) {
      this.socket = new WebSocket(this.connectionString)
      this.socket.onopen = this.sockedOpen
      this.socket.onmessage = this.onMessage
      this.socket.onclose = this.onClose
    }

    const internal = setInterval(() => {
      if (this.isOpen) {
        clearInterval(internal)
        if (this.timeout) {
          clearTimeout(this.timeout)
        }
        this.connectLock = false
        resolve()
      }
    }, this.reconnectInterval)
    this.timeout = setTimeout(() => {
      clearInterval(internal)
      this.connectLock = false
      this.reconnect()
      reject(`Failed to reconnect within ${this.timeoutInterval}`)
    }, this.timeoutInterval)
  })

  /**
   * @param event
   * @param callback
   */
  once(event: string, callback: EventCallback) {
    this.events[event] = { callback }
  }

  /**
   * @param serviceName
   * @param parameters
   * @param reference
   * @param callback
   */
  subscribe(serviceName: string, parameters: {}, reference: string, callback: EventCallback) {
    this.connect().then(() => {
      this.socket?.send(JSON.stringify({
        event: serviceName,
        params: parameters,
        reference
      }))
      const event = `${serviceName}.${reference}`
      this.subscriptions[event] = { serviceName, parameters, reference, callback }
    }
   )
  }
}

