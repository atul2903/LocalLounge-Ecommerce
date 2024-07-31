import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Toaster} from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/auth';
const Layout = ({ children }) => {
    const [auth,setAuth]=useAuth();
    return (
        <div>

           
            <Header />
           
            <main style={{ minHeight: '70vh' }}>
         
                {children}
                </main>
            <Footer />
        </div>
    )
}

export default Layout