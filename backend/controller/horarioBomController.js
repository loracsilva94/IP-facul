import {
  atualizarHorarioBomService,
  buscarHorarioBomPorIdService,
  cadastrarHorarioBomService,
  deletarHorarioBomService,
  listarHorarioBomService
} from '../service/horarioBomService.js';
import { Router } from 'express';

const endpoints = Router();

endpoints.get('/horarios-bons', async (req, resp) => {
  try {
    const horariosBons = await listarHorarioBomService();
    return resp.send(horariosBons);
  } catch (error) {
    return resp.status(400).send();
  }
});

endpoints.get('/horarios-bons/:id', async (req, resp) => {
  try {
    const id = req.params.id;
    const horarioBom = await buscarHorarioBomPorIdService(id);
    return resp.send(horarioBom);
  } catch (error) {
    return resp.status(400).send({ mensagem: error.message });
  }
});

endpoints.post('/horarios-bons', async (req, resp) => {
  try {
    const horarioBom = {  
      id_motorista: req.body.id_motorista,
      cep: req.body.cep,
      dia_semana: req.body.dia_semana,
      horario_inicio: req.body.horario_inicio,
      horario_fim: req.body.horario_fim,
      media_vendas: req.body.media_vendas,
      observacoes: req.body.observacoes
    };
    const id = await cadastrarHorarioBomService(horarioBom);
    return resp.send({ id: id });
  } catch (error) {
    return resp.status(400).send({ mensagem: error.message });
  }
});

endpoints.put('/horarios-bons/:id', async (req, resp) => {
  try {
    const id = req.params.id;
    const horarioBom = {  
      id_motorista: req.body.id_motorista,
      cep: req.body.cep,
      dia_semana: req.body.dia_semana,
      horario_inicio: req.body.horario_inicio,
      horario_fim: req.body.horario_fim,
      media_vendas: req.body.media_vendas,
      observacoes: req.body.observacoes
    };
    const linhasAfetadas = await atualizarHorarioBomService(id, horarioBom);
    return resp.send({ linhasAfetadas: linhasAfetadas });
  } catch (error) {
    return resp.status(400).send({ mensagem: error.message });
  }
});

endpoints.delete('/horarios-bons/:id', async (req, resp) => {
  try {
    const id = req.params.id;
    const linhasAfetadas = await deletarHorarioBomService(id);
    return resp.send({ linhasAfetadas: linhasAfetadas });
  } catch (error) {
    return resp.status(400).send({ mensagem: error.message });
  }
});

export default endpoints;
