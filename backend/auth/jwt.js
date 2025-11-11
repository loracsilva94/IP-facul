import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // <- necessário para carregar a .env

const KEY = process.env.key; // agora carrega de verdade

// 🔹 Gera o token com dados úteis do usuário
export function gerarTokenJwt(usuario) {
  return jwt.sign(
    {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      funcao: usuario.funcao
    },
    KEY,
    { expiresIn: "1d" } // expira em 1 dia
  );
}

// 🔹 Middleware para validar o token
export function autenticacao(req, resp, next) {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return resp.status(401).send({ mensagem: "Token não enviado" });
    }

    // Formato esperado: "Bearer <token>"
    const token = authHeader.split(" ")[1];
    if (!token) {
      return resp.status(401).send({ mensagem: "Token malformado" });
    }

    const decoded = jwt.verify(token, KEY);
    req.user = decoded; // agora contém id, nome, funcao, etc.

    next();
  } catch (error) {
    console.error("Erro na autenticação:", error.message);
    return resp.status(401).send({ mensagem: "Token inválido ou expirado" });
  }
}
