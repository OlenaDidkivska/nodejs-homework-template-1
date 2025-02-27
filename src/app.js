const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { errorHandler } = require("./helpers/index");

const { authRouter } = require("./routes/api/auth");
const { userRouter } = require("./routes/api/user");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/public', express.static('public'));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Not found",
  });
});

app.use(errorHandler);

module.exports = app;
