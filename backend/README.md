# Backend - Projeto Integrador ADS

Este é o backend da aplicação do Projeto Integrador do curso de Análise e Desenvolvimento de Sistemas (ADS). A aplicação gerencia motoristas e vendedores ambulantes, permitindo cadastro, login, gerenciamento de serviços, vendas e horários recomendados.

## Tecnologias Utilizadas

- Node.js com Express.js para servidor web
- MySQL2 para conexão com banco MySQL
- JWT para autenticação
- CORS para permitir requisições cross-origin
- Dotenv para variáveis de ambiente
- Nodemon para desenvolvimento com reinício automático
- Crypto para criptografia MD5 de senhas

## Estrutura do Projeto

```
backend/
├── app.js                 # Arquivo principal do servidor
├── routes.js              # Configuração das rotas
├── controller/            # Definição dos endpoints
├── service/               # Lógica de negócio
├── repository/            # Queries SQL e conexão com DB
├── validation/            # Validações dos dados recebidos
├── auth/                  # Autenticação JWT
├── database.sql           # Script de criação do banco de dados
├── package.json           # Dependências e scripts
└── .env                   # Variáveis de ambiente (não versionado)
```

## Configuração e Execução

1. Instale as dependências:
```
npm install
```

2. Configure o banco de dados MySQL e crie as tabelas executando o script `database.sql`.

3. Crie o arquivo `.env` na pasta backend com as variáveis:

```
API_PORTA=3000
MYSQL_HOST=localhost
MYSQL_USER=seu_usuario_mysql
MYSQL_PASS=sua_senha_mysql
MYSQL_DB=motoristas_vendedores
KEY=sua_chave_secreta_jwt
```

4. Inicie o servidor:

- Em desenvolvimento (com nodemon):
```
npm start
```
- Em produção:
```
node app.js
```

O servidor será executado na porta definida na variável `API_PORTA`.

## Endpoints da API

### Usuários

- POST `/entrar` — Login
  - Body JSON: `{ "nome": "...", "email": "...", "senha": "..." }`
  - Retorna: Token JWT

- POST `/criar` — Cadastro de usuário
  - Body JSON: `{ "usuario": "...", "email": "...", "senha": "...", "telefone": "...", "cidade": "...", "funcao": "MOTORISTA" }`
  - Retorna: ID e token JWT

- GET `/consultar/usuario/:id` — Consulta por ID
  - Retorna dados do usuário

- DELETE `/deletar/usuario/:id` — Deletar usuário

- PUT `/atualizar/usuario/:id` — Atualizar usuário

- GET `/listar/usuarios` — Listar todos os usuários

### Serviços

- GET `/servicos` — Listar serviços
- GET `/servicos/:id` — Consultar serviço por ID
- POST `/servicos` — Criar novo serviço
- PUT `/servicos/:id` — Atualizar serviço
- DELETE `/servicos/:id` — Deletar serviço

### Vendas

- GET `/vendas` — Listar vendas
- GET `/vendas/:id` — Consultar venda por ID
- POST `/vendas` — Criar nova venda
  - Body JSON exemplo:
  ```json
  {
    "id_servico": 1,
    "cep": "12345-678",
    "bairro": "Centro",
    "logradouro": "Rua A",
    "numero": "100",
    "quantidade": 2,
    "valor_total": 150.00
  }
  ```
- PUT `/vendas/:id` — Atualizar venda
  - Body JSON igual ao POST
- DELETE `/vendas/:id` — Deletar venda

### Horários Bons

- GET `/horarios-bons` — Listar horários bons
- GET `/horarios-bons/:id` — Consultar horário bom por ID
- POST `/horarios-bons` — Criar horário bom
- PUT `/horarios-bons/:id` — Atualizar horário bom
- DELETE `/horarios-bons/:id` — Deletar horário bom

## Autenticação

- A API utiliza JWT para autenticação.
- Inclua o token no header `Authorization` como `Bearer <token>` para endpoints protegidos.

## Considerações

- Senhas são criptografadas com MD5 (não recomendado para produção).
- Certifique-se que os IDs referenciados (como `id_servico` em vendas) existam para evitar erros de chave estrangeira.

## Desenvolvimento

Sinta-se à vontade para contribuir criando forks e pull requests.

---

