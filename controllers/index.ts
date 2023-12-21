import { Request, Response, NextFunction } from 'express';
import encrypt from 'js-sha256';
import URL from '../models';

const createShortenerURL = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const originalUrl = req.body.url;
    if (!originalUrl)
      return res.status(400).json({
        message: 'send a valid url',
      });

    const hashedUrl = encrypt.sha256(originalUrl);
    console.log(hashedUrl);

    const shortenerUrl = await URL.create({ originalUrl: originalUrl, shortUrl: hashedUrl });

    res.status(201).json({
      message: 'Your shortened url created successfully',
      ...shortenerUrl,
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getOriginalURL = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const url = req.params.shortUrl;
    const item = await URL.findOne({ shortUrl: url });
    if (!item) return res.status(404).json({ message: 'This url does not exist' });

    res.status(200).json({ originalUrl: item.originalUrl });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { createShortenerURL, getOriginalURL };
