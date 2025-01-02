type middlewareFn = (input: RequestInfo | URL, init: RequestInit | undefined, next: () => Promise<Response>) => Promise<Response>;
/**
 * Fetch middleware class
 */
declare class Fetch {
    private middlewares;
    /**
     * Add a middleware to the fetch middleware stack
     * @param middleware fetch middleware
     */
    use(middleware: middlewareFn): void;
    /**
     * Fetch with middleware
     * @param input fetch input
     * @param init fetch init
     */
    fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}
export default Fetch;
