export async function validarCadastroDeVenda(venda) {
  if (!venda.id_servico) {
    throw new Error("ID do serviço é obrigatório");
  }
  if (!venda.quantidade || venda.quantidade <= 0) {
    throw new Error("Quantidade deve ser maior que zero");
  }
  if (!venda.valor_total || venda.valor_total <= 0) {
    throw new Error("Valor total deve ser maior que zero");
  }
  if (!venda.cep) {
    throw new Error("CEP é obrigatório");
  }
  if (!venda.bairro) {
    throw new Error("Bairro é obrigatório");
  }
  if (!venda.logradouro) {
    throw new Error("Logradouro é obrigatório");
  }
  if (!venda.numero) {
    throw new Error("Número é obrigatório");
  }
}

export async function validarAtualizacaoDeVenda(venda) {
  if (!venda.id_servico) {
    throw new Error("ID do serviço é obrigatório");
  } 
  if (!venda.quantidade || venda.quantidade <= 0) {
    throw new Error("Quantidade deve ser maior que zero");
  }
  if (!venda.valor_total || venda.valor_total <= 0) {
    throw new Error("Valor total deve ser maior que zero");
  }
  if (!venda.cep) {
    throw new Error("CEP é obrigatório");
  }
  if (!venda.bairro) {
    throw new Error("Bairro é obrigatório");
  } 
  if (!venda.logradouro) {
    throw new Error("Logradouro é obrigatório");
  }
  if (!venda.numero) {
    throw new Error("Número é obrigatório");
  }
}

export async function validarDelecaoDeVenda(id) {
  if (!id) {
    throw new Error("ID da venda é obrigatório para deleção");
  }   
}
