import OpenAI from 'openai';
import dotenv from 'dotenv';
import Chat from '../Models/chat.model.js'; // Import the Chat model

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAIResponse = async (req, res) => {
  const { userId, message } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ error: 'User ID and message are required' });
  }

  try {
    // Generate AI response
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message },
      ],
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const botMessage = response.choices[0]?.message?.content || 'I could not process your request.';

    // Save conversation to the database
    let chat = await Chat.findOne({ userId });

    if (!chat) {
      // Create a new chat document if it doesn't exist
      chat = new Chat({
        userId,
        messages: [
          { role: 'user', content: message },
          { role: 'bot', content: botMessage },
        ],
      });
    } else {
      // Update existing chat with new messages
      chat.messages.push({ role: 'user', content: message });
      chat.messages.push({ role: 'bot', content: botMessage });
    }

    await chat.save();

    res.status(200).json({ reply: botMessage });
  } catch (error) {
    console.error('Error interacting with OpenAI or saving chat:', error.message);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
};
