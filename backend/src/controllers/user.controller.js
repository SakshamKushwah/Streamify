import User from "../models/User.js";


export async function getRecommendedUsers(req, res) {

    try {
        const currentUserId = req.user._id;
        const currentUser = req.user;

        const getRecommendedUsers = await User.find({
            $and: [
                {_id : {$ne: currentUserId}}, //exclude current user 
                {$id : {$nin: currentUser.friends}}, // exclude friends
                {isOnboarded: true} // only onboarded users
            ]
        })
        res.status(200).json(recommendUsers);
    } catch (error) {
        console.log("Error in getRecommendedUsers controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
};


export async function getMyFriends(req, res) {};