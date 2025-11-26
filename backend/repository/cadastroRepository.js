import con from "./connect.js";
export async function cadastrarUsuario(usuario) {
  const comando = `
    INSERT INTO Usuarios (nome, email, senha, telefone, cidade, funcao)
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  const [resposta] = await con.query(comando, [ usuario.nome, usuario.email, usuario.senha, usuario.telefone, usuario.cidade, usuario.funcao // 'ADMIN' ou 'MOTORISTA'
  ]);

  return resposta.insertId; // retorna o ID do usuário inserido
}

export async function entrarUsuario(usuario) {
  const comando = `
    SELECT 
      id AS id, 
      nome AS nome, 
      email AS email, 
      senha AS senha, 
      funcao AS funcao
    FROM Usuarios
    WHERE email = ? AND senha = ?;
  `;

  const [resposta] = await con.query(comando, [usuario.email, usuario.senha]);
  return resposta[0]; // retorna o usuário encontrado ou undefined
}

export async function verificarUsuario(id) {
  const comando = `
  SELECT id, nome, email, telefone, cidade, funcao
  FROM Usuarios
  WHERE id = ?;
  
  `;
  const [resposta] = await con.query(comando, [id]);
  return resposta[0]; // retorna o registro (ou undefined se não achar)
}

export async function deletarUsuario(id){
  const comando = `
    DELETE FROM Usuarios
    WHERE id = ?;
  `;
  const resposta = await con.query(comando, [id]);
  return resposta[0].affectedRows;
};

export async function listarUsuarios() {
  const comando = `
    SELECT id, nome, email, telefone, cidade, funcao
    FROM Usuarios;
  `;
  const [resposta] = await con.query(comando);
  return resposta; // retorna a lista de usuários
}

export async function atualizarUsuario(id, usuario) {
  const comando = `
    UPDATE Usuarios
    SET nome = ?, email = ?, telefone = ?, cidade = ?, funcao = ?
    WHERE id = ?;
  `;
  const [resposta] = await con.query(comando, [
    usuario.nome,
    usuario.email,
    usuario.telefone,
    usuario.cidade,
    usuario.funcao,
    id
  ]);
  return resposta.affectedRows; // retorna o número de linhas afetadas
}

export async function alterarSenhaUsuario(id, novaSenha) {
  const comando = `
    UPDATE Usuarios
    SET senha = ?
    WHERE id = ?;
  `;
  const [resposta] = await con.query(comando, [novaSenha, id]);
  return resposta.affectedRows; // retorna o número de linhas afetadas
}