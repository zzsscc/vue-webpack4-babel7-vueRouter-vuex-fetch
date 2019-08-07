const checkHttpStatus = async resp => {
  /** 先检查响应的状态码, 与nodejs服务器约定好：
   * 200: 正常响应包括业务上执行出现正常错误和业务成功执行
   * 400: 客户端传参错误或者客户端传参缺少参数
   * 401: 客户端没有经过认证就访问页面
   * 429: 客户端请求太过频繁
   * 503: 服务器真的发生未知的错误，需要提示用户(因为运营商可能劫持500的响应错误，所以这里不使用500的错误在移动端)
   */
  const status = resp.status
  const canPassThroughStatus = [200, 400, 503]
  if (canPassThroughStatus.indexOf(status) !== -1) {
    return resp
  }
  /** 状态401对应statusText是Unauthorized
   *  状态429对应的statusText是Too many request
   */
  const respText = await resp.text()
  const error = new Error(resp.statusText)
  error.specResp = respText
  throw error
}

const checkRespResult = async resp => {
  /**
   * 因为我们保证到这个步骤的时候结果肯定是可以json化的
   */
  const respObj = await resp.json()
  /**
   * 响应的JSON格式是： {
   *  status: 0/1,
   *  code:  0 | 100 | 200 | ....,
   *  msg: 报错的信息
   *  data: 业务执行正常返回的数据
   * }
   * code的含义：
   * 0 标识成功
   * 100 标识java业务逻辑正常报错
   * 200 标识nodejs已知的业务错误
   * 300 标识java发生无法解析的错误(包括超时错误)
   * 400 标识nodejs未知的异常错误
   */
  // 所以我们先检查status是否是0，即是否是失败
  const infoRecordCode = [100, 200]
  if (!respObj.status && infoRecordCode.indexOf(respObj.code) !== -1) {
    const error = new Error(resp.statusText)
    throw error
  }
  if (respObj.code === 400) {
    const error = new Error(resp.statusText)
    throw error
  }
  if (!respObj.status) {
    const error = new Error(resp.statusText)
    throw error
  }

  return respObj.data
}

const catchHttpError = err => {
  console.log(err);
  // 如果是捕获到这个错误，说明用户请求发生异常
  if (err.message === 'Failed to fetch') {
    const error = new Error('您的网络异常，请确认网络连接情况')
    throw error
  }
  throw new Error(err)
}

export const fetchHandle = async (fetchFun, params) => {
  try {
    // 发送请求
    const resp = await (params ? fetchFun(params) : fetchFun())
    // 先校验状态
    const res = await checkHttpStatus(resp)

    // 再校验请求是否正常
    return await checkRespResult(res)
  } catch (err) {
    return catchHttpError(err)
  }
}
