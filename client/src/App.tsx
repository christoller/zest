import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/sessions/Login';
import { SignUp } from './components/sessions/Signup';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Logout } from './components/sessions/Logout';
import { Recipes } from './components/recipes/Recipes';
import { Pantry } from './components/pantry/Pantry';
import { Help } from './components/Help';
import { useState } from 'react';
import axios from 'axios';
import { Dashboard } from './components/Dashboard';
import { PageNotFound } from './components/PageNotFound';

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
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route
                        path='dashboard'
                        element={<Dashboard auth={auth} />}
                    />
                    <Route
                        path='logout'
                        element={<Logout setAuth={setAuth} />}
                    />
                    <Route path='login' element={<Login setAuth={setAuth} />} />
                    <Route path='signup' element={<SignUp />} />
                    <Route path='recipes' element={<Recipes auth={auth} />} />
                    <Route path='pantry' element={<Pantry auth={auth} />} />
                    <Route path='help' element={<Help />} />
                    <Route path='*' element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    );
}

export default App;
