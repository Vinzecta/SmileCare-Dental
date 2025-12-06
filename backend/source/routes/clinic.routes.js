import { Router } from "express";

const router = Router();

// GET /api/users
router.get("/", (req, res) => {
  res.send("Backend Express đã chạy!");
});

export default router;
