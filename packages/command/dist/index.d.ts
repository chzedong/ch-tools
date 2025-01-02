interface MenuItemType<T> {
    name: string;
    label: string;
    execute: (command: T) => void;
}
export declare class Menu<T> {
    private root;
    private config;
    private interceptors;
    constructor(root: HTMLElement);
    handleClick: (e: MouseEvent) => void;
    addMenuItem(item: MenuItem<T>): void;
    use(interceptor: (command: T, next: () => Promise<void>) => Promise<void>): void;
    render(): void;
    _executeCommand(command: T): Promise<void>;
    executeCommand(command: T): void;
}
export declare class MenuItem<T> {
    private config;
    constructor(config: MenuItemType<T>);
    render(): HTMLSpanElement;
    execute(command: T): void;
}
export {};
