const http = require("http");

http
  .createServer((req, res) => {
    // 路由匹配
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<html><body><h1>This is Home Page</h1></body></html>");
    } else if (req.url === "/api") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "This is an API response" }));
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
    }
  })
  .listen(1337, "localhost");
