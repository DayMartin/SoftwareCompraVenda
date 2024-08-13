import { Box, Button } from "@mui/material";
import * as React from "react";
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';


export const BarraAReceber: React.VFC = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                m: 1,
                width: "auto",
                height: '30px',
                marginLeft: "8%",
                marginRight: "2%",
                padding: '2%',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center', 
                justifyContent: 'space-between', 
                position: 'relative',
                borderRadius: '8px'
            }}
        >
            <Box
                sx={{
                    display: 'flex', 
                    alignItems: 'center',
                    ml: 'auto',
                }}
            >
                <Button
                    sx={{
                        backgroundColor: '#0d47a1',
                        color: 'white',
                        borderRadius: '6%',
                        width: 'auto', 
                        minWidth: 120,  
                        height: 28,
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: 10,
                        fontWeight: 'bold',
                        alignItems: 'center',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                        '&:hover': {
                            backgroundColor: '#0b3d91',
                        },
                    }}
                    onClick={() => navigate('/venda')}                >
                    Vendas
                </Button>

                <Button
                    sx={{
                        backgroundColor: '#0d47a1',
                        color: 'white',
                        borderRadius: '6%',
                        width: 'auto', 
                        margin: '5px', 
                        minWidth: 120,  
                        height: 28,
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: 10,
                        fontWeight: 'bold',
                        alignItems: 'center',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                        '&:hover': {
                            backgroundColor: '#0b3d91',
                        },
                    }}
                    onClick={() => navigate('/venda')}                >
                    Pendente
                </Button>

                <Button
                    sx={{
                        backgroundColor: '#0d47a1',
                        color: 'white',
                        borderRadius: '6%',
                        width: 'auto', 
                        minWidth: 120,  
                        height: 28,
                        margin: '5px', 
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: 10,
                        fontWeight: 'bold',
                        alignItems: 'center',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                        '&:hover': {
                            backgroundColor: '#0b3d91',
                        },
                    }}
                    onClick={() => navigate('/venda')}                >
                    Pago
                </Button>
            </Box>


        </Box>
    );
};
