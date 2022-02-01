const http = require("http");

const port = process.env.PORT || 1337;

const server = http.createServer(function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ text: "hi", numbers: [1, 2, 3] }));
});

function startServer2() {
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

module.exports = { startServer2 };
