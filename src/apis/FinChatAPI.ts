import { Response } from 'node-fetch'
import Config from '@/config'
import fetchRequest from '@/apis/request'

const FinChatUrls: { [key: string]: string } = {
  DOMAIN: Config.get('APP_DOMAIN')!,
  login: '/api/v1/registry/login',
}

let apiInstance: null | FinChatAPI = null
export default class FinChatAPI {
  private baseURL: string
  constructor(public timeout: number = 5000) {
    this.baseURL = FinChatUrls.DOMAIN
    this.timeout = timeout

    if (!apiInstance) {
      apiInstance = this
    }
    return apiInstance
  }

  request(path: string, options?: object): Promise<Response> {
    return fetchRequest(this.baseURL, path, this.timeout, options)
  }

  async login({
    userId,
    password,
    app_type,
    login_type,
  }: {
    userId: string
    password?: string
    app_type: string
    login_type: string
  }): Promise<Headers | any> {
    const res: Response = await this.request(FinChatUrls.login, {
      method: 'POST',
      body: {
        userId,
        password,
        app_type,
        login_type,
      },
    })
    return Promise.all([res.headers, res.json()])
  }
}
