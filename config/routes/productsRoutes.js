import express from "express";
import { getAllProductsLimits } from '../../src/api/v1/controllers/productsControllers.js';

const router = express.Router();

router.get('/products',getAllProductsLimits);

export default router;