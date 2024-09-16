import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as MyIcon } from '../assets/icons/1.svg';
import { ReactComponent as ChartIcon } from '../assets/icons/chart-simple-solid.svg';
import { ReactComponent as ListIcon } from '../assets/icons/rectangle-list-solid.svg';
import { ReactComponent as MixedChartIcon } from '../assets/icons/flowbite--chart-mixed-outline.svg';
import { ReactComponent as CircleIcon } from '../assets/icons/mynaui--dots-circle.svg';

function Sidebar() {
    return (
        <div className="sidebar" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            height: '100vh', 
            fontFamily: 'Arial, sans-serif', 
            padding: '10px', 
            boxSizing: 'border-box' 
        }}>
            <div>
                <h2 style={{ 
                    marginTop: '60px', 
                    marginLeft: '20px', 
                    marginBottom: '20px', 
                    color: '#333',
                    textAlign: 'center'
                }}>
                    FinanceAgents
                </h2>
                <ul style={{ 
                    marginTop: '50px', 
                    listStyleType: 'none', 
                    paddingLeft: '0', 
                    fontSize: 'larger', 
                    lineHeight: '1.8em', 
                    paddingInlineStart: '30px' 
                }}>
                    <li className='sidebar-li'>
                        <MyIcon width="20" height="20" style={{ marginRight: '10px' }} />
                        <Link to="/merge-excel" style={{textDecoration:'none'}}>Merge Excel GPT</Link>
                    </li>
                    <li className='sidebar-li'>
                        <ChartIcon width="20" height="20" style={{ marginRight: '10px' }} />
                        <Link to="/insights" style={{textDecoration:'none'}}>Insights GPT</Link>
                    </li>
                    <li className='sidebar-li'>
                        <ListIcon width="20" height="20" style={{ marginRight: '10px' }} />
                        <Link to="/data-cleaning" style={{textDecoration:'none'}}>Data Cleaning GPT</Link>
                    </li>
                    <li className='sidebar-li'>
                        <MixedChartIcon width="20" height="20" style={{ marginRight: '10px' }} />
                        <Link to="/cohort-analysis" style={{textDecoration:'none'}}>Cohort Analysis GPT</Link>
                    </li>
                    <li className='sidebar-li'>
                        <CircleIcon width="20" height="20" style={{ marginRight: '10px' }} />
                        <Link to="/outliers" style={{textDecoration:'none'}}>Outliers GPT</Link>
                    </li>
                </ul>
            </div>
            <div
                style={{
                    marginTop: 'auto',
                    textAlign: 'center',
                    padding: '15px',
                    backgroundColor: '#ba99e3',
                    borderRadius: '10px',
                    maxWidth: '300px',
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: '40px',
                    marginRight: '40px',
                    marginBottom: '30px'
                }}
            >
                <div style={{ width: '100%', textAlign: 'left' }}>
                    <p style={{ fontSize: '1.2em', marginBottom: '10px', lineHeight: '1.5em' }}>
                        Upgrade to<br />
                        <span style={{ display: 'block', marginTop: '10px' }}>
                            <strong>FINANCE GPT<br /> PRO</strong>
                        </span>
                    </p>
                    <p style={{ fontSize: '0.9em', lineHeight: '1.5em' }}>
                        Gain access to all our AI agents for FP&A.
                    </p>
                </div>
            </div>

        </div>
    );
}

export default Sidebar;
