type middlewareFn = (input: RequestInfo | URL, init: RequestInit | undefined, next: () => Promise<Response>) => Promise<Response>

/**
 * Fetch middleware class
 */
class Fetch {
  private middlewares: middlewareFn[] = []

  /**
   * Add a middleware to the fetch middleware stack, the middleware will be executed in the order it was added
   * @param middleware fetch middleware
   */
  use(middleware: middlewareFn) {
    this.middlewares.push(middleware)
  }

  /**
   * Fetch with middleware
   * @param input fetch input
   * @param init fetch init
   */
  async fetch(input: RequestInfo | URL, init?: RequestInit) {
    let current = this.middlewares.length - 1
    const next = async () => {
      if (current < 0) {
        return fetch(input, init)
      }

      const middleware = this.middlewares[current]
      current -= 1
      return middleware(input, init, next)
    }

    return next()
  }
}

export default Fetch
