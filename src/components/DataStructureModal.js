import React, { useState } from 'react';
import Modal from 'react-modal';

// Modal styles
const customStyles = {
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '70%'
    }
};

Modal.setAppElement('#root');

const DataStructureModal = () => {
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <button
                style={{
                    height: '100px',
                    borderRadius: '10px',
                    width: '100%',
                    maxWidth: '350px',
                    fontSize: 'larger',
                    border: 'none'
                }}
                onClick={openModal}
            >
                I want to know what data structure to upload
            </button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Data Structure Modal"
            >
                <div style={{ width: '45%' }}>
                    <h3>Example Data Format</h3>
                    <table border="1" cellPadding="10" style={{ width: '100%' }}>
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

                <div style={{ width: '45%', paddingLeft: '20px' }}>
                    <h3>Data Structure Guidelines</h3>
                    <p>A typical data structure for cohort analysis in SaaS might include:</p>
                    <ul>
                        <li>User IDs (or customer identifiers)</li>
                        <li>Sign-up date (or other event dates like first purchase)</li>
                        <li>Activity data (like retention metrics or usage over time)</li>
                        <li>Product plans or tiers (if applicable)</li>
                    </ul>
                    <p>
                        The AI agent would provide guidance on how to organize the data (e.g., CSV, Excel File) and ensure all necessary columns for the analysis are included.
                    </p>
                </div>

                <button
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: '#8F6495',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                    onClick={closeModal}
                >
                    Close
                </button>
            </Modal>
        </div>
    );
};

export default DataStructureModal;
