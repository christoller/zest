import Button from '@mui/material/Button';
import { Modal, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { AddIngredients } from './AddIngredients';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { EditIngredient } from './EditIngredient';
import { keysrt } from '../../functions/keysrt';
import { roundData } from '../../functions/roundData';
import { Navigate } from 'react-router-dom';
import { createData } from '../../functions/createData';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const fontStyle = {
    fontWeight: 'bold',
};

export function Pantry(props: any) {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [ingredientKey, setIngredientKey] = useState();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenEdit = (e: any) => {
        setOpenEdit(true);
        setIngredientKey(e.target.getAttribute('ingredient-key'));
    };
    const handleCloseEdit = () => setOpenEdit(false);
    const id = localStorage.getItem('user_id');
    const [isLoading, setLoading] = useState(true);
    const [pantryList, setPantryList] = useState([]);
    const rows: any[] = [];

    useEffect(() => {
        if (id) {
            axios.get(`/api/pantry/${id}`).then((response) => {
                setPantryList(response.data);
                setLoading(false);
            });
        }
    }, [open, openEdit, id]);

    keysrt(pantryList, 'ingredient').forEach((ingredient: any, index) => {
        rows.push(
            createData(
                ingredient.ingredient,
                ingredient.supplier,
                ingredient.unitSize,
                roundData(ingredient.costPerUnit, 4),
                roundData(ingredient.costPerGram, 4),
                index
            )
        );
    });

    if (isLoading && id) {
        return <div className='App'>Loading...</div>;
    }

    if (id) {
        return (
            <div className='bg-white md:3/4 lg:w-8/12 mt-5 mx-auto p-10 rounded-xl shadow-2xl shadow-black'>
                <h1 className='text-5xl font-bold'>Pantry</h1>
                <Button
                    onClick={handleOpen}
                    sx={{
                        mx: 'auto',
                        mt: 2,
                        fontWeight: 600,
                        color: 'rgb(101 163 13)',
                    }}>
                    Add Ingredient to Pantry
                </Button>

                <TableContainer component={Paper}>
                    <Table
                        sx={{ minWidth: 350, maxWidth: '80vw' }}
                        aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={fontStyle}>Ingredient</TableCell>
                                <TableCell align='right' sx={fontStyle}>
                                    Supplier
                                </TableCell>
                                <TableCell align='right' sx={fontStyle}>
                                    Unit Size (g)
                                </TableCell>
                                <TableCell align='right' sx={fontStyle}>
                                    Cost Per Unit ($)
                                </TableCell>
                                <TableCell align='right' sx={fontStyle}>
                                    Cost Per Gram ($)
                                </TableCell>
                                <TableCell align='right' sx={fontStyle}>
                                    Modify
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row: any) => (
                                <TableRow
                                    key={row.index}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}>
                                    <TableCell component='th' scope='row'>
                                        {row.ingredient}
                                    </TableCell>
                                    <TableCell align='right'>
                                        {row.supplier}
                                    </TableCell>
                                    <TableCell align='right'>
                                        {row.unitSize}
                                    </TableCell>
                                    <TableCell align='right'>
                                        {row.costPerUnit}
                                    </TableCell>
                                    <TableCell align='right'>
                                        {row.costPerGram}
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Button
                                            variant='text'
                                            ingredient-key={row.index}
                                            sx={{
                                                fontWeight: 600,
                                                color: 'rgb(101 163 13)',
                                            }}
                                            onClick={handleOpenEdit}>
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Modal
                    open={openEdit}
                    onClose={handleCloseEdit}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'>
                    <Box sx={style}>
                        <EditIngredient
                            ingredientKey={ingredientKey}
                            rows={rows}
                            setOpenEdit={setOpenEdit}
                        />
                    </Box>
                </Modal>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'>
                    <Box sx={style}>
                        <AddIngredients setOpen={setOpen} />
                    </Box>
                </Modal>
            </div>
        );
    }
    return <Navigate to='/login' replace />;
}
