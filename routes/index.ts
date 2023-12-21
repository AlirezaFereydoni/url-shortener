import express from 'express';
import { createShortenerURL, getOriginalURL } from '../controllers';

const Router = express.Router();

Router.route('/').post(createShortenerURL);
Router.route('/:shortUrl').get(getOriginalURL);

export default Router;
