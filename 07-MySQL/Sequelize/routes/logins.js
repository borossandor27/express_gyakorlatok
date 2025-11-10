
import express from 'express';
import { getAllLogins, createLogin } from '../controllers/loginsController.js';

const router = express.Router();

router.get('/', getAllLogins);
router.post('/', createLogin);

export default router;
