import {
  cadastrarVenda, 
  listarVendas, 
  buscarVendaPorId,
  atualizarVenda, 
  deletarVenda
}
from '../repository/vendaRepository.js';
import {
  validarCadastroDeVenda,
  validarAtualizacaoDeVenda,
  validarDelecaoDeVenda
} from '../validation/vendaValidation.js';
export async function cadastrarVendaService(venda) {
  await validarCadastroDeVenda(venda);
  const id = await cadastrarVenda(venda);
  return id;
}
export async function listarVendasService() {
  const vendas = await listarVendas();
  return vendas;
}
export async function buscarVendaPorIdService(id) {
  if (!id) {
    throw new Error("ID da venda é obrigatório para busca");
  }
  const venda = await buscarVendaPorId(id);
  if (!venda) {
    throw new Error("Venda não encontrada");
  }
  return venda;
}
export async function atualizarVendaService(id, venda) {
  if (!id) {
    throw new Error("ID da venda é obrigatório para atualização");
  }
  await validarAtualizacaoDeVenda(venda);
  const linhasAfetadas = await atualizarVenda(id, venda);
  if (linhasAfetadas === 0) {
    throw new Error("Nenhuma venda encontrada com o ID fornecido.");
  }
  return linhasAfetadas;  
}
export async function deletarVendaService(id) {
  await validarDelecaoDeVenda(id);
  const linhasAfetadas = await deletarVenda(id);  
  if (linhasAfetadas === 0) { 
    throw new Error("Nenhuma venda encontrada com o ID fornecido.");
  }
  return linhasAfetadas;  
}