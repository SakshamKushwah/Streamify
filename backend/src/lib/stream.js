import {StreamChat} from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

 if(!apiKey || !apiSecret){
    console.error("Stream API key and secret are missing");
 }
 const streamClient = StreamChat.getInstance(apiKey, apiSecret);

//  stremclient is  help to create user

export const upsertStreamUser =  async (userData) => {
    try {
        await streamClient.upsertUser(userData);
        return userData;
    } catch (error) {
        console.error("Error in upserting stream user", error);
    }
};

//todo : do it later
export const generateStreamToken = (userId) => {};