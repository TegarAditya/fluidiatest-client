export function formatDuration(milliseconds: number): string {
  const seconds = Math.floor((milliseconds / 1000) % 60)
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60)
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24)

  const parts = []
  if (hours > 0) parts.push(`${hours} jam`)
  if (minutes > 0) parts.push(`${minutes} menit`)
  if (seconds > 0) parts.push(`${seconds} detik`)

  return parts.join(' ')
}
