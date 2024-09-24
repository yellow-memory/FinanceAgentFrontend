import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MergeExcelGPT from './pages/MergeExcelGPT';
import InsightsGPT from './pages/InsightsGPT';
import DataCleaningGPT from './pages/DataCleaningGPT';
import CohortAnalysisGPT from './pages/CohortAnalysisGPT';
import OutliersGPT from './pages/OutliersGPT';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flex: 1, paddingLeft: "30px", paddingRight: "30px"}}>
                    <Routes>
                        <Route path="/merge-excel" element={<MergeExcelGPT />} />
                        <Route path="/insights" element={<InsightsGPT />} />
                        <Route path="/data-cleaning" element={<DataCleaningGPT />} />
                        <Route path="/cohort-analysis" element={<CohortAnalysisGPT />} />
                        <Route path="/outliers" element={<OutliersGPT />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
