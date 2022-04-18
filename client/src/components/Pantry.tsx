import Button from '@mui/material/Button';
import { Modal, Box, Typography } from '@mui/material';
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

export function Pantry() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const id = sessionStorage.getItem('user_id');

    const [isLoading, setLoading] = useState(true);
    const [pantryList, setPantryList] = useState([]);

    useEffect(() => {
        axios.get(`/api/users/${id}/pantry`).then((response) => {
            setPantryList(response.data);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div className='App'>Loading...</div>;
    }

    function createData(
        ingredient: string,
        supplier: string,
        unitSize: number,
        costPerUnit: number,
        costPerGram: number,
        index: number
    ) {
        return { ingredient, supplier, unitSize, costPerUnit, costPerGram };
    }
    const rows: any[] = [];

    pantryList.forEach((ingredient: any, index) => {
        rows.push(
            createData(
                ingredient.ingredient,
                ingredient.supplier,
                ingredient.unitSize,
                ingredient.costPerUnit,
                ingredient.costPerGram,
                index
            )
        );
    });

    return (
        <div>
            <Button onClick={handleOpen}>Add Ingredient to Pantry</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Box sx={style}>
                    <AddIngredients />
                </Box>
            </Modal>
            <div className='pantry-table'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Ingredient</TableCell>
                                <TableCell align='right'>Supplier</TableCell>
                                <TableCell align='right'>
                                    Unit Size (g)
                                </TableCell>
                                <TableCell align='right'>
                                    Cost Per Unit
                                </TableCell>
                                <TableCell align='right'>
                                    Cost Per Gram
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* {pantryList.map((ingredient: any) => {
                    return (
                        <div>
                            <p>{ingredient.ingredient}</p>
                            <p>{ingredient.supplier}</p>
                            <p>{ingredient.unitSize}</p>
                            <p>{ingredient.costPerUnit}</p>
                        </div>
                    );
                })} */}
            </div>
        </div>
    );
}
