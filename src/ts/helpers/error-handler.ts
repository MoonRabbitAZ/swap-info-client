
import log from 'loglevel'

type ErrorHandlerErrorType = Error

export class ErrorHandler {
  static processWithoutFeedback (error: ErrorHandlerErrorType | string): void {
    log.error(error)
  }

  static _getErrorMsg (error: ErrorHandlerErrorType): string {
    switch (error.constructor) {
      default:
        return error.message
    }
  }
}
