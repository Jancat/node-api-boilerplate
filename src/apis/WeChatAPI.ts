import fetchRequest from '@/apis/request'
import { Response } from 'node-fetch'

const WeChatUrls: { [key: string]: string } = {
  DOMAIN: 'https://api.weixin.qq.com',
  getAccessToken: '/sns/oauth2/access_token',
}

let apiInstance: null | WeChatAPI = null
export default class WeChatAPI {
  baseURL: string
  constructor(public timeout: number = 5000) {
    this.baseURL = WeChatUrls.DOMAIN
    this.timeout = timeout

    if (!apiInstance) {
      apiInstance = this
    }
    return apiInstance
  }

  request(path: string, options?: object): Promise<Response> {
    return fetchRequest(this.baseURL, path, this.timeout, options)
  }

  async getAccessToken({
    appId,
    secret,
    code,
  }: {
    appId?: string
    secret?: string
    code: string
  }): Promise<any> {
    const res: Response = await this.request(WeChatUrls.getAccessToken, {
      queries: {
        appid: appId,
        secret,
        code,
        grant_type: 'authorization_code',
      },
    })
    return res.json()
  }
}
