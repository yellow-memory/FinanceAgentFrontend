import React, { useState } from 'react';
import axios from 'axios';

function MainContent() {
    const [error, setError] = useState(null);

    const handleFileChange = async (e) => {
        const files = e.target.files;
        if (files.length < 2) {
            alert('Please select two files to merge.');
            return;
        }
        await handleFileUpload(files);
    };

    const handleFileUpload = async (files) => {
        const formData = new FormData();
        formData.append('file1', files[0]);
        formData.append('file2', files[1]);

        try {
            const response = await axios.post('http://127.0.0.1:5000/merge-excel', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'merged.xlsx');
            document.body.appendChild(link);
            link.click();
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

    return (
        <div className="main-content" style={{ padding: '20px' }}>
            <h2 style={{ margin: '20px 50px 0 50px', textAlign: 'left' }}>Merge Excel GPT</h2>

            <div className="merge-options" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'auto', marginBottom: '20px' }}>
                <input
                    type="file"
                    id="file-input"
                    accept=".xlsx,.xls"
                    style={{ display: 'none' }}
                    multiple
                    onChange={handleFileChange}
                />
                <div style={{ display: 'flex', gap: '80px', width: '100%', maxWidth: '900px' }}>
                    <button
                        onClick={() => document.getElementById('file-input').click()}
                        style={{
                            height: '100px',
                            borderRadius: '10px',
                            width: '100%',
                            maxWidth: '350px',
                            fontSize: 'larger',
                            border: 'none'
                        }}
                    >
                        I want to merge 2 files with same structure
                    </button>
                    <button
                        style={{
                            height: '100px',
                            borderRadius: '10px',
                            width: '100%',
                            maxWidth: '350px',
                            fontSize: 'larger',
                            border: 'none'
                        }}
                    >
                        I want to merge 2 files with different structure
                    </button>
                    <button
                        style={{
                            height: '100px',
                            borderRadius: '10px',
                            width: '100%',
                            maxWidth: '350px',
                            fontSize: 'larger',
                            border: 'none'
                        }}
                    >
                        I want a complex merge (I'll help you!)
                    </button>
                </div>
                <div style={{ marginTop: '30px', width: '100%', maxWidth: '900px', display: 'flex', justifyContent: 'center' }}>
                    <button
                        style={{
                            height: '100px',
                            borderRadius: '10px',
                            width: '100%',
                            maxWidth: '900px',
                            fontSize: 'larger',
                            border: 'none'
                        }}
                    >
                        Chat with Merge Excel GPT
                    </button>
                </div>
            </div>


            {error && <div className="error-message" style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</div>}
            {/* <ChatBox /> */}
            <footer style={{ textAlign: 'center', marginTop: '20px' }}>Data Privacy</footer>
        </div>
    );
}

export default MainContent;
