export const decodeJwtToken = (token: string): { header: any; payload: { full_name: string; user_type: string } } => {
  const splitted = token.split('.')
  const jwtHeader = splitted[0]
  const jwtPayload = splitted[1]
  if (!jwtHeader || !jwtPayload) {
    console.error('invalid jwt token')
  }

  const base64Header = JSON.parse(window.atob(jwtHeader))
  const base64Payload = JSON.parse(window.atob(jwtPayload))

  return { header: base64Header, payload: base64Payload }
}
