import express from "express";
import { protect } from "../middlewares/auth.js";
import { addReview, deleteReview, getReview } from "../controllers/review.js";
const reviewrouter=express.Router();

reviewrouter.post("/add-review",protect,addReview);
reviewrouter.post("/delete-review",protect,deleteReview);
reviewrouter.get("/get-review",protect,getReview);

export default reviewrouter;