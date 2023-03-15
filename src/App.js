import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import Creator from './pages/Creator';

import Header from './components/Header';
import { Web3Provider } from '@ethersproject/providers'


export const App = () => {
    return (
       
           
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Creator />} />
                        
                    </Routes>
                </Router>
            
        
    )
}