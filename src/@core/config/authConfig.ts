export const authConfig = {
    storageTokenKeyName: 'jwt',
    meEndPoint: '/user/me',
    loginEndpoint: '/auth/login',
    onTokenExpiration: 'refreshToken',
}
