import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from 'xlsx';
import ChatBox from '../components/ChatBox';
import ChatHistory from '../components/ChatHistory';

function DataCleaningGPT() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [cleanedData, setCleanedData] = useState(null)
    const [chatHistory, setChatHistory] = useState([])

    const handleChatUpdate = (newChatHistory, newError) => {
        setChatHistory(newChatHistory)
        setError(newError)
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        console.log(file)

        if (!file) return;  // If no file is selected, do nothing

        try {
            setLoading(true)
            const response = await axios.post('https://testagent1-eb208e96c27e.herokuapp.com/clean-dataset', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLoading(false)
            setError(null)

            setCleanedData(response.data.cleaned_data)
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
        XLSX.utils.book_append_sheet(wb, ws, 'Merged Data');
        XLSX.writeFile(wb, '/merge_result.xlsx'); 
    };

    const gptName = "Data Cleaning GPT";

    return (
        <div className="main-content" style={{height:'100vh', minHeight: "800px"}}>
            <h2 style={{ marginTop:'4%', textAlign: 'left', fontSize: '1.8vw' }}>Data Cleaning GPT</h2>

            <ChatHistory chatHistory={chatHistory}/>

            <div className="merge-options" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'auto', marginBottom: '20px' }}>
            {loading ? (
                    <div className="spinner"></div>
                ) : (
                    cleanedData && (
                        <Modal show={showModal} onHide={() => setShowModal(false)}>
                            <Modal.Dialog style={{ maxWidth: '90%' }}> {/* Adjust modal width */}
                                <Modal.Header closeButton style={{ width: '100%' }}>
                                    <Modal.Title>Merge Result</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                {cleanedData.split('\n')[0].split('|').slice(1, -1).map((header, index) => (
                                                    <th key={index} style={{ whiteSpace: 'nowrap', padding: '8px' }}>
                                                        {header.trim()}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cleanedData
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
                                    <Button variant="primary" onClick={() => downloadResult(cleanedData)}>
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
                        Clean this Excel dataset
                    </button>
                    <button
                        onClick={() => document.getElementById('file-input').click()}
                        className='uploadButton'
                    >
                        I have missing values and
                        duplicate entries in my
                        sales data. Fix it.
                    </button>
                    <button
                        onClick={() => document.getElementById('file-input').click()}
                        className='uploadButton'
                    >
                        My dataset has
                        inconsistent date
                        formats and string
                        mismatches. Help me
                    </button>
                </div>                
            </div>


            {error && <div className="error-message" style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</div>}
            
            <ChatBox
                gptName={gptName}
                onChatUpdate={handleChatUpdate}
            />

            <Footer />
        </div>
    );
}

export default DataCleaningGPT;
