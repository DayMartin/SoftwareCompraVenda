import { Box, Button } from "@mui/material";
import { UsersService } from "../../../shared/services/api/Users/UsersService";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import AdicionarUsers from "../../../pages/Users/components/AdicionarUsers";
import { CenterFocusStrong } from "@mui/icons-material";

interface BarraUsuariosProps {
    onTipoChange: (tipo: string) => void;
}

export const BarraUsuarios: React.VFC<BarraUsuariosProps> = ({ onTipoChange }) => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (formData: any) => {
        try {
            await UsersService.create(formData);
            alert('Usuário criado com sucesso!');
            handleClose();
        } catch (error) {
            console.error(error);
            alert('Erro ao criar usuário');
        }
    };

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
            <Button
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '28px',
                    transform: 'translateY(-50%)',
                    backgroundColor: '#0d47a1',
                    color: 'white',
                    borderRadius: '100%',
                    width: 28,
                    minWidth: 28,
                    height: 28,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                        backgroundColor: '#0b3d91',
                    },
                }}
                onClick={handleOpen}
            >
                <AddIcon/>
            </Button>

            {/* Botões de ação */}
            <Box sx={{ flexGrow: 1, 
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',

                 }}>
                <Grid container spacing={2} justifyContent="flex-end" alignItems={'center'}>
                    <Grid item>
                        <Card
                            sx={{
                                maxWidth: 150,
                                minWidth: 150, 
                                height: '28px',
                                backgroundColor: "#F0F8FF",
                                borderRadius: 2,
                                cursor: "pointer",
                            }}
                            onClick={() => onTipoChange('cliente')} 
                        >
                            <CardContent sx={{paddingBottom: 0, padding: 0}}>
                                <Typography
                                    sx={{ fontSize: 16, textAlign: "center", alignItems: 'center' }}
                                    color="text.secondary"
                                >
                                    Cliente
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card
                            sx={{
                                maxWidth: 150,
                                minWidth: 150,
                                height: '28px',
                                backgroundColor: "#F5F5DC",
                                borderRadius: 2,
                                cursor: "pointer",
                            }}
                            onClick={() => onTipoChange('fornecedor')}
                        >
                            <CardContent sx={{paddingBottom: 0, padding: 0}}>
                                <Typography
                                    sx={{ fontSize: 16, textAlign: "center", alignItems: 'center' }}
                                    color="text.secondary"
                                >
                                    Fornecedor
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card
                            sx={{
                                maxWidth: 150,
                                minWidth: 150,
                                height: '28px',
                                backgroundColor: "#FFDAB9",
                                borderRadius: 2,
                                cursor: "pointer",
                            }}
                            onClick={() => onTipoChange('funcionario')}
                        >
                            <CardContent sx={{paddingBottom: 0, padding: 0}}>
                                <Typography
                                    sx={{ fontSize: 16, textAlign: "center", alignItems: 'center' }}
                                    color="text.secondary"
                                >
                                    Funcionário
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Modal para adicionar usuários */}
            <AdicionarUsers open={open} onClose={handleClose} title="Adicionar Novo Usuário" onSubmit={handleSubmit} />
        </Box>
    );
};
