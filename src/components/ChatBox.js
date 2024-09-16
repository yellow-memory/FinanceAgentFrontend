import React from 'react';

function ChatBox() {
    return (
        <div style={{ marginTop: '10px', width: '100%', maxWidth: '1200px', display: 'flex', justifyContent: 'center', marginLeft:'auto', marginRight:'auto'}}>
            <button
                style={{
                    height: '100px',
                    borderRadius: '10px',
                    width: '100%',
                    fontSize: 'larger',
                    border: 'none',
                    textAlign: 'left',
                    paddingLeft: '40px',
                    backgroundColor: '#d9d9d9'
                }}
            >
                Chat with Merge Excel GPT
            </button>
        </div>
    );
}

export default ChatBox;
