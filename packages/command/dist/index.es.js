class c {
  constructor(e) {
    this.root = e, this.config = [], this.interceptors = [], this.handleClick = (t) => {
      const n = t.target.getAttribute("data-name");
      n && this.executeCommand(n);
    }, e.addEventListener("click", this.handleClick);
  }
  addMenuItem(e) {
    this.config.push(e);
  }
  use(e) {
    this.interceptors.push(e);
  }
  render() {
    this.config.forEach((e) => {
      const t = e.render();
      this.root.appendChild(t);
    });
  }
  async _executeCommand(e) {
    this.config.forEach((t) => {
      t.execute(e);
    });
  }
  executeCommand(e) {
    let t = this.interceptors.length - 1;
    const i = async () => {
      if (t > -1) {
        const n = this.interceptors[t];
        t--, await n(e, i);
      } else
        await this._executeCommand(e);
    };
    i();
  }
}
class r {
  constructor(e) {
    this.config = e;
  }
  render() {
    const e = document.createElement("span");
    return e.innerText = this.config.label, e.setAttribute("data-name", this.config.name), e;
  }
  execute(e) {
    this.config.execute(e);
  }
}
export {
  c as Menu,
  r as MenuItem
};
