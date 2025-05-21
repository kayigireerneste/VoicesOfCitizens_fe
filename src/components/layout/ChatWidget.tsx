// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';

const ChatWidget: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <button
        onClick={toggleChat}
        className="bg-teal-500 hover:bg-teal-600 rounded-full p-3 shadow-lg transition-all duration-300 text-white"
        aria-label="Open Chat"
      >
        <MessageSquare size={24} />
      </button>
      {isChatOpen && (
        <div className="absolute bottom-16 right-0 mb-2 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200">
          <div className="bg-teal-500 text-white p-3 flex justify-between items-center">
            <div className="flex items-center">
              <MessageSquare size={18} className="mr-2" />
              <span className="font-medium">Chat Support</span>
            </div>
            <button 
              onClick={closeChat}
              className="hover:bg-teal-600 rounded-full p-1" 
              aria-label="Close Chat"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex-grow relative">
            {!iframeLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
              </div>
            )}
            <iframe
              src="https://cdn.botpress.cloud/webchat/v2.4/shareable.html?configUrl=https://files.bpcontent.cloud/2025/05/21/18/20250521185122-4EJTDTT5.json"
              width="100%"
              height="100%"
              frameBorder="0"
              onLoad={handleIframeLoad}
              title="Chat Support"
              className="bg-white"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;