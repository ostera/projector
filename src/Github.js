//@flow

import { log, pluck } from 'projector/utils'

import type { Stream } from 'most'
import { just, fromPromise } from 'most'

import type { Query } from 'projector/Types'
import _meta from 'projector/metadata'

import 'whatwg-fetch'

const GITHUB_TOKEN = _meta.Tokens.Github
const GITHUB_API = 'https://api.github.com/graphql'

const query = (ql: Query): Stream => {
  const _wrapped_query = `query { ${ql.split('\n').join('')} }`
  const request_data = {
    method: 'POST',
    headers: {
      'Authorization': `bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      query: _wrapped_query
    })
  }
  // Rather hackish way of lazily generating the Promise
  // since .just will only emit when someone starts observing
  return just(0)
    .concatMap( ()  => fromPromise(fetch(GITHUB_API, request_data)) )
    .concatMap( (r) => fromPromise(r.json()) )
    .map(pluck("data"))
    .tap(log.ns("Github Response:"))
}

export { query }
