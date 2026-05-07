
import express from "express";
import userRoutes from "./routes/userRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", userRoutes);

//Health check
app.get("/", (req, res) => {
  res.json({ message: "I Love You So Much." });
});

//Global error handler
app.use((err, req, res, _next) => { //destructuring via unused _next
  const { message = "Unexpected error", status = 500 } = err; //destructuring with defaults
  res.status(status).json({ success: false, message });
});

//async/await + try/catch for startup
const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

start();

export default app;