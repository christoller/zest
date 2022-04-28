import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getUsername } from '../functions/getUsername';
import StyledButton from '../styles/styledButton';

export function Dashboard(props: any) {
    const id = localStorage.getItem('user_id');
    let [recipeCount, setRecipeCount] = useState(0);
    const [pantryCount, setPantryCount] = useState(0);
    const navigate = useNavigate();
    const resources = [
        {
            title: 'How to write recipes - BBC Good Food',
            url: 'https://www.bbcgoodfood.com/howto/guide/how-write-recipe',
        },
        {
            title: 'Managing Food Costs in Hospitality',
            url: 'https://blog.typsy.com/10-practical-tips-to-manage-food-costs-at-your-hospitality-business',
        },
        {
            title: 'Negotiating lower prices with your vendors',
            url: 'https://www.plateiq.com/blog/how-to-negotiate-lower-prices-with-your-vendors',
        },
        {
            title: 'Seasonal Food Guide - Australia',
            url: 'http://seasonalfoodguide.com/australia-general-seasonal-fresh-produce-guide-fruits-vegetables-in-season-availability.html',
        },
    ];

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
            <div className='bg-white md:w-3/4 lg:w-8/12 mx-auto p-10 mt-5 rounded-xl shadow-2xl shadow-black '>
                <h1 className='text-5xl font-bold'>Dashboard</h1>
                <p className='sm:w-4/5 sm:text-md mx-auto mt-4 text-lg font-bold'>
                    Hello {getUsername()}! Welcome to your dashboard!
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
                <div className='text-left w-auto rounded-lg py-4 px-12'>
                    <h3 className='text-2xl mt-4 font-bold'>
                        Useful Resources
                    </h3>
                    <ul>
                        {resources.map((resource) => (
                            <li>
                                <a
                                    href={resource.url}
                                    className='text-lime-700 hover:text-lime-500'>
                                    {resource.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
    return <Navigate to='/login' replace />;
}
