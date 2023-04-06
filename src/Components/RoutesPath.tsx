import { Component } from "react";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Home from "./Home";
import NavBar from './Navbar';
import SendRawTransactions from "./SendRawTransactions";
import SmartContractExecute from "./SmartContractExecute";
import Contact from "./Contact";

export default class Header extends Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<NavBar />}>
                            <Route index element={<Home />} />
                            <Route path='SendRawTransactions' element={<SendRawTransactions />} />
                            <Route path='SmartContractExecute' element={<SmartContractExecute />} />
                            <Route path='Contact' element={<Contact />} />
                            <Route path='*' element={<Navigate replace to="/" />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
                
            </>
        )
    }
}