import fetchRequest from '@/apis/request'
import { Response } from 'node-fetch'

const WeChatUrls: { [key: string]: string } = {
  DOMAIN: 'https://api.weixin.qq.com',
  getAccessToken: '/sns/oauth2/access_token',
  refreshAccessToken: '',
  getUserInfo: '/sns/userinfo',
  verifyMiniProgramCode: '/sns/jscode2session',
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

  async getUserInfo(openId: string, accessToken: string): Promise<any> {
    const res: Response = await this.request(WeChatUrls.getUserInfo, {
      queries: {
        openid: openId,
        lang: 'zh_CN',
        access_token: accessToken,
      },
    })
    return res.json()
  }

  async miniProgramVerifyCode({
    code,
    appId,
    appSecret,
  }: {
    code: string
    appId?: string
    appSecret?: string
  }): Promise<any> {
    const res: Response = await this.request(WeChatUrls.verifyMiniProgramCode, {
      queries: {
        appid: appId,
        secret: appSecret,
        js_code: code,
        grant_type: 'authorization_code',
      },
    })
    return res.json()
  }

  // async refreshAccessToken({ refreshToken, accessToken }) {
  //   const res = await request(WeChatUrls.getUserInfo, {
  //     queries: {
  //       openid: openId,
  //       lang: 'zh_CN',
  //       access_token: accessToken,
  //     },
  //   })
  //   return res.json()
  // }

  /* eslint-enable class-methods-use-this */
}
