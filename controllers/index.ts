import { Request, Response, NextFunction } from 'express';
import encrypt from 'js-sha256';
import URL from '../models';

const createShortenerURL = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const originalUrl = req.body.url;
    if (!originalUrl)
      res.status(400).json({
        message: 'send a valid url',
      });

    const hashedUrl = encrypt.sha256(originalUrl);
    console.log(hashedUrl);

    const shortenerUrl = await URL.create({ originalUrl: originalUrl, shortUrl: hashedUrl });

    res.status(201).json({
      message: 'Your shortened url created successfully',
      ...shortenerUrl,
    });
  } catch (err) {}
};

const getOriginalURL = (req: Request, res: Response, next: NextFunction) => {};

export { createShortenerURL, getOriginalURL };
