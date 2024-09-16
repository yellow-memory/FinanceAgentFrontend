import React, { useState } from 'react';
import axios from 'axios';
import ChatBox from '../components/ChatBox';
import Footer from '../components/Footer';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from 'xlsx';

function InsightsGPT() {
    const [error, setError] = useState(null);
    const [insights, setInsights] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleInsightsFileChange = async (e) => {
        const file = e.target.files[0];
        console.log(file)

        const formData = new FormData();
        formData.append('file', file);

        try {
            setLoading(true)
            const response = await axios.post('http://127.0.0.1:5000/sales-insights', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false)

            setInsights(response.data.insights);
            setShowModal(true);  // Show modal when we get the insights
        } catch (error) {
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
    };

    const handleKPIFileChange = async (e) => {
        const file = e.target.files[0];
        console.log(file)

        const formData = new FormData();
        formData.append('file', file);

        try {
            setLoading(true)
            const response = await axios.post('http://127.0.0.1:5000/sales-kpis', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false)

            setInsights(response.data.kpis);
            setShowModal(true);  // Show modal when we get the insights
        } catch (error) {
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
            const response = await axios.post('http://127.0.0.1:5000/sales-keydrivers', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false)

            setInsights(response.data.key_drivers);
            setShowModal(true);  // Show modal when we get the insights
        } catch (error) {
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

    return (
        <div className="main-content" style={{height:'100vh'}}>
            <h1 style={{ margin: '70px 50px 0 50px', textAlign: 'left' }}>Insights GPT</h1>

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
                 
                <div style={{ display: 'flex', gap: '80px', width: '100%', maxWidth: '1200px' }}>
                    <button
                        onClick={() => document.getElementById('insights-input').click()}
                        style={{
                            height: '100px',
                            borderRadius: '10px',
                            width: '100%',
                            maxWidth: '350px',
                            fontSize: 'larger',
                            border: 'none'
                        }}
                    >
                        I have a dataset of
                        customer purchase
                        patterns, Give me the
                        most frequent purchase
                        behaviors.
                    </button>
                    <button
                        onClick={() => document.getElementById('kpi-input').click()}
                        style={{                            
                            height: '100px',
                            borderRadius: '10px',
                            width: '100%',
                            maxWidth: '350px',
                            fontSize: 'larger',
                            border: 'none'
                        }}
                    >
                        What are the top KPIs I
                        should focus on from my
                        sales data?
                    </button>
                    <button
                        onClick={() => document.getElementById('keydrivers-input').click()}
                        style={{
                            height: '100px',
                            borderRadius: '10px',
                            width: '100%',
                            maxWidth: '350px',
                            fontSize: 'larger',
                            border: 'none'
                        }}
                    >
                        Identify the key drivers
                        behind my company's
                        revenue growth in the
                        past quarter
                    </button>
                </div>                
            </div>


            {error && <div className="error-message" style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</div>}
            <ChatBox />
            <Footer />
        </div>
    );
}

export default InsightsGPT;
