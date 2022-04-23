import {
    Box,
    Button,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateRecipe } from './CreateRecipe';
import { DisplayRecipe } from './DisplayRecipe';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export function Recipes(props: any) {
    const navigate = useNavigate();
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

    useEffect(() => {
        if (props.auth) {
            axios.get(`/api/recipes/${id}`).then((response) => {
                setRecipeList(response.data);
                setLoading(false);
            });
        } else {
            navigate('/login');
        }
    }, [open, recipeList, props.auth, id, navigate]);

    const handleDelete = (e: any) => {
        const recipeToDelete = {
            recipeName: e.target.getAttribute('recipe-key'),
        };

        axios
            .patch(`/api/recipes/${id}/delete`, recipeToDelete)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if (isLoading) {
        return <div className='App'>Loading...</div>;
    }

    return (
        <div className='table'>
            <Button onClick={handleOpen}>Create Recipe</Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Recipe</TableCell>
                            <TableCell align='right'></TableCell>
                            <TableCell align='right'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recipeList.map((recipe: any, index: number) => {
                            return (
                                <TableRow
                                    key={recipe.index}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}>
                                    <TableCell component='th' scope='row'>
                                        <Button
                                            variant='text'
                                            onClick={() => {
                                                handleOpenRecipe();
                                                setSelectedRecipe(
                                                    recipe.recipeName
                                                );
                                            }}>
                                            {recipe.recipeName}
                                        </Button>
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Button
                                            recipe-key={recipe.recipeName}
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
                <Box sx={style}>
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
                    />
                </Box>
            </Modal>
        </div>
    );
}
