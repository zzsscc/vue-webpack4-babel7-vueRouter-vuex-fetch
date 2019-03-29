import fetch from 'isomorphic-fetch'

/**
 * inner function
 */
const fetchJSON = (url, params) => {
  // eslint-disable-next-line no-param-reassign
  params = {
    ...params,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'X-CSRF-Token': global.__data && global.__data.csrfToken,
      ...params.headers,
    },
  }
  // eslint-disable-next-line no-param-reassign
  url = `/api${url}`
  return fetch(url, params)
}

const buildURL = (url, data) => {
  return url.split('/').map(item => {
    if (item.indexOf('$') > -1) {
      return data[item.split('$')[1]]
    }
    return item
  }).join('/')
}
/* eslint-disable */
const serialize = (obj, prefix) => {
  let str = [], p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      let k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
      str.push((v !== null && typeof v === 'object') ?
        serialize(v, k) :
        encodeURIComponent(k) + '=' + encodeURIComponent(v));
    }
  }
  return str.join('&');
}
/* eslint-enable */

const buildParams = (obj, useJson = true) => {
  if (!obj) {
    return ''
  }
  if (useJson) {
    return JSON.stringify(obj)
  }
  return serialize(obj)
}


/**
 * export function
 */
// eslint-disable-next-line arrow-parens
export const fetchJSONByPost = url => query => {
  const params = {
    method: 'POST',
    body: buildParams(query),
  }
  const buildUrl = buildURL(url, query)
  return fetchJSON(buildUrl, params)
}

export const fetchJSONByGet = url => query => {
  const params = {
    method: 'GET',
  }
  let getQuery = '?'
  if (query) {
    // eslint-disable-next-line
    for (name in query) {
      getQuery = `${getQuery}${name}=${query[name]}&`
    }
  }
  const buildUrl = buildURL(url, query)
  const getUrl = buildUrl + (query ? getQuery.substring(0, getQuery.length - 1) : '')
  return fetchJSON(getUrl, params)
}

export const fetchJSONByPut = url => data => {
  const params = {
    method: 'PUT',
    body: buildParams(data),
  }
  const buildUrl = buildURL(url, data)
  return fetchJSON(buildUrl, params)
}

export const fetchJSONByDelete = url => data => {
  const params = {
    method: 'DELETE',
    body: buildParams(data),
  }
  const buildUrl = buildURL(url, data)
  return fetchJSON(buildUrl, params)
}

export const fetchJSONStringByPost = url => query => {
  const params = {
    method: 'POST',
    body: query,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8;',
    },
  }
  return fetchJSON(url, params)
}


export const getInitialPropsProvider = (reducer) => async function({req, query, asPath}) {
    // 服务端
    if(!!req) {
      return typeof reducer === 'function'? reducer(query): query 
    }
    // 客户端pop
    // TODO: isPOP?
    // if() {

    // }

    // 客户端push
    let getQuery = '?'
    if (query) {
      // eslint-disable-next-line
      for (name in query) {
        getQuery = `${getQuery}${name}=${query[name]}&`
      }
    }
    try {
      // const buildUrl = buildURL(asPath, query)
      // const getUrl = buildUrl + (query ? getQuery.substring(0, getQuery.length - 1) : '')
      const res = await fetch(asPath, {
        method: 'GET', 
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json'
        },
      })
      const result = await res.json()
      return typeof reducer === 'function'? reducer(Object.assign(query, result)): Object.assign(query, result) 
    } catch (error) {
      console.warn(error)
      return typeof reducer === 'function'? reducer(Object.assign({}, query)): Object.assign({}, query)
    }
}