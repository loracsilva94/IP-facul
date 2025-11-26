import { 
  buscarServicoPorId, 
  listarServicos, 
  atualizarServico, 
  cadastrarServico,
  deletarServico } 
  from "../repository/servicoRepository.js";
import { 
  validarCadastroDeServico, 
  validarAtualizacaoDeServico 
} from "../validation/servicoValidation.js";

export async function cadastrarServicoService(servico) {
  await validarCadastroDeServico(servico);
  const id = await cadastrarServico(servico);
  return id;
}

export async function listarServicosService() {
  const servicos = await listarServicos();
  return servicos;
}

export async function buscarServicoPorIdService(id) {
  if (!id) {
    throw new Error("ID do serviço é obrigatório para busca");
  } 
  const servico = await buscarServicoPorId(id);
  if (!servico) {
    throw new Error("Serviço não encontrado");
  }
  return servico;
}

export async function atualizarServicoService(id, servico) {
  if (!id) {
    throw new Error("ID do serviço é obrigatório para atualização");
  }
  await validarAtualizacaoDeServico(servico);
  const linhasAfetadas = await atualizarServico(id, servico);
  if (linhasAfetadas === 0) {
    throw new Error("Nenhum serviço encontrado com o ID fornecido.");
  }
  return linhasAfetadas;  
}

export async function deletarServicoService(id) {
  if (!id) {
    throw new Error("ID do serviço é obrigatório para deleção");
  }
  const linhasAfetadas = await deletarServico(id);
  if (linhasAfetadas === 0) {
    throw new Error("Nenhum serviço encontrado com o ID fornecido.");
  }
  return linhasAfetadas;  
}
