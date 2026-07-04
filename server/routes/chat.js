import express from 'express';
import { handleChat } from '../controllers/chatController.js'; // 👈 Make sure to include the .js extension!

const router = express.Router();

// This handles the chat requests from your React frontend
router.post('/chat', handleChat);

export default router;  