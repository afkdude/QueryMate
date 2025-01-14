import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import { useAuthStore } from './useAuthStore.js'
import toast from 'react-hot-toast';



export const useChatStore = create((set, get) => ({
  chatList: [],
  activeChat: null,
  messages: [], // Store messages for the active chat
  isChatListLoading: false, 

  getChatList: async (userId) => {
    set({ isChatListLoading: true });
    
    try {
      const res = await axiosInstance.get(`/chat/user/${userId}`);
      set({ chatList: res.data }); 
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isChatListLoading: false });
    }
  },

 


}))