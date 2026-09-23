const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = Number(process.env.PORT || 3000);
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/messageboard";

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 60 },
    message: { type: String, required: true, trim: true, maxlength: 500 }
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

app.use(express.json());
app.use(express.static("public"));

app.get("/health", (_req, res) => {
  const mongoReady = mongoose.connection.readyState === 1;
  res.status(mongoReady ? 200 : 503).json({
    status: mongoReady ? "ok" : "degraded",
    database: mongoReady ? "connected" : "disconnected"
  });
});

app.get("/api/messages", async (_req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).limit(50);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to load messages" });
  }
});

app.post("/api/messages", async (req, res) => {
  try {
    const { name, message } = req.body;

    if (!name?.trim() || !message?.trim()) {
      return res.status(400).json({ error: "Name and message are required" });
    }

    const saved = await Message.create({
      name: name.trim(),
      message: message.trim()
    });

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: "Failed to save message" });
  }
});

async function start() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  const server = app.listen(PORT, () => {
    console.log(`Application listening on port ${PORT}`);
  });

  const shutdown = async (signal) => {
    console.log(`${signal} received. Shutting down...`);
    server.close(async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

start().catch((error) => {
  console.error("Startup failed:", error);
  process.exit(1);
});
