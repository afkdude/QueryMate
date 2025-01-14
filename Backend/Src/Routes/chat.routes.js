import express from 'express';
import { createNewChat, getPreviousChats, getChatById } from '../Controllers/chat.controller.js';

const router = express.Router();

// Route to create a new chat
router.post('/new', createNewChat);

// Route to get all previous chats for a user
router.get('/user/:userId', getPreviousChats);

// Route to get a specific chat by ID
router.get('/:chatId', getChatById);

export default router;
