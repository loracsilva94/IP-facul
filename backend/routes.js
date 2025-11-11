import express from "express";

const app = express();
app.use(express.json())

import cadastroController from "./controller/cadastroController.js"

export default function addRotas(servidor){
  servidor.use(cadastroController)
}