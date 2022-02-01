const express = require("express");

const port = process.env.PORT || 1337;

function startServer() {
  const app = express();
  app.use("/", (req, res) => {
    res.end("hi");
  });
  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      console.log(
        `Server listening on port http://localhost:${server.address().port}`
      );
      const originalClose = server.close.bind(server);
      server.close = () => {
        return new Promise((resolveClose) => {
          originalClose(resolveClose);
        });
      };
      resolve(server);
    });
  });
}

module.exports = { startServer };
