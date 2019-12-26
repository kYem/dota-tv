// @flow
import 'whatwg-fetch'
import BaseMapper from './baseMapper'
import config from '../project.config';

export const API_ERROR = 'API_ERROR'
export const LIVE_MATCH_SUBSCRIBE = 'LIVE_MATCH_SUBSCRIBE'
export const LIVE_MATCH_DETAILS = 'LIVE_MATCH_DETAILS'
export const LIVE_MATCHES = 'LIVE_MATCHES'
export const MATCH_FINISHED = 'MATCH_FINISHED'
export const STREAMS_LOADED = 'STREAMS_LOADED'


const DEFAULT_OPTIONS = {
  method: 'GET',
  credentials: 'same-origin',
  headers: new Headers({
    Accept: 'application/json',
  })
}

const mapper = new BaseMapper()

function makeRequest(url, options, dispatch, dispatchType) {
  fetch(url, options)
    .then((response) => {
      const type = response.status !== 200 ? API_ERROR : dispatchType
      return response.json().then(payload => dispatch({ type, payload }))
    })
    .catch(err => dispatch({ type: API_ERROR, payload: err }))
}

export function getLiveMatches(partner: number = 0) {
  return (dispatch: Function) => makeRequest(
    `${config.apiHostname}/live?partner=${partner}`,
    DEFAULT_OPTIONS,
    dispatch,
    LIVE_MATCHES
  )
}

const isMatchComplete = (json) => {
  const buildings = json.buildings
  if (!json.match || !buildings) {
    return true
  }

  return (buildings[17] && buildings[17].destroyed) || (buildings[35] && buildings[35].destroyed)
}

export function getLiveMatchDetails(serverSteamId: string) {
  return (dispatch: Function) =>
    fetch(`${config.apiHostname}/live/stats?server_steam_id=${serverSteamId}`, DEFAULT_OPTIONS)
      .then((response) => {
        response.json()
          .then((json) => {
            const type = isMatchComplete(json) ? MATCH_FINISHED : LIVE_MATCH_DETAILS
            // If we still have match, update details otherwise get new live matches
            return dispatch({ type, payload: json })
          })
      })
      .catch(err => dispatch({ type: API_ERROR, payload: err }))
}

export function getLiveStreams() {
  return (dispatch: Function) =>
    fetch(`${config.apiHostname}/streams`, DEFAULT_OPTIONS)
      .then(response => response.json())
      .then(payload => dispatch({ type: STREAMS_LOADED, payload }))
      .catch(err => dispatch({ type: API_ERROR, payload: err }))
}

export function subscribeLiveMatch(serverSteamId: string) {
  return (dispatch: Function) => {
    dispatch({ type: LIVE_MATCH_SUBSCRIBE, payload: serverSteamId })
    mapper.sub('dota_live_match', { server_steam_id: serverSteamId }, serverSteamId, (json, err) => {
      if (err) {
        return dispatch({ type: API_ERROR, payload: err })
      }

      const type = isMatchComplete(json.data) ? MATCH_FINISHED : LIVE_MATCH_DETAILS
      // If we still have match, update details otherwise get new live matches
      return dispatch({ type, payload: json.data })
    })
  }
}
