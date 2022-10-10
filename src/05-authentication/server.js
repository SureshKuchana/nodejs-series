const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const os = require("os");

const api = require("./api");
const auth = require("./auth");
const middleware = require("./middleware");

const port = process.env.PORT || 1337;

const app = express();
const hostname = os.hostname();

app.use(middleware.cors);
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ machine: hostname });
});

app.post("/login", auth.authenticate, auth.login);

app.get("/products", auth.ensureAdmin, api.listProducts);
app.post("/products", api.createProduct);
app.get("/products/:id", auth.ensureAdmin, api.getProduct);
app.put("/products/:id", auth.ensureAdmin, api.editProduct);
app.delete("/products/:id", auth.ensureAdmin, api.deleteProduct);

app.get("/orders", auth.ensureAdmin, api.listOrders);
app.post("/orders", auth.ensureAdmin, api.createOrder);

app.post('/users', api.createUser)

app.use(middleware.handleValidationError);
app.use(middleware.handleError);
app.use(middleware.notFound);

const server = app.listen(port, () =>
  console.log(`Server listening on port http://localhost:${port}`)
);

if (require.main !== module) {
  module.exports = server;
}
