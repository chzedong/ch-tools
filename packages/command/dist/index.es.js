class s {
  constructor(e) {
    this.root = e, this.config = [], this.handleClick = (t) => {
      const n = t.target.getAttribute("data-name");
      n && this.executeCommand(n);
    }, e.addEventListener("click", this.handleClick);
  }
  addMenuItem(e) {
    this.config.push(e);
  }
  render() {
    this.config.forEach((e) => {
      const t = e.render();
      this.root.appendChild(t);
    });
  }
  executeCommand(e) {
    this.config.forEach((t) => {
      t.execute(e);
    });
  }
}
class a {
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
  s as Menu,
  a as MenuItem
};
