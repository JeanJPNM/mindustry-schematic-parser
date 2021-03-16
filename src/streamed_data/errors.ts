export class StringParsingError extends Error {
  /** The text that was successfully parsed before the parsing error*/
  readonly parsedText: string

  constructor(message: string, parsedText: string) {
    super(message)
    this.parsedText = parsedText
  }
}
