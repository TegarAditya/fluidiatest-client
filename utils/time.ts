export function formatDuration(milliseconds: number): string {
  const seconds = Math.floor((milliseconds / 1000) % 60)
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60)
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24)

  const parts = []
  if (hours > 0) parts.push(`${hours} jam${hours > 1 ? 's' : ''}`)
  if (minutes > 0) parts.push(`${minutes} menit${minutes > 1 ? 's' : ''}`)
  if (seconds > 0) parts.push(`${seconds} detik${seconds > 1 ? 's' : ''}`)

  return parts.join(' ')
}
