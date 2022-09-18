const express = require("express");
const bodyParser = require("body-parser");
const os = require("os");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");

const api = require("./api");
const middleware = require("./middleware");

const port = process.env.PORT || 1337;
const sessionSecret = process.env.SESSION_SECRET || "session secret";
const adminPassword = process.env.ADMIN_PASSWORD || "password";

passport.use(
  new Strategy((username, password, cb) => {
    const isAdmin = username === "admin" && password === adminPassword;
    if (isAdmin)
      return cb(null, {
        username: "admin",
      });
    cb(null, false);
  })
);

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));

const app = express();
const hostname = os.hostname();

app.use(middleware.cors);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  expressSession({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.json({ machine: hostname });
});

app.post("/login", passport.authenticate("local"), (req, res) =>
  res.json({ success: true })
);
app.get("/products", ensureAdmin, api.listProducts);
app.post("/products", api.createProduct);
app.get("/products/:id", ensureAdmin, api.getProduct);
app.put("/products/:id", ensureAdmin, api.editProduct);
app.delete("/products/:id", ensureAdmin, api.deleteProduct);

app.use(middleware.handleError);
app.use(middleware.notFound);

const server = app.listen(port, () =>
  console.log(`Server listening on port http://localhost:${port}`)
);

function ensureAdmin(req, res, next) {
  console.log(" req ", req.user);
  const isAdmin = req.user && req.user.username === "admin";
  if (isAdmin) return next();

  res.status(401).json({ error: "Unauthorized" });
}

if (require.main !== module) {
  module.exports = server;
}
