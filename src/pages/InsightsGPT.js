import React, { useState } from 'react';
import axios from 'axios';
import ChatBox from '../components/ChatBox';
import Footer from '../components/Footer';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            const response = await axios.post('https://testagent1-eb208e96c27e.herokuapp.com/sales-insights', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false)

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
            <ChatBox gptName={gptName}/>
            <Footer />
        </div>
    );
}

export default InsightsGPT;
