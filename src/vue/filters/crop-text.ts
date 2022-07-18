export function cropText (text: string, reduceValue: number = 4): string {
  if (text.length > 2 * reduceValue) {
    return `${text.slice(0, reduceValue)}…${text.slice(-reduceValue)}`
  } else {
    return text
  }
}
