'use client';

import React, { useState } from 'react';
import { CHATS } from '@/data/mockData';
import ChatListSidebar from '@/components/chat/full/ChatListSidebar';
import ChatConversation from '@/components/chat/full/ChatConversation';
import ChatInputBar from '@/components/chat/full/ChatInputBar';
import { Message } from '@/types/chat';

export default function ChatView() {
  const [activeChatId, setActiveChatId] = useState(CHATS[0].id);
  const activeChat = CHATS.find(c => c.id === activeChatId) || CHATS[0];
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hey! Are we still on for later?", sender: 'them', time: '10:30 AM' },
    { id: 2, text: "Yes absolutely. I'll grab the tickets.", sender: 'me', time: '10:35 AM' },
    { id: 3, text: activeChat.lastMessage || '', sender: 'them', time: activeChat.time },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setMessages([...messages, {
      id: Date.now(),
      text: message,
      sender: 'me',
      time: 'Just now'
    }]);
    setMessage('');
    
    // Simulate typing response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Sounds like a plan! 🔥",
        sender: 'them',
        time: 'Just now'
      }]);
    }, 2000);
  };

  return (
    <div className="flex h-full max-h-[calc(100vh-4.5rem)] bg-[#0a0a0f] md:p-6 p-0 relative">
      <div className="w-full h-full max-w-6xl mx-auto flex glass-card md:rounded-3xl overflow-hidden relative z-10 border-x-0 md:border-x border-white/5">
        
        <ChatListSidebar 
          activeChatId={activeChatId} 
          onSelectChat={(id) => setActiveChatId(id)} 
        />

        <div className="flex flex-col flex-1 bg-[#0f172a]/20 relative">
          <ChatConversation 
            activeChat={activeChat} 
            messages={messages} 
            isTyping={isTyping} 
          />
          
          <ChatInputBar 
            message={message} 
            setMessage={setMessage} 
            onSend={handleSend} 
          />
        </div>
        
      </div>
    </div>
  );
}
