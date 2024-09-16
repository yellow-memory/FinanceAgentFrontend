
import React from 'react';

function Footer() {
    return (
        <footer 
            style={{
                marginTop: '10px',
                width: '100%', 
                maxWidth: '1200px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginLeft: 'auto', 
                marginRight: 'auto', 
                marginBottom: '10px'
        }}>
            <span>Data Privacy</span>
            <span>AI Disclaimer</span>
        </footer>
    );
}

export default Footer;
