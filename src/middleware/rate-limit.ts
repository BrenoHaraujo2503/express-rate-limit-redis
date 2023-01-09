import { NextFunction, Request, Response } from "express";
import { redis } from "../libs/cache";

export async function RateLimit(request: Request, response: Response, next: NextFunction) {
  const ip = request.headers['x-forwarded-for'] || request.ip
  if (!ip) return;
  const requestsByIp = await redis.get(ip.toString())
  if (requestsByIp) {
    if (requestsByIp.split(",").length >= 5) {
      redis.expire(ip.toString(), 30)
      return response.status(429).json({
        message: "Rate Limit"
      })
    }
    redis.set(ip.toString(), Array(requestsByIp, Date.now().toString()).toString())
    redis.expire(ip.toString(), 5)
  } else {
    redis.set(ip.toString(), Date.now().toString())
    redis.expire(ip.toString(), 5)
  }
  next()
}