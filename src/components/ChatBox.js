import React from 'react';

function ChatBox({gptName}) {
    return (
        <div style={{ marginTop: '10px', width: '100%', display: 'flex', justifyContent: 'center', marginLeft:'auto', marginRight:'auto'}}>
            <button
                style={{
                    height: '100px',
                    borderRadius: '10px',
                    width: '100%',
                    fontSize: '1.5vw',
                    border: 'none',
                    textAlign: 'left',
                    paddingLeft: '40px',
                    backgroundColor: '#d9d9d9'
                }}
            >
                Chat with {gptName}
            </button>
        </div>
    );
}

export default ChatBox;
