import { NextFunction, Request, Response } from "express";
import { redis } from "../libs/cache";

export async function RateLimit(request: Request, response: Response, next: NextFunction) {
  const requestsByIp = await redis.get(request.ip)
  if (requestsByIp) {
    if (requestsByIp.split(",").length >= 5) {
      redis.expire(request.ip, 30)
      return response.send("Rate limit")
    }
    redis.set(request.ip, Array(requestsByIp, Date.now().toString()).toString())
    redis.expire(request.ip, 5)
  } else {
    redis.set(request.ip, Date.now().toString())
    redis.expire(request.ip, 5)
  }
  console.log(requestsByIp)
  next()
}