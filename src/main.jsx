import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css'
import Home from './pages/Home.jsx'
import Map from './components/Map.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import VerificationPage from './pages/VerificationPage.jsx'
import LanguageSelect from './pages/LanguageSelect.jsx'
import SelectPort from './pages/SelectPort.jsx'
import Confirmation from './pages/Confirmation.jsx'
import QuotePage from './pages/QuotePage.jsx'
import LoginPage from './pages/Login.jsx'
import DrawerAppBar from './components/DrawerAppBar.jsx'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='*' element={<LoginPage />} />
                 <Route path='/home' element={<Home />} />
                <Route path='/register' element={<RegisterPage  />} />
                <Route path='/register/language' element={<LanguageSelect />} />
                <Route path='/register/port' element={<SelectPort />} />
                <Route path='/confirm' element={<Confirmation />} />
                <Route path='/verify' element={<VerificationPage />} />
                <Route path='/map' element={<Map />} />
                <Route path='/quote' element={<QuotePage />} />
                <Route path='/login' element={<LoginPage />} />

            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
