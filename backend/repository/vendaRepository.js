import con from "./connect.js";

export async function cadastrarVenda(venda) {
  const comando = `
    INSERT INTO Venda (id_servico, cep, bairro, logradouro, numero, quantidade, valor_total)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const resposta = await con.query(comando, [venda.id_servico, venda.cep, venda.bairro, venda.logradouro, venda.numero, venda.quantidade, venda.valor_total]);
  return resposta.insertId;
}

export async function listarVendas() {
  const comando = `
    SELECT id, id_servico, cep, bairro, logradouro, numero, quantidade, valor_total
    FROM Venda;`;
  const [resposta] = await con.query(comando);
  return resposta;
}

export async function buscarVendaPorId(id) {
  const comando = `
    SELECT id, id_servico, cep, bairro, logradouro, numero, quantidade, valor_total
    FROM Venda 
    WHERE id = ?;`;
  const [resposta] = await con.query(comando, [id]);
  return resposta[0];
}

export async function atualizarVenda(id, venda) {
  const comando = `
    UPDATE Venda
    SET id_servico = ?, 
        cep = ?,
        bairro = ?,
        logradouro = ?,
        numero = ?,
        quantidade = ?,
        valor_total = ?
    WHERE id = ?;`;
  const [resposta] = await con.query(comando, [venda.id_servico, venda.cep, venda.bairro, venda.logradouro, venda.numero, venda.quantidade, venda.valor_total, id]);
  return resposta.affectedRows;
}

export async function deletarVenda(id) {
  const comando = `
    DELETE FROM Venda
    WHERE id = ?;`;
  const [resposta] = await con.query(comando, [id]);
  return resposta.affectedRows;
}
