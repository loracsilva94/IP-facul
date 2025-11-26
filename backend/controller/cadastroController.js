import { gerarTokenJwt } from "../auth/jwt.js";
import { Router } from "express";
import {
  atualizarUsuarioService,
  cadastrarUsuarioService,
  validarEntradaUsuarioService,
  verificarUsuarioService, 
  deletarUsuarioService,
  alterarSenhaUsuarioService,
  listarUsuariosService
} from "../service/cadastroService.js";
import {
  validarCadastroUsuario,
  validarEntradaUsuario
} from "../validation/cadastroValidation.js";

const endpoints = Router();

// 🔹 Login (entrar)
endpoints.post('/entrar', async (req, resp) => {
  try {
    const usuario = {
      nome:req.body.nome,
      email: req.body.email,
      senha: req.body.senha
    };

    const admin = await validarEntradaUsuarioService(usuario);
    const token = gerarTokenJwt({
      id: admin.id,
      nome: admin.nome,
      email: admin.email,
      funcao: admin.funcao
    });

    return resp.send({ token });
  } catch (error) {
    console.error(error);
    return resp.status(400).send({ mensagem: error.message });
  }
});

// 🔹 Criar novo usuário
endpoints.post('/criar', async (req, resp) => {
  try {
    const usuario = {
      id_Motorista: req.body.id_Motorista || null,
      nome: req.body.usuario,
      email: req.body.email,
      senha: req.body.senha,
      telefone: req.body.telefone || null,
      cidade: req.body.cidade || null,
      funcao: req.body.funcao || "MOTORISTA" // valor padrão caso não venha no body
    };

    await validarCadastroUsuario(usuario);

    const id = await cadastrarUsuarioService(usuario);

    const token = gerarTokenJwt({
      id,
      nome: usuario.nome,
      email: usuario.email,
      funcao: usuario.funcao
    });

    return resp.status(201).send({
      mensagem: "Usuário cadastrado com sucesso!",
      id,
      token
    });

  } catch (error) {
    console.error(error);
    return resp.status(400).send({ mensagem: error.message });
  }
});

// 🔹 Consultar usuário pelo ID
endpoints.get('/consultar/usuario/:id', async (req, resp) => {
  try {
    const id = parseInt(req.params.id); // pega o parâmetro da URL e converte para número
    if (isNaN(id)) return resp.status(400).send({ mensagem: "ID inválido" });

    const usuario = await verificarUsuarioService(id);
    if (!usuario)
      return resp.status(404).send({ mensagem: "Usuário não encontrado" });

    return resp.status(200).send({ usuario });
  } catch (error) {
    console.error(error);
    return resp.status(400).send({ mensagem: error.message });
  }
});

endpoints.delete('/deletar/usuario/:id', async (req, resp) => {
  try {
    const id = req.params.id; // pega o parâmetro da URL e converte para número
    if (isNaN(id)) return resp.status(400).send({ mensagem: "ID inválido" });
    await deletarUsuarioService(id);
    return resp.status(204).send();
  } catch (error) {
    return resp.status(400).send(error);
  } 
});

endpoints.put('/atualizar/usuario/:id', async (req, resp) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) return resp.status(400).send({ mensagem: "ID inválido" });
    const usuario = {
      nome: req.body.usuario,
      email: req.body.email,
      telefone: req.body.telefone || null,
      cidade: req.body.cidade || null,
      funcao: req.body.funcao || "MOTORISTA" // valor padrão caso não venha no body
    };
    await atualizarUsuarioService(id, usuario);
    return resp.status(204).send();
  } catch (error) {
    console.error(error);
    return resp.status(400).send({ mensagem: error.message });
  }
});

endpoints.get('/listar/usuarios', async (req, resp) => {
  try {
    const usuarios = await listarUsuariosService();
    return resp.status(200).send({ usuarios });
  } catch (error) {
    console.error(error);
    return resp.status(400).send({ mensagem: error.message });
  }
});

endpoints.put('/alterar/senha/:id', async (req, resp) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) return resp.status(400).send({ mensagem: "ID inválido" });
    const novaSenha = req.body.novaSenha;
    await alterarSenhaUsuarioService(id, novaSenha);
    return resp.status(204).send();
  } catch (error) {
    return resp.status(400).send({ mensagem: error.message });
  }
});

export default endpoints;
