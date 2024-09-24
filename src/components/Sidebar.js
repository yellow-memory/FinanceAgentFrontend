import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as MyIcon } from '../assets/icons/1.svg';
import { ReactComponent as ChartIcon } from '../assets/icons/chart-simple-solid.svg';
import { ReactComponent as ListIcon } from '../assets/icons/rectangle-list-solid.svg';
import { ReactComponent as MixedChartIcon } from '../assets/icons/flowbite--chart-mixed-outline.svg';
import { ReactComponent as CircleIcon } from '../assets/icons/mynaui--dots-circle.svg';
import { ReactComponent as StarIcon } from '../assets/icons/stars-color-icon.svg';

function Sidebar() {
    return (
        <div className="sidebar" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '800px'
        }}>
            <div>
                <h2 style={{ 
                    margin: '10%',
                    color: '#333',
                    textAlign: 'center',
                    fontSize: '1.8vw'
                }}>
                    FinanceAgents
                </h2>
                <ul style={{ 
                    marginTop: '3%', 
                    listStyleType: 'none', 
                    lineHeight: '2.5em', 
                    paddingInlineStart: '15%' 
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
                    padding: '10%',
                    backgroundColor: '#ba99e3',
                    borderRadius: '10px',
                    width: '75%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginBottom: '5%'
                }}
            >
                <StarIcon width="2vw" height="2vw" style={{ marginBottom: '10px' }} />
                <p style={{ fontSize: '1.2vw', marginBottom: '10px', lineHeight: '1.5em' }}>
                    Upgrade to<br />
                    <span style={{ display: 'block', marginTop: '10px' }}>
                        <strong>FINANCE GPT<br></br> PRO</strong>
                    </span>
                </p>
                <p style={{ fontSize: '0.9vw', lineHeight: '1.5em' }}>
                    Gain access to all our AI agents for FP&A.
                </p>
            </div>

        </div>
    );
}

export default Sidebar;
