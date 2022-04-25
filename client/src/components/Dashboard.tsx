import { Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getUsername } from '../functions/getUsername';

export function Dashboard(props: any) {
    const id = localStorage.getItem('user_id');
    let [recipeCount, setRecipeCount] = useState(0);
    const [pantryCount, setPantryCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`/api/recipes/${id}`).then((response) => {
                setRecipeCount(response.data.length);
            });
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            axios.get(`/api/pantry/${id}`).then((response) => {
                setPantryCount(response.data.length);
            });
        }
    }, [id]);

    if (id) {
        return (
            <div className='bg-white md:w-3/4 lg:w-8/12 mx-auto p-10 rounded-xl shadow-2xl shadow-black'>
                <h1 className='text-5xl font-bold'>Dashboard</h1>
                <p className='sm:w-4/5 lg:w-6/12 mx-auto mt-4 font-bold'>
                    Hello {getUsername()}! Welcome to your very own dashboard!
                    Right now there are only links to the various sections of
                    the app, but soon there will be many more features being
                    added here so watch this space!
                </p>
                <div className='flex justify-center gap-4 mt-5'>
                    <div className='text-left w-auto border-2 border-solid border-lime-900 rounded-lg p-4 bg-green-50'>
                        <h2 className='font-bold '>Recipes</h2>
                        <p className='my-3'>
                            You currently have {recipeCount} recipes in your
                            collection.
                        </p>
                        <Button
                            variant='contained'
                            onClick={() => navigate('/recipes')}>
                            Go To Recipes
                        </Button>
                    </div>
                    <div className='text-left w-auto border-2 border-solid border-lime-900 rounded-lg p-4 bg-green-50'>
                        <h2 className='font-bold '>Pantry</h2>
                        <p className='my-3'>
                            You currently have {pantryCount} recipes in your
                            collection.
                        </p>
                        <Button
                            variant='contained'
                            onClick={() => navigate('/pantry')}>
                            Go To Pantry
                        </Button>
                    </div>
                </div>
                <div>
                    <h3 className='text-2xl mt-4 font-bold'>
                        Useful Resources
                    </h3>
                </div>
            </div>
        );
    }
    return <Navigate to='/login' replace />;
}
