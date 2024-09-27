import React, { Component } from 'react';
import Home from './Home';
import Category from './Category';
import Expense from './Expense';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

class App extends Component {
    state = {  } 
    render() { 
        return (
            <Router>
                <Routes>
                    <Route path="/" element = {<Home/>} />
                    <Route path="/categories" element = {<Category/>} />
                    <Route path="/expenses" element = {<Expense/>} />
                </Routes>
            </Router>
        );
    }
}
 
export default App;