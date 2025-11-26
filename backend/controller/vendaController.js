import {
  cadastrarVendaService,
  listarVendasService,
  buscarVendaPorIdService,
  atualizarVendaService,
  deletarVendaService
} from "../service/vendaService.js";
import { Router } from "express";
const endpoints = Router();
endpoints.get('/vendas', async (req, resp) => {
  try {
    const vendas = await listarVendasService();
    return resp.send(vendas);
  } catch (error) {
    console.error(error);
    return resp.status(400).send();
  }
});

endpoints.get('/vendas/:id', async (req, resp) => {
  try {
    const id = req.params.id;
    const venda = await buscarVendaPorIdService(id);
    return resp.send(venda);
  } catch (error) {
    console.error(error);
    return resp.status(400).send({ mensagem: error.message });
  }
});
endpoints.post('/vendas', async (req, resp) => {
  try {
    const venda = {
      id_servico: req.body.id_servico,
      cep: req.body.cep,
      bairro: req.body.bairro,
      logradouro: req.body.logradouro,
      numero: req.body.numero,
      quantidade: req.body.quantidade,
      valor_total: req.body.valor_total
    };
    const id =  await cadastrarVendaService(venda);
    return resp.send({ id: id });
  } catch (error) {
    return resp.status(400).send({ mensagem: error.message });
  }
});

endpoints.put('/vendas/:id', async (req, resp) => {
  try {
    const id = req.params.id;
    const venda = {
      id_servico: req.body.id_servico,  
      cep: req.body.cep,
      bairro: req.body.bairro,
      logradouro: req.body.logradouro,
      numero: req.body.numero,
      quantidade: req.body.quantidade,
      valor_total: req.body.valor_total
    };
    const linhasAfetadas = await atualizarVendaService(id, venda);
    return resp.send({ linhasAfetadas: linhasAfetadas });
  } catch (error) {
    return resp.status(400).send({ mensagem: error.message });
  }
});

endpoints.delete('/vendas/:id', async (req, resp) => {
  try {
    const id = req.params.id;
    const linhasAfetadas = await deletarVendaService(id);
    return resp.send({ linhasAfetadas: linhasAfetadas });
  } catch (error) {
    return resp.status(400).send({ mensagem: error.message });
  }
});
export default endpoints;