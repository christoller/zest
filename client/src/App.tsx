import './App.css';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { SignUp } from './components/Signup';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { About } from './components/About';
import { Home } from './components/Home';
import { Logout } from './components/Logout';
import { Recipes } from './components/Recipes';
import { Pantry } from './components/Pantry';
import { Help } from './components/Help';
import { useState } from 'react';
import { vertifySession } from './functions/vertifySession';
import axios from 'axios';

function App() {
    const [auth, setAuth] = useState<boolean>();
    const [sessionData, setSessionData] = useState();

    axios.get('/api/sessions').then((response: any) => {
        if (response.data == localStorage.getItem('user_id')) {
            setAuth(true);
            setSessionData(response.data);
        } else {
            setAuth(false);
        }
    });

    return (
        <div className='App'>
            <Header auth={auth} />
            <BrowserRouter>
                <nav className='nav-bar'>
                    <ul className='nav-bar-list'>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/about'>About</Link>
                        </li>
                        {auth ? (
                            <div className='nav-links'>
                                <li>
                                    <Link to='/recipes'>Recipes</Link>
                                </li>
                                <li>
                                    <Link to='/pantry'>Pantry</Link>
                                </li>
                                <li>
                                    <Link to='/help'>Help</Link>
                                </li>
                                <li>
                                    <Link to='/logout'>Logout</Link>
                                </li>
                            </div>
                        ) : (
                            <div className='nav-links'>
                                <li>
                                    <Link to='/login'>Login</Link>
                                </li>

                                <li>
                                    <Link to='/signup'>Signup</Link>
                                </li>
                            </div>
                        )}
                    </ul>
                </nav>

                <Routes>
                    <Route path='/' element={<Home />} />
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
                    <Route
                        path='recipes'
                        element={
                            <Recipes
                                auth={auth}
                                setAuth={setAuth}
                                sessionData={sessionData}
                            />
                        }
                    />
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
