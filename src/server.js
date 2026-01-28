import express from "express";
import scanRoute from "./routes/scan.js";
import analyzeRoute from "./routes/analyze.js";

const app = express();
app.use(express.json());

app.use("/scan", scanRoute);
app.use("/analyze", analyzeRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
