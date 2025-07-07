
// Load environment variables first
require('dotenv').config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const questionsRoute = require("./routes/questions.route");
const authRoute = require("./routes/auth.route");
const quizRoute = require("./routes/quiz.route");
const connectToMongo = require("./connectDb");
const { initializeSocket } = require("./socket/socket.js");
const { ENV_VARS } = require("./config/envVar.js");

const PORT = ENV_VARS.PORT || 3000;

const app = express();
const server = http.createServer(app);
const socketIO = require("socket.io");

// Initialize socket.io on the same server
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

// Connect to MongoDB before starting the server
connectToMongo().then(() => {
  console.log('Database connection established');
}).catch((error) => {
  console.error('Failed to connect to database:', error);
  process.exit(1);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/v1/questions", questionsRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/quiz", quizRoute);
app.use("/uploads", express.static("uploads"));

initializeSocket(io);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Smart Interview Lab API is running!",
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${ENV_VARS.NODE_ENV || 'development'}`);
});
