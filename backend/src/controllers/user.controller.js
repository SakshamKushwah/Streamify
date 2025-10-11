import User from "../models/User.js";


export async function getRecommendedUsers(req, res) {

    try {
        const currentUserId = req.user._id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and: [
                {_id : {$ne: currentUserId}}, //exclude current user 
                {$id : {$nin: currentUser.friends}}, // exclude friends
                {isOnboarded: true} // only onboarded users
            ]
        })
        res.status(200).json(recommendedUsers);
    } catch (error) {
        console.log("Error in getRecommendedUsers controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
};


export async function getMyFriends(req, res) {
    try {
        const user = await User.findById(req.user._id)
        .select("friends")
        .populate("friends", "fullName profilePic nativeLanguage leraningLanguage");

        res.status(200).json(user.friends);
    } catch (error) {
        console.log("Error in getMyFriends controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
        
        
    }
};