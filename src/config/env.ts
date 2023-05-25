export const environment = process.env.NODE_ENV
export const isProduction = environment === 'production'

// app
export const appName = process.env.APP_NAME || 'App Name'

export const reCaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY
export const reCaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY

// api
export const apiBaseUrl = process.env.API_BASE_URL
export const apiClientId = process.env.API_CLIENT_ID
export const apiClientName = process.env.API_CLIENT_NAME
export const apiClientSecret = process.env.API_CLIENT_SECRET

// mock api
export const mockBaseUrl = process.env.MOCK_API_BASE_URL

// debug
export const isAuthDebug = process.env.IS_AUTH_DEBUG ?? false
