require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.emit("connected");
  })
  .catch((err) => console.log(err));

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const routes = require("./routes");
const path = require("path");

const helmet = require("helmet");
const csrf = require("csurf");

const {
  middlewareGlobal,
  checkCsrfError,
  csrfMiddlware,
} = require("./src/middlewares/middleware");
const { ppid } = require("process");

//sudo kill $(sudo lsof -t -i:3000)

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

const sessionOptions = session({
  secret: "ksnd3h12v3l12h321kl3h12vj3lj2khv3lxlçkj2h1v3x",
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});

app.use(sessionOptions);
app.use(flash());

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(csrf());
//meus middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddlware);
app.use(routes);

app.on("connected", () => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
    console.log("acess http://localhost:3000/");
  });
});
