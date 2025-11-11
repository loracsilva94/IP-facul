# Backend - Projeto Integrador ADS

Este é o backend da aplicação do Projeto Integrador do curso de Análise e Desenvolvimento de Sistemas (ADS). A aplicação gerencia motoristas e vendedores ambulantes, permitindo cadastro, login e consultas de usuários.

## Tecnologias Utilizadas

- **Node.js** com **Express.js** para o servidor web
- **MySQL2** para conexão com o banco de dados MySQL
- **JWT (JSON Web Token)** para autenticação
- **CORS** para permitir requisições cross-origin
- **Dotenv** para variáveis de ambiente
- **Nodemon** para desenvolvimento (reinício automático do servidor)
- **Crypto** (nativo do Node.js) para criptografia MD5 de senhas

## Estrutura do Projeto

```
backend/
├── app.js                 # Arquivo principal do servidor
├── routes.js              # Configuração das rotas
├── controller/
│   └── cadastroController.js  # Endpoints de cadastro e login
├── service/
│   └── cadastroService.js     # Lógica de negócio
├── repository/
│   ├── connect.js             # Conexão com o banco de dados
│   └── cadastroRepository.js  # Consultas SQL
├── validation/
│   └── cadastroValidation.js  # Validações de entrada
├── auth/
│   └── jwt.js                 # Geração e verificação de tokens JWT
├── database.sql           # Script de criação do banco de dados
├── package.json           # Dependências e scripts
└── .env                   # Variáveis de ambiente (não versionado)
```

## Instalação e Configuração

1. **Instalar dependências:**
   ```
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   Crie um arquivo `.env` na pasta `backend` com as seguintes variáveis:
   ```
   API_PORTA=3000
   MYSQL_HOST=localhost
   MYSQL_USER=seu_usuario_mysql
   MYSQL_PASS=sua_senha_mysql
   MYSQL_DB=motoristas_vendedores
   KEY=sua_chave_secreta_jwt
   ```

3. **Configurar o banco de dados:**
   - Execute o script `database.sql` no seu servidor MySQL para criar as tabelas necessárias.
   - A tabela `Usuarios` não está no script atual, mas é usada no código. Adicione-a conforme necessário.

## Como Executar

- **Desenvolvimento (com Nodemon):**
  ```
  npm start
  ```
  ou
  ```
  npx nodemon app.js
  ```

- **Produção:**
  ```
  node app.js
  ```

O servidor iniciará na porta definida em `API_PORTA` (padrão: 3000).

## Endpoints da API

### POST /entrar
Realiza login do usuário.

**Corpo da requisição:**
```json
{
  "usuario": "email@exemplo.com",
  "senha": "senha123"
}
```

**Resposta de sucesso:**
```json
{
  "token": "jwt_token_aqui"
}
```

### POST /criar
Cadastra um novo usuário.

**Corpo da requisição:**
```json
{
  "idInstituicao": 1,
  "usuario": "email@exemplo.com",
  "senha": "senha123",
  "role": "ADMIN"
}
```

**Resposta de sucesso:**
```json
{
  "token": "jwt_token_aqui"
}
```

### GET /consultar/usuario?id=1
Consulta um usuário pelo ID.

**Resposta de sucesso:**
```json
{
  "usuario": { ...dados do usuário... }
}
```

## Autenticação

A API utiliza JWT para autenticação. Inclua o token no header `Authorization` como `Bearer <token>` para endpoints protegidos.

## Observações

- As senhas são criptografadas usando MD5 (não recomendado para produção; considere usar bcrypt).
- O código tem algumas inconsistências nos mapeamentos de campos entre controller, service e repository que precisam ser corrigidas.
- A tabela `Usuarios` referenciada no código não está definida no `database.sql`; ajuste conforme necessário.

## Desenvolvimento

Para contribuir:
1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença

Este projeto é parte do Projeto Integrador do curso ADS.
