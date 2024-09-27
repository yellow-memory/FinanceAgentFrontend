import React, {useState} from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';

function ChatBox({gptName, onChatUpdate}) {
    const [userMessage, setUserMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([])

    const handleSendMessage = async () => {
        if (!userMessage.trim()) return;

        const newMessage = {
            sender: 'user',
            text: userMessage
        }
        console.log("==============> user message ", userMessage)
         
        setUserMessage('');
        const updatedChatHistory = [...chatHistory, newMessage]  
        setChatHistory(updatedChatHistory);
        console.log('================> chat history ', chatHistory)
        console.log('================> updated chat history ', updatedChatHistory)
        onChatUpdate(updatedChatHistory, null)

        await axios.post('https://testagent1-eb208e96c27e.herokuapp.com/chat-gpt', {
            message: userMessage,
            chatHistory: updatedChatHistory
        })
        .then(response => {
            const botMessage = {
                sender: 'bot',
                text: response.data.reply
            }
            console.log("=======> bot message ", botMessage)
            const finalChatHistory = [...updatedChatHistory, botMessage]
            setChatHistory(finalChatHistory)
            console.log('================> chat history 2 ', finalChatHistory)

            onChatUpdate(finalChatHistory, null) 
        })
        .catch(error => {
            onChatUpdate(chatHistory, error)
        });
    }

    return (
        <div style={{ marginTop: '10px', width: '100%'}}>
            <Form.Control
                type='text'
                placeholder={`Chat with ${gptName}`}
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={(e) => e.key==='Enter' && handleSendMessage()}
                style={{
                    width: '100%',
                    fontSize: '1.2vw',
                    borderRadius: '10px'
                }}
            />
        </div>
    );
}

export default ChatBox;
