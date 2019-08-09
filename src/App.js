import React from 'react';

import './styles/styles.scss';
import Header from './components/Header';
import TestList from './components/testList';
import Footer from './components/Footer';

function App() {
    return (
        <div className="App">
            <Header />
            <TestList />
            <Footer />
        </div>
    );
}

export default App;
