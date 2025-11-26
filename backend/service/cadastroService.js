import crypto from 'crypto'
import { 
  cadastrarUsuario, 
  entrarUsuario, 
  verificarUsuario, 
  deletarUsuario, 
  atualizarUsuario, 
  listarUsuarios,
  alterarSenhaUsuario
} from '../repository/cadastroRepository.js'
import { 
  validarCadastroUsuario, 
  validarEntradaUsuario, 
  validarDelecaoUsuario
} from '../validation/cadastroValidation.js';

function criptografarSenhaMD5(senha) {
  return crypto.createHash('md5').update(senha).digest('hex');
}

export async function cadastrarUsuarioService(usuario) {
  validarCadastroUsuario(usuario)
  usuario.senha = criptografarSenhaMD5(usuario.senha);
  let id = await cadastrarUsuario(usuario)
  return id;
}

export async function validarEntradaUsuarioService(usuario) {
  validarEntradaUsuario(usuario)
  usuario.senha = criptografarSenhaMD5(usuario.senha);
  const registros = await entrarUsuario(usuario)
  if(!registros) throw new Error ("Email ou senha inválidos!")

  return registros;
}

export async function verificarUsuarioService(id) {
  if(!id) throw new Error ("id inválido!")
  
  const usuario = await verificarUsuario(id)
  if(!usuario) throw new Error("Usuário inválido!");
  return usuario;
}

export async function deletarUsuarioService(id){
  validarDelecaoUsuario(id);
  const linhasAfetadas = await deletarUsuario(id);
  if (linhasAfetadas === 0) {
    throw new Error("Nenhum usuário encontrado com o ID fornecido.");
  }
  return linhasAfetadas;
}

export async function listarUsuariosService() {
  const usuarios = await listarUsuarios();
  return usuarios;
}

export async function atualizarUsuarioService(id, usuario) {
  if (!id) {
    throw new Error("ID do usuário é obrigatório para atualização");
  } 
  const linhasAfetadas = await atualizarUsuario(id, usuario);
  if (linhasAfetadas === 0) {
    throw new Error("Nenhum usuário encontrado com o ID fornecido.");
  }
  return linhasAfetadas;
}
export async function alterarSenhaUsuarioService(id, novaSenha) {
  if (!id) {
    throw new Error("ID do usuário é obrigatório para alteração de senha");
  }
  if (!novaSenha) {
    throw new Error("A nova senha é obrigatória");
  }
  const senhaCriptografada = criptografarSenhaMD5(novaSenha);
  const linhasAfetadas = await alterarSenhaUsuario(id, senhaCriptografada);
  if (linhasAfetadas === 0) {
    throw new Error("Nenhum usuário encontrado com o ID fornecido.");
  }
  return linhasAfetadas;
}