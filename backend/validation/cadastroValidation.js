export async function validarCadastroUsuario(usuario) {
  if (!usuario.nome) {
    throw new Error('O nome do usuário é obrigatório');
  }
  if (!usuario.senha) {
    throw new Error("Senha é obrigatória");
  }
  if(!usuario.email){
    throw new Error("email é obrigatorio")
  }
  if (!usuario.role) {
    usuario.role = 'MOTORISTA';
  }
}

export async function validarEntradaUsuario(usuario) {
  if (!usuario.nome) {
    throw new Error('O nome do usuário é obrigatório');
  }
  if (!usuario.senha) {
    throw new Error("Senha é obrigatória");
  }
}

export async function validarDelecaoUsuario(id) {
  if (!id) {
    throw new Error("ID do usuário é obrigatório para deleção");
  }
}