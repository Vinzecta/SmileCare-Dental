import express from "express";
import cors from "cors";
import "dotenv/config";
import { Router } from "express";

import patientRoutes from "./routes/patient.routes.js";
import clinicRoutes from "./routes/clinic.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

const router = Router();

// Use routes
app.use("/", patientRoutes);
app.use("/", clinicRoutes);
app.use("/", router);

// GET /
router.get("/", (req, res) => {
  res.send("Backend Express đã chạy!");
});


// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
