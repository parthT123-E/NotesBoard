import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
     if (req.path.startsWith("/api/auth")) return next();
    const identifier = req.user?._id?.toString() || req.ip;
    const { success } = await ratelimit.limit(`rate-limit:${identifier}`);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }
    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;
