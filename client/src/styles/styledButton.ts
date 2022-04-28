import { Button, styled } from "@mui/material";


const StyledButton = styled(Button)(({ theme, color = 'primary' }) => ({
    backgroundColor: 'rgb(101 163 13)',
    fontWeight: 600,
    // fontFamily: 'Roboto Mono, Monospace',
    ':hover': {
        backgroundColor: 'rgb(132 204 22)',
    },
}));

export default StyledButton