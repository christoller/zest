import './App.css';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { SignUp } from './components/Signup';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { About } from './components/About';
import { Home } from './components/Home';
import { LoggedIn } from './loggedIn';
import { Logout } from './components/Logout';
import { Recipes } from './components/Recipes';
import { Pantry } from './components/Pantry';
import { Help } from './components/Help';

function App() {
    return (
        <div className='App'>
            <Header />
            <BrowserRouter>
                <nav className='nav-bar'>
                    <ul className='nav-bar-list'>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/about'>About</Link>
                        </li>
                        {LoggedIn() ? (
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
                    <Route path='logout' element={<Logout />} />
                    <Route path='login' element={<Login />} />
                    <Route path='signup' element={<SignUp />} />
                    <Route path='recipes' element={<Recipes />} />
                    <Route path='pantry' element={<Pantry />} />
                    <Route path='help' element={<Help />} />
                    <Route path='*' element={<p>404 Page not found</p>} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    );
}

export default App;
