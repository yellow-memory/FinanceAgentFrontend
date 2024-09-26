import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import { Form } from 'react-bootstrap';

function MergeExcelGPT() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const [userMessage, setUserMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([])

    const handleSendMessage = async () => {
        if (!userMessage.trim()) return;

        const newMessage = {
            sender: 'user',
            text: userMessage
        }
         
        setUserMessage('');
        const updatedChatHistory = [...chatHistory, newMessage]  
        setChatHistory(updatedChatHistory);

        await axios.post('https://testagent1-eb208e96c27e.herokuapp.com/chat-gpt', {
            message: userMessage,
            chatHistory: updatedChatHistory
        })
        .then(response => {
            const botMessage = {
                sender: 'bot',
                text: response.data.reply
            }
        
            setChatHistory(prevChatHistory => [...prevChatHistory, botMessage]); 
        })
        .catch(error => {
            setError(error);
        });
    }

    const handleFileChange = async (e) => {
        const files = e.target.files;
        if (files.length !== 2) {
            alert('Please select two files to merge.');
            return;
        }
        console.log(files[0])
        await handleFileUpload(files);
        e.target.value = null;
    };

    const handleFileUpload = async (files) => {
        const formData = new FormData();
        formData.append('file1', files[0]);
        formData.append('file2', files[1]);

        try {
            setLoading(true)
            const response = await axios.post('https://testagent1-eb208e96c27e.herokuapp.com/merge-excel', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                responseType: 'blob' 
            });
            setLoading(false)
            setError(null)
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'merged_data.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            // setMerged(response.data.merge_result)
            // setShowModal(true)
        } catch (error) {
            setLoading(false)
            if (error.response) {
                setError(`Server Error: ${error.response.data.error}`);
            } else if (error.request) {
                setError('Network Error: No response from server');
            } else {
                setError(`Request Error: ${error.message}`);
            }
        }
    };

    const gptName = "Merge Excel GPT";

    return (
        <div className="main-content" style={{height:'100vh', minHeight: "800px"}}>
            <h2 style={{ marginTop:'4%', textAlign: 'left', fontSize: '1.8vw' }}>Merge Excel GPT</h2>

           <div style={{ margin: '3%', fontSize: '1.2vw', color: '#333', maxHeight: '80vh', overflowY: 'auto' }}>
                {
                    chatHistory.map((message, index) => (
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
                    ))
                }
            </div>

            <div className="merge-options" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'auto', marginBottom: '20px' }}>
            {loading && (<div className="spinner"></div>)}
                <input
                    type="file"
                    id="file-input"
                    accept=".xlsx,.xls"
                    style={{ display: 'none' }}
                    multiple
                    onChange={handleFileChange}
                />
                <div style={{ display: 'flex', gap: '5%', width: '100%'}}>
                    <button
                        onClick={() => document.getElementById('file-input').click()}
                        className='uploadButton'
                    >
                        I want to merge 2 files with same structure
                    </button>
                    <button
                        onClick={() => document.getElementById('file-input').click()}
                        className='uploadButton'
                    >
                        I want to merge 2 files with different structure
                    </button>
                    <button
                        onClick={() => document.getElementById('file-input').click()}
                        className='uploadButton'
                    >
                        I want a complex merge (I'll help you!)
                    </button>
                </div>                
            </div>


            {error && <div className="error-message" style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</div>}
            
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

            <Footer />
        </div>
    );
}

export default MergeExcelGPT;
