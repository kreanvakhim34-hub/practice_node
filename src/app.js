import express from "express";
import Database from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "MVC and OOP Node.js project is running."
  });
});

const startServer = async () => {
  try {
    await Database.connect();

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
  }
};

startServer();
