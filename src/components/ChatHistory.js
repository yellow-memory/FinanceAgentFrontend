import React from 'react';

const ChatHistory = ({ chatHistory }) => {
    return (
        <div style={{ margin: '3%', fontSize: '1.2vw', color: '#333', maxHeight: '80vh', overflowY: 'auto' }}>
            {chatHistory.map((message, index) => (
                <div key={index} style={{ textAlign: message.sender === 'user' ? 'right' : 'left' }}>
                    <div 
                        style={{ 
                            display: 'inline-block', 
                            padding: '10px', 
                            borderRadius: '10px', 
                            backgroundColor: message.sender === 'user' ? '#d1e7dd' : '#f8d7da', 
                            margin: '5px 0',
                            maxWidth: '90%' 
                        }}
                    >
                        {typeof message.text === 'string' ? message.text : JSON.stringify(message.text)}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ChatHistory;
