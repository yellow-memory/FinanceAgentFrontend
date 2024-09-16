import React, { useState } from 'react';
import axios from 'axios';
import ChatBox from '../components/ChatBox';
import Footer from '../components/Footer';
import { Modal, Button } from 'react-bootstrap';

// Modal styles
const customStyles = {
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start', // Align items to the top
        padding: '20px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '80%',
        boxSizing: 'border-box',
        position: 'relative' // To position the close button inside content
    }
};

function CohortAnalysisGPT() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cohort, setCohort] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showExampleModal, setShowExampleModal] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('file', file);
    
        try {
            setLoading(true);
            const response = await axios.post('http://127.0.0.1:5000/cohort-analysis', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            
            setCohort(response.data.cohort_result);
            console.log("This is cohort result\n", response.data.cohort_result);
            setError(null);
            setLoading(false);
            setShowModal(true);
        } catch (error) {
            setLoading(false);
            if (error.response) {
                setError(`Server Error: ${error.response.data.error}`);
            } else if (error.request) {
                setError('Network Error: No response from server');
            } else {
                setError(`Request Error: ${error.message}`);
            }
        }    
        e.target.value = null;
    };

    const downloadResult = (result) => {
        const element = document.createElement("a");
        const file = new Blob([result], { type: 'text/plain' });
    
        element.href = URL.createObjectURL(file);
        element.download = "cohort_result.txt";
        document.body.appendChild(element); 
        element.click(); 
        document.body.removeChild(element);
    };

    return (
        <div className="main-content" style={{ height: '100vh' }}>
            <h1 style={{ margin: '70px 50px 0 50px', textAlign: 'left' }}>Cohort Analysis GPT</h1>
            {/* {(image && <img src={image} alt="Cohort Analysis Result" style={{ width: '100%', maxHeight: '50vh', objectFit: 'contain' }} />)} */}

            <div className="merge-options" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'auto', marginBottom: '20px' }}>
            {loading ? (
                    <div className="spinner"></div>
                ) : (
                    cohort && (
                        <Modal show={showModal} onHide={() => setShowModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Cohort Analysis Result</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <pre className='insights-modal'>{cohort}</pre>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={() => downloadResult(cohort)}>
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
                    id="file-input"
                    accept=".xlsx,.xls"
                    style={{ display: 'none' }}
                    multiple
                    onChange={handleFileChange}
                />
                <div style={{ display: 'flex', gap: '80px', width: '100%', maxWidth: '1200px' }}>
                    <button
                        onClick={() => setShowExampleModal(true)}
                        style={{
                            height: '100px',
                            borderRadius: '10px',
                            width: '100%',
                            maxWidth: '350px',
                            fontSize: 'larger',
                            border: 'none',
                        }}
                    >
                        I want to know what data structure to upload
                    </button>
                    <button
                        onClick={() => {
                            document.getElementById('file-input').click();
                        }}
                        style={{
                            height: '100px',
                            borderRadius: '10px',
                            width: '100%',
                            maxWidth: '350px',
                            fontSize: 'larger',
                            border: 'none',
                        }}
                    >
                        I want a quick cohort analysis on variable...
                    </button>
                    <button
                        onClick={() => document.getElementById('file-input').click()}
                        style={{
                            height: '100px',
                            borderRadius: '10px',
                            width: '100%',
                            maxWidth: '350px',
                            fontSize: 'larger',
                            border: 'none',
                        }}
                    >
                        I want a complex merge (I'll help you!)
                    </button>
                </div>
            </div>

            {error && <div className="error-message" style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</div>}
            <ChatBox />
            <Footer />

            {/* Modal */}
            <Modal
                show={showExampleModal} 
                onHide={() => setShowExampleModal(false)}
                style={customStyles}
                contentLabel="Data Structure Modal"
            >
                {/* Close Button */}
                <button
                    onClick={() => setShowExampleModal(false)}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'none',
                        border: 'none',
                        fontSize: '24px'
                    }}
                >
                    X
                </button>

                <div style={{ width: '90%', overflowY: 'auto', margin: 'auto', paddingTop: '50px ' }}>
                    <h3>Example Format</h3>
                    <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Signup Date</th>
                                <th>Last Active Date</th>
                                <th>Usage Days</th>
                                <th>Product Plan</th>
                                <th>Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>001</td>
                                <td>2023-01-01</td>
                                <td>2023-03-15</td>
                                <td>74</td>
                                <td>Premium</td>
                                <td>120</td>
                            </tr>
                            <tr>
                                <td>002</td>
                                <td>2023-02-10</td>
                                <td>2023-03-12</td>
                                <td>30</td>
                                <td>Free</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>003</td>
                                <td>2023-01-20</td>
                                <td>2023-03-11</td>
                                <td>51</td>
                                <td>Pro</td>
                                <td>200</td>
                            </tr>
                            <tr>
                                <td>004</td>
                                <td>2023-03-01</td>
                                <td>2023-03-15</td>
                                <td>15</td>
                                <td>Free</td>
                                <td>0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div style={{ width: '90%', paddingLeft: '20px', overflowY: 'auto', margin: 'auto', paddingTop: '30px' }}>
                    <h3>Data Structure Guidelines</h3>
                    <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                        <p>
                            For cohort analysis in SaaS or similar use cases, the dataset typically follows a structured format that captures user activities, especially over time.
                            Here are key points for the dataset:
                        </p>
                        <ul>
                            <li><strong>User ID:</strong> Unique identifier for each user.</li>
                            <li><strong>Signup Date:</strong> Date when the user first signed up.</li>
                            <li><strong>Last Active Date:</strong> Date of the most recent activity by the user.</li>
                            <li><strong>Usage Days:</strong> Total days the user was active.</li>
                            <li><strong>Product Plan:</strong> The subscription plan or product tier the user is on.</li>
                            <li><strong>Revenue:</strong> Total revenue generated from the user.</li>
                        </ul>
                        <p>
                            Make sure the data is clean and the dates are in a consistent format (e.g., YYYY-MM-DD). Ensure all required fields are present for accurate analysis.
                        </p>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default CohortAnalysisGPT;
