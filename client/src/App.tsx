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
import { Dashboard } from './components/Dashboard';
import { PageNotFound } from './components/PageNotFound';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route
                        path='dashboard'
                        element={<Dashboard  />}
                    />
                    <Route
                        path='logout'
                        element={<Logout />}
                    />
                    <Route path='login' element={<Login />} />
                    <Route path='signup' element={<SignUp />} />
                    <Route path='recipes' element={<Recipes />} />
                    <Route path='pantry' element={<Pantry />} />
                    <Route path='help' element={<Help />} />
                    <Route path='*' element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    );
}

export default App;
