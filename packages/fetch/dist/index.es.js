class a {
  constructor() {
    this.middlewares = [];
  }
  /**
   * Add a middleware to the fetch middleware stack
   * @param middleware fetch middleware
   */
  use(e) {
    this.middlewares.push(e);
  }
  /**
   * Fetch with middleware
   * @param input fetch input
   * @param init fetch init
   */
  async fetch(e, t) {
    let s = this.middlewares.length - 1;
    const r = async () => {
      if (s < 0)
        return fetch(e, t);
      const c = this.middlewares[s];
      return s -= 1, c(e, t, r);
    };
    return r();
  }
}
export {
  a as default
};
