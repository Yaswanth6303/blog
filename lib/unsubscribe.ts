export function unsubscribeUrl(token: string, baseUrl: string) {
  return `${baseUrl.replace(/\/$/, "")}/unsubscribe?token=${encodeURIComponent(token)}`
}
