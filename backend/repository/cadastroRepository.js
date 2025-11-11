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
