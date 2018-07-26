import { Response } from 'node-fetch'
import Config from '@/config'
import fetchRequest from '@/apis/request'

const FinChatUrls: { [key: string]: string } = {
  DOMAIN: Config.get('APP_DOMAIN')!,
  login: '/api/v1/registry/login',
  configAvatar: '/api/v1/finochat/client/profile/:fcId/avatar_url',
  configNickname: '/api/v1/finochat/client/profile/:fcId/displayname',
  // addRoomMember: '/api/v1/platform/:appType/rooms/:roomId/add',
  // createWeChatUser: '/api/rcm/internal/register/wx',
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

  async configUserAvatar(
    fcId: string,
    avatarUrl: string,
    token: string,
    jwt: string,
  ): Promise<void> {
    await this.request(FinChatUrls.configAvatar.replace(':fcId', fcId), {
      method: 'PUT',
      body: {
        avatar_url: avatarUrl,
      },
      token,
      jwt,
    })
  }

  async configUserNickname(
    fcId: string,
    nickname: string,
    token: string,
    jwt: string,
  ): Promise<void> {
    await this.request(FinChatUrls.configNickname.replace(':fcId', fcId), {
      method: 'PUT',
      body: {
        displayname: nickname,
      },
      token,
      jwt,
    })
  }

  async addRoomMember(roomId: string, fcId: string, token: string, jwt: string): Promise<void> {
    await this.request(
      FinChatUrls.addRoomMember.replace(':appType', 'STAFF').replace(':roomId', roomId),
      {
        method: 'POST',
        body: {
          fcid: fcId,
        },
        token,
        jwt,
      },
    )
  }

  async createWeChatUser(openId: string, nickname: string, avatarUrl: string): Promise<Response> {
    const response: Response = await this.request(FinChatUrls.createWeChatUser, {
      method: 'POST',
      body: {
        openId,
        displayName: nickname,
        avatarUrl,
      },
    })
    const responseJson = await response.json()
    return responseJson
  }
}
