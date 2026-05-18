import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "Kani" },
    { id: 2, name: "Ram" }
  ]);
});

app.get("/notifications", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "An authorization header is required" });
  }

  try {
    const response = await fetch("http://4.224.186.213/evaluation-service/notifications", {
      headers: {
        "Authorization": authHeader
      }
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});