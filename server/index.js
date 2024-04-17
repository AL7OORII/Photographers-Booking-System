const express = require("express");
require("dotenv").config();
const cors = require("cors");
// ROUTERS
const authRouter = require("./routers/auth.routes");
const photographerRouter = require("./routers/photographer.routes");
const bookingRouter = require("./routers/booking.routes");
const feedbackRouter = require("./routers/feedback.routes");
const searchRouter = require("./routers/search.routes");
const notificationRouter = require("./routers/notification.routes");
const clientRouter = require("./routers/client.routes");
// ERROR HANDLER
const errorHandler = require("./middlewares/errorHandler");
// DB CONN
const connectDB = require("./connectDB/connectDB");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(
  cors({
    origin: ["http://localhost:5173"],
    // origin: ["https://searchartisans.netlify.app", "http://localhost:3000"],
    // origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Origin",
      "X-Requested-With",
      "Accept",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
      "Authorization",
    ],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/", (req, res) => {
  res.send("Artisan API");
});

app.use("/auth", authRouter);
app.use("/photographer", photographerRouter);
app.use("/bookings", bookingRouter);
app.use("/feedback", feedbackRouter);
app.use("/search", searchRouter);
app.use("/notification", notificationRouter);
app.use("/client", clientRouter);

app.use(errorHandler);

const port = 5000 || process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
