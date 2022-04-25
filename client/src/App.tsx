import './App.css';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { Login } from './components/sessions/Login';
import { SignUp } from './components/sessions/Signup';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { About } from './components/About';
import { Home } from './components/Home';
import { Logout } from './components/sessions/Logout';
import { Recipes } from './components/recipes/Recipes';
import { Pantry } from './components/pantry/Pantry';
import { Help } from './components/Help';
import { useState } from 'react';
import axios from 'axios';
import { NavBar } from './components/NavBar';
import { Dashboard } from './components/Dashboard';

function App() {
    const [auth, setAuth] = useState<boolean>();

    axios.get('/api/sessions').then((response: any) => {
        if (response.data === localStorage.getItem('user_id')) {
            setAuth(true);
        } else {
            setAuth(false);
        }
    });

    return (
        <div className='App'>
            <BrowserRouter>
                <Header auth={auth} />
                {/* <NavBar auth={auth} /> */}
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route
                        path='dashboard'
                        element={<Dashboard auth={auth} />}
                    />
                    <Route path='about' element={<About />} />
                    <Route
                        path='logout'
                        element={<Logout setAuth={setAuth} />}
                    />
                    <Route path='login' element={<Login setAuth={setAuth} />} />
                    <Route
                        path='signup'
                        element={<SignUp setAuth={setAuth} />}
                    />
                    <Route path='recipes' element={<Recipes auth={auth} />} />
                    <Route path='pantry' element={<Pantry auth={auth} />} />
                    <Route path='help' element={<Help />} />
                    <Route path='*' element={<p>404 Page not found</p>} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    );
}

export default App;
