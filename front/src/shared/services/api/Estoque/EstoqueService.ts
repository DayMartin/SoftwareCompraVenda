import { Environment } from '../../../environment';
import { Api } from '../axios-config';

export interface IEstoque {
  nome: string;
  quantidade: number;
  fornecedor_id: number;
  categoria_id: number;
}

export interface IListagemEstoque {
  id: string;
  nome: string;
  quantidade: number;
  fornecedor_id: number;
  categoria_id: number;

}

export interface IDetalheEstoque {
  id: number;
  nome: string;
  quantidade: number;
  fornecedor_id: number;
  categoria_id: number;
  data_criacao: string;
  valorUnitario: number;

}

export interface IDetalheHistoric {
  id: number;
  tipo: string;
  quantidade: number;
  estoque_id: number;
  venda_id: number;
  compra_id: number;
  data_criacao: string;

}


export interface IApiResponse {
  consulta: IDetalheEstoque[]; 
  pagination: {
    totalOrdem: number;
    pageCount: number;
    next?: { page: number };
    prev?: { page: number };
  };
  setor?: string;
  status?: string | string[];
  sala?: string | string[];
  equipe?: string;
  solicitante?: string;
}

// type TUsersComTotalCount = {
//   data: IListagemUsers[];
//   totalCount: number;
// };

const getAll = async (page = 1, filter = ''): Promise<[IDetalheEstoque] | Error> => {
  try {
    const urlRelativa = `${Environment.URL_BASE}/estoque/all`;

    const { data } = await Api.get(urlRelativa);

    if (data) {
      return data;
    }

    return new Error('Erro ao listar os registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
  }
};

const getByID = async (id: number): Promise<IDetalheEstoque[] | Error> => {
  try {
    const { data } = await Api.get(`/estoque/${id}`); 

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const getByFornecedor = async (id: number): Promise<IDetalheEstoque[] | Error> => {
  try {
    const { data } = await Api.get(`/estoque/AllFornecedor/${id}`); 

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const getBycategoria = async (id: number): Promise<IDetalheEstoque[] | Error> => {
  try {
    const { data } = await Api.get(`/estoque/AllCategoria/${id}`); 

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const getByHistoric = async (id: number): Promise<IDetalheHistoric[] | Error> => {
  try {
    const { data } = await Api.get(`/historic/AllEstoque/${id}`); 

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar o registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao consultar o registro.');
  }
};

const create = async (dados: IEstoque): Promise<void | Error> => {
  try {
    await Api.post<IEstoque>('estoque/create', dados);

  } catch (error) {
    throw error;
  }
};

const updateById = async (id: string, dados: IDetalheEstoque): Promise<void | Error> => {
  try {
    await Api.put(`user/edit/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
  }
};

const deleteById = async (id: string): Promise<void | Error> => {
  try {
    await Api.delete(`user/delete/${id}`); 
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao apagar o registro.');
  }
};

const ativarById = async (id: string): Promise<void | Error> => {
  try {
    await Api.put(`user/ativar/${id}`); 
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Erro ao ativar o usuário.');
  }
};

export const EstoqueService = {
  getAll,
  create,
  getByID,
  updateById,
  deleteById,
  getBycategoria,
  getByFornecedor,
  ativarById,
  getByHistoric
};
