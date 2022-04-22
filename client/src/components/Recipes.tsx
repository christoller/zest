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
import { CreateRecipe } from './CreateRecipe';

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

export function Recipes() {
    const [open, setOpen] = useState(false);
    const [recipeList, setRecipeList] = useState([
        {
            recipeName: 'No Recipes Yet :(',
        },
    ]);
    const [isLoading, setLoading] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const id = sessionStorage.getItem('user_id');

    useEffect(() => {
        axios.get(`/api/recipes/${id}`).then((response) => {
            console.log(response.data);
            setRecipeList(response.data);
            setLoading(false);
        });
    }, [open]);

    if (isLoading) {
        return <div className='App'>Loading...</div>;
    }

    return (
        <div className='table'>
            <p>Recipes Page</p>
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
                                        <Button variant='text'>
                                            {recipe.recipeName}
                                        </Button>
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Button>Edit</Button>
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Button>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button onClick={handleOpen}>Create Recipe</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box sx={style}>
                    <CreateRecipe />
                </Box>
            </Modal>
        </div>
    );
}
