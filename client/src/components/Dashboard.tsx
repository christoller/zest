import { Button, styled } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getUsername } from '../functions/getUsername';

const StyledButton = styled(Button)(({ theme, color = 'primary' }) => ({
    backgroundColor: 'rgb(101 163 13)',
    fontFamily: 'Roboto Mono, Monospace',
    ':hover': {
        backgroundColor: 'rgb(132 204 22)',
    },
}));

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
            <div className='bg-white md:w-3/4 lg:w-8/12 mx-auto p-10 mt-5 rounded-xl shadow-2xl shadow-black font-roboto'>
                <h1 className='text-5xl font-bold'>Dashboard</h1>
                <p className='sm:w-4/5 sm:text-md mx-auto mt-4 text-lg font-bold'>
                    Hello {getUsername()}! Welcome to your very own dashboard!
                    Right now there are only links to the various sections of
                    the app, but soon there will be many more features being
                    added here so watch this space!
                </p>
                <div className='flex justify-center gap-4 mt-5'>
                    <div className='text-left w-auto border-2 border-solid border-lime-500 rounded-lg p-4 bg-lime-100'>
                        <h2 className='font-bold text-xl'>Recipes</h2>
                        <p className='my-3'>
                            You currently have {recipeCount} recipes in your
                            collection.
                        </p>
                        <StyledButton
                            variant='contained'
                            onClick={() => navigate('/recipes')}>
                            Go To Recipes
                        </StyledButton>
                    </div>
                    <div className='text-left w-auto border-2 border-solid border-lime-500 rounded-lg p-4 bg-lime-100'>
                        <h2 className='font-bold text-xl '>Pantry</h2>
                        <p className='my-3'>
                            You currently have {pantryCount} ingredients in your
                            collection.
                        </p>
                        <StyledButton
                            variant='contained'
                            onClick={() => navigate('/pantry')}>
                            Go To Pantry
                        </StyledButton>
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
