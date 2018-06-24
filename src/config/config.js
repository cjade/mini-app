export const clientType = 'miniapp'

export const isProductionMode = process.env.NODE_ENV === 'production'

export const apiurl = process.env.NODE_ENV === 'production' ? 'https://api.mcoo.me' : 'http://apidev.mcoo.me'
