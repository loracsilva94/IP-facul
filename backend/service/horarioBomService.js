import {
  atualizarHorarioBom,
  buscarHorarioBomPorId,
  cadastrarHorarioBom,
  deletarHorarioBom,
  listarHorarioBom
} from '../repository/horarioBomRepository.js';

export async function cadastrarHorarioBomService(horarioBom) {  
  const id = await cadastrarHorarioBom(horarioBom);
  return id;
}
export async function listarHorarioBomService() {
  const horariosBons = await listarHorarioBom();
  return horariosBons;
}
export async function buscarHorarioBomPorIdService(id) {
  if (!id) {
    throw new Error("ID do HorárioBom é obrigatório para busca");
  }
  const horarioBom = await buscarHorarioBomPorId(id);
  if (!horarioBom) {
    throw new Error("HorárioBom não encontrado");
  }
  return horarioBom;
}
export async function atualizarHorarioBomService(id, horarioBom) {
  if (!id) {
    throw new Error("ID do HorárioBom é obrigatório para atualização");
  }
  const linhasAfetadas = await atualizarHorarioBom(id, horarioBom);
  if (linhasAfetadas === 0) {
    throw new Error("Nenhum HorárioBom encontrado com o ID fornecido.");
  }
  return linhasAfetadas;
}
export async function deletarHorarioBomService(id) {
  if (!id) {
    throw new Error("ID do HorárioBom é obrigatório para deleção");
  }
  const linhasAfetadas = await deletarHorarioBom(id);
  if (linhasAfetadas === 0) {
    throw new Error("Nenhum HorárioBom encontrado com o ID fornecido.");
  }
  return linhasAfetadas;
}
