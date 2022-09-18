const express = require("express");
const bodyParser = require("body-parser");
const os = require("os");

const api = require("./api");
const middleware = require("./middleware");

const port = process.env.PORT || 1337;

const app = express();
const hostname = os.hostname();

app.use(middleware.cors);
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json({ machine: hostname });
});
app.get("/products", api.listProducts);
app.post("/products", api.createProduct);
app.get("/products/:id", api.getProduct);
app.put("/products/:id", api.editProduct);
app.delete("/products/:id", api.deleteProduct);

app.use(middleware.handleError);
app.use(middleware.notFound);

const server = app.listen(port, () =>
  console.log(`Server listening on port http://localhost:${port}`)
);

if (require.main !== module) {
  module.exports = server;
}
