const http = require("http");

const port = process.env.PORT || 1337;

const server = http.createServer(function (req, res) {
  if (req.url === "/") return respondText(req, res);
  else if (req.url === "/json") return respondJson(req, res);
  else if (req.url === "/abc") return respondNotFound(req, res);
});

function startServer3() {
  return new Promise((resolve) => {
    const app = server.listen(port, () => {
      console.log(
        `Server listening on port http://localhost:${server.address().port}`
      );
      const originalClose = server.close.bind(server);
      server.close = () => {
        return new Promise((resolveClose) => {
          originalClose(resolveClose);
        });
      };
      resolve(app);
    });
  });
}

function respondText(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.end("hi");
}

function respondJson(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ text: "hi", numbers: [1, 2, 3] }));
}

function respondNotFound(req, res) {
  // TODO : check jest test case for this end-point
  // res.writeHead(404, { 'Content-Type': 'text/plain' })
  res.setHeader("Content-Type", "text/plain");
  res.end("Not Found");
}

module.exports = { startServer3 };
