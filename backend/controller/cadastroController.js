import { gerarTokenJwt } from "../auth/jwt.js";
import { Router } from "express";
import {
  cadastrarUsuarioService,
  validarEntradaUsuarioService,
  verificarUsuarioService
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

export default endpoints;
