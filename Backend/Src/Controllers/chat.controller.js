import Chat from '../Models/chat.model.js';

export const createNewChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const newChat = new Chat({ userId, messages: [] });
    const savedChat = await newChat.save();

    res.status(201).json({ chatId: savedChat._id, message: 'New chat created successfully.' });
  } catch (error) {
    console.error('Error creating new chat:', error.message);
    res.status(500).json({ error: 'Failed to create a new chat.' });
  }
};


export const getPreviousChats = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const chats = await Chat.find({ userId })
      .sort({ updatedAt: -1 }) // Sort by most recent chats
      .select('_id updatedAt messages')
      .lean();

    const chatSummaries = chats.map(chat => ({
      chatId: chat._id,
      lastUpdated: chat.updatedAt,
      firstMessage: chat.messages[0]?.content || 'No messages yet.',
    }));

    res.status(200).json(chatSummaries);
  } catch (error) {
    console.error('Error fetching previous chats:', error.message);
    res.status(500).json({ error: 'Failed to retrieve previous chats.' });
  }
};


export const getChatById = async (req, res) => {
  const { chatId } = req.params;

  if (!chatId) {
    return res.status(400).json({ error: 'Chat ID is required' });
  }

  try {
    const chat = await Chat.findById(chatId).lean();

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found.' });
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error('Error fetching chat by ID:', error.message);
    res.status(500).json({ error: 'Failed to retrieve chat.' });
  }
};
