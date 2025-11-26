import con from "./connect.js";

export async function cadastrarHorarioBom(horarioBom) {
  const comando = `
  INSERT INTO HorariosBons (
    id_motorista,
    cep,
    dia_semana,
    horario_inicio,
    horario_fim,
    media_vendas,
    observacoes
  )
  VALUES (?, ?, ?, ?, ?, ?, ?);`;
  const resposta = await con.query(comando, [
    horarioBom.id_motorista,
    horarioBom.cep,
    horarioBom.dia_semana,
    horarioBom.horario_inicio,
    horarioBom.horario_fim,
    horarioBom.media_vendas,
    horarioBom.observacoes,
  ]);
  return resposta.insertId;
}

export async function listarHorarioBom() {
  const comando = `
    SELECT
      id,
      id_motorista,
      cep,
      dia_semana,
      horario_inicio,
      horario_fim,
      media_vendas,
      observacoes
    FROM HorariosBons;`;
  const [resposta] = await con.query(comando);
  return resposta;
}

export async function buscarHorarioBomPorId(id) {
  const comando = `
    SELECT
      id,
      id_motorista,
      cep,
      dia_semana,
      horario_inicio,
      horario_fim,
      media_vendas,
      observacoes
    FROM HorariosBons
    WHERE id = ?;`;
  const [resposta] = await con.query(comando, [id]);
  return resposta[0];
}

export async function atualizarHorarioBom(id, horarioBom) {
  const comando = `
    UPDATE HorariosBons
    SET
      id_motorista = ?,
      cep = ?,
      dia_semana = ?,
      horario_inicio = ?,
      horario_fim = ?,
      media_vendas = ?,
      observacoes = ?
    WHERE id = ?;`;
  const [resposta] = await con.query(comando, [
    horarioBom.id_motorista,
    horarioBom.cep,
    horarioBom.dia_semana,
    horarioBom.horario_inicio,
    horarioBom.horario_fim,
    horarioBom.media_vendas,
    horarioBom.observacoes,
    id,
  ]);
  return resposta.affectedRows;
}

export async function deletarHorarioBom(id) {
  const comando = `
    DELETE FROM HorariosBons
    WHERE id = ?;`;
  const [resposta] = await con.query(comando, [id]);
  return resposta.affectedRows;
}
