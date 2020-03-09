import 'whatwg-fetch'
import BaseMapper from './baseMapper'
import config from '../project.config';

export const API_ERROR = 'API_ERROR'

const DEFAULT_OPTIONS = {
  method: 'GET',
  credentials: 'same-origin',
  headers: new Headers({
    Accept: 'application/json',
  })
}

export const mapper = new BaseMapper()

export async function getLiveMatches(partner = 0) {
  const response = await fetch(`${config.apiHostname}/live?partner=${partner}`, DEFAULT_OPTIONS)
  return response.json()
}

export async function getLiveMatchDetails(serverSteamId) {
  const response = await fetch(`${config.apiHostname}/live/stats?server_steam_id=${serverSteamId}`, DEFAULT_OPTIONS)
  return response.json()
}

export async function getLiveStreams() {
  const response = await fetch(`${config.apiHostname}/streams`, DEFAULT_OPTIONS)
  return response.json()
}

