// tslint:disable:interface-name
declare module 'third-library' {
  interface Promise {
    done(callback: () => void): void
  }

  interface Client {
    joinRoom(roomId: string): Promise
  }

  export function createClient(options: {
    baseUrl: string
    accessToken: string
    userId: string
  }): Client
}
// tslint:enable:interface-name
