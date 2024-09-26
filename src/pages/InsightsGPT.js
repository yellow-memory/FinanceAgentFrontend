import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';

function InsightsGPT() {
    const [error, setError] = useState(null);
    const [insights, setInsights] = useState(null)
    const [showModal, setShowModal] = useState(false)
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

    const handleInsightsFileChange = async (e) => {
        const file = e.target.files[0];
        console.log(file)

        const formData = new FormData();
        formData.append('file', file);

        try {
            setLoading(true)
            const response = await axios.post('https://testagent1-eb208e96c27e.herokuapp.com/sales-insights', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false)
            setError(null)

            setInsights(response.data.insights);
            setShowModal(true);  // Show modal when we get the insights
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

    const handleKPIFileChange = async (e) => {
        const file = e.target.files[0];
        console.log(file)

        const formData = new FormData();
        formData.append('file', file);

        try {
            setLoading(true)
            const response = await axios.post('https://testagent1-eb208e96c27e.herokuapp.com/sales-kpis', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false)
            setError(null)

            setInsights(response.data.kpis);
            setShowModal(true);  // Show modal when we get the insights
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

    const handleKeydriversFileChange = async (e) => {
        const file = e.target.files[0];
        console.log(file)

        const formData = new FormData();
        formData.append('file', file);

        try {
            setLoading(true)
            const response = await axios.post('https://testagent1-eb208e96c27e.herokuapp.com/sales-keydrivers', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false)
            setError(null)

            setInsights(response.data.key_drivers);
            setShowModal(true);  // Show modal when we get the insights
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
        const element = document.createElement("a");
        const file = new Blob([result], { type: 'text/plain' });
    
        element.href = URL.createObjectURL(file);
        element.download = "insight_result.txt";
        document.body.appendChild(element); 
        element.click(); 
        document.body.removeChild(element);
    };

    const gptName = "Insights GPT"

    return (
        <div className="main-content" style={{height:'100vh', minHeight: "800px"}}>
            <h2 style={{ marginTop:'4%', textAlign: 'left', fontSize: '1.8vw' }}>Insights GPT</h2>

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
                    insights && (
                        <Modal show={showModal} onHide={() => setShowModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Sales Insights</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <pre className='insights-modal'>{insights}</pre> {/* Display the insights as text */}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={() => downloadResult(insights)}>
                                    Download Result
                                </Button>
                                <Button variant="secondary" onClick={() => setShowModal(false)}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    )
                )}
                <input
                    type="file"
                    id="insights-input"
                    accept=".xlsx,.xls"
                    style={{ display: 'none' }}
                    multiple
                    onChange={handleInsightsFileChange}
                />
                <input
                    type="file"
                    id="kpi-input"
                    accept=".xlsx,.xls"
                    style={{ display: 'none' }}
                    multiple
                    onChange={handleKPIFileChange}
                />
                <input
                    type="file"
                    id="keydrivers-input"
                    accept=".xlsx,.xls"
                    style={{ display: 'none' }}
                    multiple
                    onChange={handleKeydriversFileChange}
                />
                 
                <div style={{ display: 'flex', gap: '5%', width: '100%'}}>
                    <button
                        onClick={() => document.getElementById('insights-input').click()}
                        className='uploadButton'
                    >
                        I have a dataset of
                        customer purchase
                        patterns, Give me the
                        most frequent purchase
                        behaviors.
                    </button>
                    <button
                        onClick={() => document.getElementById('kpi-input').click()}
                        className='uploadButton'
                    >
                        What are the top KPIs I
                        should focus on from my
                        sales data?
                    </button>
                    <button
                        onClick={() => document.getElementById('keydrivers-input').click()}
                        className='uploadButton'
                    >
                        Identify the key drivers
                        behind my company's
                        revenue growth in the
                        past quarter
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

export default InsightsGPT;
