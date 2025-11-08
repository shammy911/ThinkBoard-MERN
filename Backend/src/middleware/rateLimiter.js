import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        // Use IP address as the rate limit key to limit per client
        const identifier = req.ip;
        
        const { success, reset } = await ratelimit.limit(identifier);
        
        if (!success) {
            // Add the reset time to the response headers
            res.set('X-RateLimit-Reset', new Date(reset).toUTCString());
            return res.status(429).json({
                message: "Too many requests. Please try again later.",
                reset: new Date(reset).toUTCString()
            });
        }

        next();
    } catch (error) {
        console.error("Rate limit Error:", error);
        // Don't expose internal errors to the client
        return res.status(500).json({ 
            message: "Internal server error while checking rate limit" 
        });
    }
};

export default rateLimiter