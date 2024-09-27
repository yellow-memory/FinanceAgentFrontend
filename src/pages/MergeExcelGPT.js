import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import ChatBox from '../components/ChatBox';
import ChatHistory from '../components/ChatHistory';

function MergeExcelGPT() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const [chatHistory, setChatHistory] = useState([])

    const handleChatUpdate = (newChatHistory, newError) => {
        setChatHistory(newChatHistory)
        setError(newError)
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

            <ChatHistory chatHistory={chatHistory}/>

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
            
            <ChatBox
                gptName={gptName}
                onChatUpdate={handleChatUpdate}
            />

            <Footer />
        </div>
    );
}

export default MergeExcelGPT;
