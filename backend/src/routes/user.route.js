import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { acceptFriensRequest, getMyFriends, getRecommendedUsers, sendFriensRequest } from "../controllers/user.controller.js";

const router = express.Router();

//all routes below this line are protected
router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friends-request/:id", sendFriensRequest );
router.put("/friends-request/:id/accept", acceptFriensRequest );

router.get("/friend-requests", getFriendRequests );


export default router;