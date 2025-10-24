import {StreamChat} from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

 if(!apiKey || !apiSecret){
    console.error("Stream API key and secret are missing");
 }
 const streamClient = StreamChat.getInstance(apiKey, apiSecret ,{
    timeout: 5000, // 5 seconds timeout for API requests
 });

//  stremclient is  help to create user

export const upsertStreamUser =  async (userData) => {
    try {
        await streamClient.upsertUser(userData);
        return userData;
    } catch (error) {
        console.error("Error in upserting stream user", error);
    }
};


export const generateStreamToken = (userId) => {
    try {
        //ensure userId is string
        const userIdStr = String (userId);
        return streamClient.createToken(userIdStr);

    } catch (error) {
        console.error("Error in generating stream token", error);
    }
};