import con from "./connect.js";
export async function cadastrarServico(servico) {
  const comando = `
    INSERT INTO Servico (id_motorista, nome, preco_medio, descricao)
    VALUES (?, ?, ?, ?);`
  const resposta = await con.query(comando, [servico.id_motorista, servico.nome, servico.preco_medio, servico.descricao]);
  return resposta.insertId;
}
export async function listarServicos() {
  const comando = `
    SELECT id, id_motorista, nome, preco_medio, descricao
    FROM Servico;`
  const [resposta] = await con.query(comando);
  return resposta;
}
export async function buscarServicoPorId(id) {
  const comando = `
    SELECT id, id_motorista, nome, preco_medio, descricao
    FROM Servico
    WHERE id = ?;`
  const [resposta] = await con.query(comando, [id]);
  return resposta[0];
}
export async function atualizarServico(id, servico) {
  const comando = `
    UPDATE Servico
    SET id_motorista = ?,
        nome = ?,
        preco_medio = ?,
        descricao = ?
    WHERE id = ?;`
  const [resposta] = await con.query(comando, [servico.id_motorista, servico.nome, servico.preco_medio, servico.descricao, id]);
  return resposta.affectedRows;
}
export async function deletarServico(id) {
  const comando = `
    DELETE FROM Servico
    WHERE id = ?;`
  const [resposta] = await con.query(comando, [id]);
  return resposta.affectedRows;
}
