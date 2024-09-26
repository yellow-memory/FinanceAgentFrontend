import React from 'react';
import { Button } from 'react-bootstrap';

function ChatBox({gptName}) {

    return (
        <div style={{ marginTop: '10px', width: '100%', display: 'flex', justifyContent: 'center'}}>
            <Button
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
            </Button>
        </div>
    );
}

export default ChatBox;
