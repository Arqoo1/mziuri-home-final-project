import express from 'express';
import { getRates, convertCurrency } from '../controllers/currencyController.js';

const router = express.Router();

router.get('/rates', getRates);
router.get('/convert', convertCurrency);

export default router;