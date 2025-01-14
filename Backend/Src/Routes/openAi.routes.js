  import express from 'express';
  import  {getAIResponse}  from '../Controllers/openAi.controller.js';

  const router = express.Router();

  // POST /api/ai/response
  router.post('/response', getAIResponse);

  export default router;
