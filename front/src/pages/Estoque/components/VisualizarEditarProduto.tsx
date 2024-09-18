import * as React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    Box
} from "@mui/material";
import { IDetalheEstoque } from "../../../shared/services/api/Estoque/EstoqueService";

interface ProdutoEditViewDialogProps {
    open: boolean;
    onClose: () => void;
    prod: IDetalheEstoque | null;
    onSave?: (prod: IDetalheEstoque) => void;
    isEditing: boolean;
}

type Imagem = File | { type: string; data: number[] };

const isFile = (image: Imagem): image is File => {
    return (image as File).size !== undefined;
};

const isBuffer = (image: Imagem): image is { type: string; data: number[] } => {
    return (image as { type: string; data: number[] }).data !== undefined;
};

const ProdutoEditViewDialog: React.FC<ProdutoEditViewDialogProps> = ({ open, onClose, prod, onSave, isEditing }) => {
    const [editProd, setEditProd] = React.useState<IDetalheEstoque | null>(prod);
    const [imagemPreview, setImagemPreview] = React.useState<string | null>(null);

    React.useEffect(() => {
        setEditProd(prod);
    }, [prod]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editProd) {
            setEditProd({
                ...editProd,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        if (editProd) {
            setEditProd({
                ...editProd,
                [name]: value,
            });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setEditProd(prevState => prevState ? { ...prevState, imagem: file } : null);
            setImagemPreview(URL.createObjectURL(file));
        }
    };

    const handleSave = () => {
        if (editProd && onSave) {
            onSave(editProd);
        }
    };

    React.useEffect(() => {
        if (editProd && editProd.imagem && isFile(editProd.imagem)) {
            const dataURL = URL.createObjectURL(editProd.imagem);
            setImagemPreview(dataURL);
        } else if (editProd && editProd.imagem && isBuffer(editProd.imagem)) {
            const dataURL = convertBufferToDataURL(editProd.imagem);
            setImagemPreview(dataURL);
        } else {
            setImagemPreview(null);
        }
    }, [editProd]);

    const convertBufferToDataURL = (buffer: { type: string; data: number[] }) => {
        const mimeType = buffer.type || 'image/jpeg';
        const byteArray = new Uint8Array(buffer.data);
        const binaryString = byteArray.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
        const base64String = window.btoa(binaryString);
        return `data:${mimeType};base64,${base64String}`;
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{isEditing ? "Editar Produto" : "Detalhes do Produto"}</DialogTitle>
            <DialogContent>
                {editProd ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                id="id"
                                label="ID"
                                name="id"
                                value={editProd.id || ''}
                                fullWidth
                                margin="normal"
                                disabled
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                id="nome"
                                label="Nome"
                                name="nome"
                                value={editProd.nome || ''}
                                fullWidth
                                margin="normal"
                                disabled={!isEditing}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                id="valorUnitarioCompra"
                                label="Valor unitário Compra"
                                name="valorUnitarioCompra"
                                value={editProd.valorUnitarioCompra || ''}
                                fullWidth
                                margin="normal"
                                disabled={!isEditing}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                id="valorUnitarioVenda"
                                label="Valor unitário Venda"
                                name="valorUnitarioVenda"
                                value={editProd.valorUnitarioVenda || ''}
                                fullWidth
                                margin="normal"
                                disabled={!isEditing}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                id="fornecedor_id"
                                label="Fornecedor"
                                name="fornecedor_id"
                                value={editProd.fornecedor_id || ''}
                                fullWidth
                                margin="normal"
                                disabled={!isEditing}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                id="categoria_id"
                                label="Categoria"
                                name="categoria_id"
                                value={editProd.categoria_id || ''}
                                fullWidth
                                margin="normal"
                                disabled={!isEditing}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                id="marca_id"
                                label="Marca"
                                name="marca_id"
                                value={editProd.marca_id || ''}
                                fullWidth
                                margin="normal"
                                disabled={!isEditing}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="promocao">Promoção</InputLabel>
                                <Select
                                    labelId="promocao"
                                    name="promocao"
                                    value={editProd.promocao || ''}
                                    onChange={handleSelectChange}
                                    disabled={!isEditing}
                                    label="Promoção"
                                >
                                    <MenuItem value="ativo">Ativo</MenuItem>
                                    <MenuItem value="inativo">Inativo</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="valor_promocional"
                                label="Valor promocional"
                                name="valor_promocional"
                                value={editProd.valor_promocional || ''}
                                fullWidth
                                margin="normal"
                                disabled={!isEditing}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                disabled={!isEditing}
                                style={{ marginTop: '16px' }}
                            />
                            {imagemPreview ? (
                                <Box mt={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <img
                                        src={imagemPreview}
                                        alt="Preview"
                                        style={{ maxWidth: '100%', height: 'auto', borderRadius: 4, border: '1px solid #ddd' }}
                                    />
                                </Box>
                            ) : (
                                <Typography variant="body1">Nenhuma imagem selecionada.</Typography>
                            )}
                        </Grid>
                    </Grid>
                ) : (
                    <Typography variant="body1">Nenhum Produto selecionado.</Typography>
                )}
            </DialogContent>
            <DialogActions>
                {isEditing && <Button onClick={handleSave} color="primary">Salvar</Button>}
                <Button onClick={onClose} color="primary">Fechar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProdutoEditViewDialog;