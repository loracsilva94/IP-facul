import {
  listarServicosService,
  buscarServicoPorIdService,
  cadastrarServicoService,
  atualizarServicoService,
  deletarServicoService
} from "../service/servicoServices.js";
import { Router } from "express";

const endpoints = Router();

endpoints.get('/servicos', async (req, resp) => {
  try {
    const servicos = await listarServicosService();
    return resp.send(servicos);
  } catch (error) {
    console.error(error);
    return resp.status(400).send();
  }
});

endpoints.get('/servicos/:id', async (req, resp) => {
  try {
    const id = req.params.id;
    const servico = await buscarServicoPorIdService(id);
    return resp.send(servico);
  } catch (error) {
    console.error(error);
    return resp.status(400).send({ mensagem: error.message });
  }
});
endpoints.post('/servicos', async (req, resp) => {
  try {
    const servico = {
      id_motorista: req.body.id_motorista,
      nome: req.body.nome,
      preco_medio: req.body.preco_medio,  
      descricao: req.body.descricao
    };
    const id =  await cadastrarServicoService(servico);
    return resp.send({ id: id });
  } catch (error) {
    return resp.status(400).send({ mensagem: error.message });
  }
});

endpoints.put('/servicos/:id', async (req, resp) => { 
  try {
    const id = req.params.id;
    const servico = {
      id_motorista: req.body.id_motorista,
      nome: req.body.nome,
      preco_medio: req.body.preco_medio,
      descricao: req.body.descricao
    };
    const linhasAfetadas = await atualizarServicoService(id, servico);
    return resp.send({ linhasAfetadas: linhasAfetadas });
  } catch (error) {
    return resp.status(400).send({ mensagem: error.message });
  }
});

endpoints.delete('/servicos/:id', async (req, resp) => {
  try {
    const id = req.params.id;
    const linhasAfetadas = await deletarServicoService(id);
    return resp.send({ linhasAfetadas: linhasAfetadas });
  } catch (error) {
    return resp.status(400).send({ mensagem: error.message });
  }
});


export default endpoints;