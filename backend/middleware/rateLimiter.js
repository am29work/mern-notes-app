
import ratelimit from "../config/upstash.js"; // for rate limiting

const rateLimiter = async (req, res, next) => {
    
    try {
        const {success} = await ratelimit.limit("my-limit-key");

        if(!success) {
            return res.status(429).json({
                message: "Too many requests. Please try again later."
            });
        }

        next();
    } catch (error) {
        console.log("Error in rateLimiter middleware", error);
        next(error);
        res.status(500).json({ message: "Internal Server Error"});
    }};

export default rateLimiter;