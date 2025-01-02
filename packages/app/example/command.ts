
import { Menu, MenuItem } from 'ch-tools-command';

type Command = 'copy' | 'cut' | 'paste'

class Editor {
  executeCommand(command: Command) {
    switch (command) {
      case 'copy':
        // this.copy()
        break
      case 'cut':
        // this.cut()
        break
      case 'paste':
        // this.paste()
        break
      default:
        throw new Error('Invalid command')
    }
  }
}

const editor = new Editor()
const root = document.getElementById('root') as HTMLElement;

const menu = new Menu(root)

const copy = new MenuItem({
  name: 'copy',
  label: 'Copy',
  execute: (command: Command) => {
    console.log('copy', command)
    editor.executeCommand(command)
  }
})

const cut = new MenuItem({
  name: 'cut',
  label: 'Cut',
  execute: (command: Command) => {
    console.log('cut', command)
    editor.executeCommand(command)
  }
})

const paste = new MenuItem({
  name: 'paste',
  label: 'Paste',
  execute: (command: Command) => {
    console.log('paste', command)
    editor.executeCommand(command)
  }
})

menu.addMenuItem(copy)
menu.addMenuItem(cut)
menu.addMenuItem(paste)



menu.render()
