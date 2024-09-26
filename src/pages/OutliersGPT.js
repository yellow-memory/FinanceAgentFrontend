import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from 'xlsx';
import { Form } from 'react-bootstrap';

function OutliersGPT() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [outliers, setOutliers] = useState(null)
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
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        console.log(file)

        if (!file) return;  // If no file is selected, do nothing

        try {
            setLoading(true)
            const response = await axios.post('https://testagent1-eb208e96c27e.herokuapp.com/identify-outliers', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false)
            setError(null)

            setOutliers(response.data.outliers)
            console.log(typeof(response.data.outliers))
            setShowModal(true)
        } catch (error) {
            setLoading(false)
            if (error.response) {
                // Server responded with a status other than 2xx
                setError(`Server Error: ${error.response.data.error}`);
            } else if (error.request) {
                // Request was made but no response received
                setError('Network Error: No response from server');
            } else {
                // Something happened in setting up the request
                setError(`Request Error: ${error.message}`);
            }
        }
        e.target.value = null;
    };

    const downloadResult = (result) => {
        const rows = result
            .split('\n')
            .filter(row => row.trim()) 
            .map(row => row.split('|').slice(1, -1).map(col => col.trim())); 
    
        const ws = XLSX.utils.aoa_to_sheet(rows); 
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Outliers');
        XLSX.writeFile(wb, '/outliers_result.xlsx'); 
    };

    const gptName = "Outliers GPT";

    return (
        <div className="main-content" style={{height:'100vh', minHeight: "800px"}}>
            <h2 style={{ marginTop:'4%', textAlign: 'left', fontSize: '1.8vw' }}>Outliers GPT</h2>

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
                {loading ? (
                    <div className="spinner"></div>
                ) : (
                    outliers && (
                        <Modal show={showModal} onHide={() => setShowModal(false)}>
                            <Modal.Dialog style={{ maxWidth: '90%' }}> {/* Adjust modal width */}
                                <Modal.Header closeButton style={{ width: '100%' }}>
                                    <Modal.Title>Outliers</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                {outliers.split('\n')[0].split('|').slice(1, -1).map((header, index) => (
                                                    <th key={index} style={{ whiteSpace: 'nowrap', padding: '8px' }}>
                                                        {header.trim()}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {outliers
                                                .split('\n')
                                                .slice(2) // Skip header row
                                                .filter(row => row.trim()) // Filter out any empty rows
                                                .map((row, rowIndex) => {
                                                    const columns = row.split('|').slice(1, -1).map(column => column.trim());
                                                    return (
                                                        <tr key={rowIndex}>
                                                            {columns.map((col, colIndex) => (
                                                                <td key={colIndex} style={{ padding: '8px', textAlign: 'left' }}>
                                                                    {col}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                </Modal.Body>
                                <Modal.Footer style={{ width: '100%' }}>
                                    <Button variant="primary" onClick={() => downloadResult(outliers)}>
                                        Download Result
                                    </Button>
                                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal.Dialog>
                        </Modal>
                    )
                )}
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
                        Identify the outliers from this dataset
                    </button>
                    <button
                        onClick={() => document.getElementById('file-input').click()}
                        className='uploadButton'
                    >
                      I have transaction data. Flag unusual activities that don't match normal patterns
                    </button>
                    <button
                        className='uploadButton'
                    >
                     I need help using this AI Agent
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

export default OutliersGPT;
