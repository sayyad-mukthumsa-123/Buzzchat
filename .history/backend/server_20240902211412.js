// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const authRoutes = require("./routes/auth");
// const messageRoutes = require("./routes/messages");
// const app = express();
// const socket = require("socket.io");
// const path = require("path");
// require("dotenv").config();

// app.use(cors({
//   origin: ['https://buzzchat-frontend-ilm3.onrender.com', 'http://localhost:3000'],
//   credentials: true,
// }));
// app.use(express.json());

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("DB Connection Successful");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// app.get("/ping", (_req, res) => {
//   return res.json({ msg: "Ping Successful" });
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// // Deployment code
// const __dirname1 = path.resolve();
// if (process.env.NODE_ENV == "production") {
//   app.use(express.static(path.join(__dirname1, "../frontend/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("Running successfully!!!");
//   });
// }

// const server = app.listen(process.env.PORT, () =>
//   console.log(`Server started on ${process.env.PORT}`)
// );

// const io = socket(server, {
//   cors: {
//     origin: ['https://buzzchat-frontend-ilm3.onrender.com', 'http://localhost:3000'],
//     credentials: true,
//   },
// });

// global.onlineUsers = new Map();
// io.on("connection", (socket) => {
//   global.chatSocket = socket;
//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });

//   socket.on("send-msg", (data) => {
//     const sendUserSocket = onlineUsers.get(data.to);
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//     }
//   });
// });


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
const path = require("path");
require("dotenv").config();

// Configure CORS
app.use(cors({
  origin: ['https://buzzchat-frontend-ilm3.onrender.com', 'http://localhost:3000'], // Allow both localhost and your deployed frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow necessary HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers necessary for your requests
  credentials: true // Allow cookies and credentials to be sent
}));
app.options('*', cors());


app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/ping", (_req, res) => {
  return res.json({ msg: "Ping Successful" });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Deployment code
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Running successfully!!!");
  });
}

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const io = socket(server, {
  cors: {
    origin: ['https://buzzchat-frontend-ilm3.onrender.com', 'http://localhost:3000'],
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
