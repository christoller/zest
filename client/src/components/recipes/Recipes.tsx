import {
    Box,
    Button,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { loggedIn } from '../../functions/loggedIn';
import { CreateRecipe } from './CreateRecipe';
import { DisplayRecipe } from './DisplayRecipe';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '85%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const createRecipeStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    width: '55%',
    margin: '0 auto',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    px: 4,
};

export function Recipes(props: any) {
    const [open, setOpen] = useState(false);
    const [openRecipe, setOpenRecipe] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState('');
    const [recipeList, setRecipeList] = useState([
        {
            recipeName: 'No Recipes Yet :(',
        },
    ]);
    const [isLoading, setLoading] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenRecipe = () => setOpenRecipe(true);
    const handleCloseRecipe = () => setOpenRecipe(false);
    const id = localStorage.getItem('user_id');
    const navigate = useNavigate();

    useEffect(() => {
        loggedIn();
        if (id) {
            axios.get(`/api/recipes/${id}`).then((response) => {
                setRecipeList(response.data);
                setLoading(false);
            });
        } else {
            navigate('/login');
        }
    }, [open, id]);

    const handleDelete = (e: any) => {
        loggedIn();
        const recipeToDelete = {
            recipeName: e.target.getAttribute('recipe-key'),
        };
        if (id) {
            axios
                .patch(`/api/recipes/${id}/delete`, recipeToDelete)
                .catch((error) => {
                    console.log(error);
                });
        } else {
            navigate('/login');
        }
        window.location.reload();
    };

    if (isLoading && id) {
        return <div className='App'>Loading...</div>;
    }
    if (id) {
        return (
            <div className='bg-white sm:w-4/5 lg:w-8/12 mt-5 mx-auto p-10 rounded-xl shadow-2xl shadow-black'>
                <h1 className='text-5xl font-bold'>Recipes</h1>
                <Button
                    onClick={handleOpen}
                    sx={{
                        mx: 'auto',
                        mt: 2,
                        fontWeight: 600,
                        color: 'rgb(101 163 13)',
                        fontSize: '1rem',
                    }}>
                    Create Recipe
                </Button>
                <TableContainer component={Paper}>
                    <Table
                        sx={{
                            minWidth: 350,
                            maxWidth: '80vw',
                        }}
                        aria-label='simple table'>
                        <TableBody>
                            {recipeList.map((recipe: any, index: number) => {
                                return (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                {
                                                    border: 0,
                                                },
                                        }}>
                                        <TableCell component='th' scope='row'>
                                            <Button
                                                variant='text'
                                                sx={{
                                                    fontWeight: 600,
                                                    color: 'rgb(101 163 13)',
                                                    fontSize: '1rem',
                                                }}
                                                onClick={() => {
                                                    handleOpenRecipe();
                                                    setSelectedRecipe(
                                                        recipe.recipeName
                                                    );
                                                }}>
                                                {recipe.recipeName}
                                            </Button>
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell align='right'>
                                            <Button
                                                recipe-key={recipe.recipeName}
                                                sx={{
                                                    fontSize: '1rem',
                                                    fontWeight: 600,
                                                    color: 'rgb(101 163 13)',
                                                }}
                                                onClick={handleDelete}>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'>
                    <Box sx={createRecipeStyle}>
                        <CreateRecipe setOpen={setOpen} />
                    </Box>
                </Modal>
                <Modal
                    open={openRecipe}
                    onClose={handleCloseRecipe}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'>
                    <Box sx={style}>
                        <DisplayRecipe
                            recipeList={recipeList}
                            selectedRecipe={selectedRecipe}
                            setOpen={setOpenRecipe}
                        />
                    </Box>
                </Modal>
            </div>
        );
    }
    return <Navigate to='/login' replace />;
}
