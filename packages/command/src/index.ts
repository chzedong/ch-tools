interface MenuItemType<T> {
  name: string,
  label: string,
  execute: (command: T) => void
}

type Interceptor<T> = (command: T, next: () => Promise<void>) => Promise<void>

export class Menu<T> {
  private config: MenuItem<T>[] = []

  private interceptors: Interceptor<T>[] = []

  constructor(private root: HTMLElement) {
    root.addEventListener('click', this.handleClick) }


  handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    const name = target.getAttribute('data-name')
    if (name) {
      this.executeCommand(name as T)
    }
  }

  addMenuItem(item: MenuItem<T>) {
    this.config.push(item)
  }

  use(interceptor: (command: T, next:() => Promise<void>) => Promise<void>) {
    this.interceptors.push(interceptor)
  }

  render() {
    this.config.forEach((item) => {
      const ele = item.render()
      this.root.appendChild(ele)
    })
  }

  async _executeCommand(command: T) {
    this.config.forEach((item) => {
      item.execute(command)
    })
  }

  executeCommand(command: T) {
    let index = this.interceptors.length - 1
    const next = async () => {
      if (index > -1) {
        const interceptor = this.interceptors[index]
        index--
        await interceptor(command, next)
      } else {
        await this._executeCommand(command)
      }
    }
    next()
  }
}

export class MenuItem<T> {
  constructor(private config: MenuItemType<T>) { }

  render() {
    const ele = document.createElement('span')
    ele.innerText = this.config.label
    ele.setAttribute('data-name', this.config.name)
    return ele
  }

  execute(command: T) {
    this.config.execute(command)
  }
}
