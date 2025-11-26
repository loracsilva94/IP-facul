export async function validarCadastroDeServico(servico) {
  if (!servico.id_motorista) {
    throw new Error("ID do motorista é obrigatório");
  }
  if (!servico.nome) {
    throw new Error("Nome do serviço é obrigatório");
  }
  if (!servico.preco_medio) {
    throw new Error("Preço médio do serviço é obrigatório");
  }
  if (!servico.descricao) {
    throw new Error("Descrição do serviço é obrigatória");
  }
}
export async function validarAtualizacaoDeServico(servico) {
  if (!servico.id_motorista) {
    throw new Error("ID do motorista é obrigatório");
  }
  if (!servico.nome) {
    throw new Error("Nome do serviço é obrigatório");
  } 
  if (!servico.preco_medio) {
    throw new Error("Preço médio do serviço é obrigatório");
  } 
  if (!servico.descricao) {
    throw new Error("Descrição do serviço é obrigatória");
  } 
}
export async function validarDelecaoDeServico(id) {
  if (!id) {
    throw new Error("ID do serviço é obrigatório para deleção");
  }   
}
