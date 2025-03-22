import { Request, Response } from "express";
import encrypt from "js-sha256";
import URL from "../models";
import redis from "redis";
import { origin } from "bun";

const redisClient = redis.createClient();
await redisClient.connect();

const createShortenerURL = async (req: Request, res: Response) => {
  try {
    const originalUrl = req.body.url;
    if (!originalUrl)
      return res.status(400).json({
        message: "send a valid url",
      });

    const hashedUrl = encrypt.sha256(originalUrl);

    const shortenerUrl = await URL.create({ originalUrl: originalUrl, shortUrl: hashedUrl });
    await redisClient.set(hashedUrl, originalUrl);

    res.status(201).json({
      message: "Your shortened url created successfully",
      ...shortenerUrl,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getOriginalURL = async (req: Request, res: Response) => {
  try {
    const url = req.params.shortUrl;

    const cachedItem = await redisClient.get(url);
    if (cachedItem) return res.status(200).json({ originUrl: cachedItem });

    const item = await URL.findOne({ shortUrl: url });
    if (!item) return res.status(404).json({ message: "This url does not exist" });

    res.status(200).json({ originalUrl: item.originalUrl });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { createShortenerURL, getOriginalURL };
