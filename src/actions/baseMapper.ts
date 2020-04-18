import LiveStreaming from './LiveStreaming'
import config from '../project.config';
import dayjs from 'dayjs';

export default class BaseMapper {
  private socket: LiveStreaming;

  constructor(socket: LiveStreaming) {
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
  getRequest(serviceName: string, parameters: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const reference = BaseMapper.generate()
      this.socket.emit(serviceName, parameters, reference)
      this.socket.once(`${serviceName}.${reference}`, (response: any) => {
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
  sub(serviceName: string, parameters: any, staticReference: string, callback: Function) {
    this.socket.subscribe(serviceName, parameters, staticReference, callback)
  }

  static generate() {
    return `${dayjs().format('YYYYMMDD-HHmmss')}-${Math.round(Math.random() * 10000000)}`
  }

  getRequestData(serviceName: string, parameters: any) {
    return new Promise((resolve, reject) => {
      const reference = BaseMapper.generate()
      const data = {
        parameters,
        reference
      }

      this.socket.emit(serviceName, data)
      this.socket.once(`${serviceName}.${reference}`, (response: any) => {
        if (response && response.success) {
          resolve(response.data)
        }
        reject(response)
      })
    })
  }
}
