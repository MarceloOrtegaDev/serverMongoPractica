import { mongoose } from "mongoose";
import { MONGODB_URL } from "../config/env.js";

export const connect = async (_req, _res) => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("Connect from " + MONGODB_URL);
    } catch (error) {
        console.error(error);
    }
}

