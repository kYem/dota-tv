import LiveStreaming from './LiveStreaming'
import * as config from '../../project.config'

const moment = require('moment')

export default class BaseMapper {
  constructor(socket) {
    this.socket = socket || new LiveStreaming(config.wsEndpoint)
  }

    /**
     * Get service promise.
     * @param serviceName
     * @param parameters
     * @return {Promise} a promise that may be resolved
     * with the given resolve and reject functions,
     * or rejected by a thrown exception in resolver
     */
  getRequest(serviceName, parameters) {
    return new Promise((resolve, reject) => {
      const reference = BaseMapper.generate()
      this.socket.emit(serviceName, parameters, reference)
      this.socket.once(`${serviceName}.${reference}`, (response) => {
        if (response && response.success) {
          resolve(response)
        } else {
          reject(response)
        }
      })
    })
  }

  /**
   * Get service promise.
   * @param serviceName
   * @param parameters
   * @param staticReference
   * @param callback
   * with the given resolve and reject functions,
   * or rejected by a thrown exception in resolver
   */
  sub(serviceName, parameters, staticReference, callback) {
    this.socket.subscribe(serviceName, parameters, staticReference, callback)
  }

  static generate() {
    return `${moment().format('YYYYMMDD-HHmmss')}-${Math.round(Math.random() * 10000000)}`
  }

  getRequestData(serviceName, parameters) {
    return new Promise((resolve, reject) => {
      const reference = BaseMapper.generate()
      const data = {
        parameters,
        reference
      }

      this.socket.emit(serviceName, data)
      this.socket.once(`${serviceName}.${reference}`, (response) => {
        if (response && response.success) {
          resolve(response.data)
        }
        reject(response)
      })
    })
  }
}
