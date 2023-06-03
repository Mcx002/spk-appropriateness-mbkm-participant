import { toast } from 'react-hot-toast'

export const decodeJwtToken = (
  token: string
): {
  header: any
  payload: { name: string; email: string; user_type: string; additional_info: { identifier_id: string } }
} => {
  const splitted = token.split('.')
  const jwtHeader = splitted[0]
  const jwtPayload = splitted[1]
  if (!jwtHeader || !jwtPayload) {
    toast.error('Invalid token')
  }

  const base64Header = JSON.parse(window.atob(jwtHeader))
  const base64Payload = JSON.parse(window.atob(jwtPayload))

  return { header: base64Header, payload: base64Payload }
}
