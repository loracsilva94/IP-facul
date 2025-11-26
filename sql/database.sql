CREATE DATABASE IF NOT EXISTS motoristas_vendedores;
USE motoristas_vendedores;

CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    cidade VARCHAR(100),
    funcao ENUM('ADMIN', 'MOTORISTA') NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Servico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_motorista INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    preco_medio DECIMAL(10,2),
    descricao TEXT,
    FOREIGN KEY (id_motorista) REFERENCES Usuarios(id)
);

CREATE TABLE Venda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_servico INT NOT NULL,
    data_venda DATETIME DEFAULT CURRENT_TIMESTAMP,
    -- Campos para endereço completo do local de venda
    cep VARCHAR(9),                    -- CEP (ex: 12345-678)
    bairro VARCHAR(100),               -- Bairro
    logradouro VARCHAR(200),           -- Logradouro (rua, avenida, etc.)
    numero VARCHAR(10),                -- Número do logradouro
    quantidade INT DEFAULT 1,
    valor_total DECIMAL(10,2),
    FOREIGN KEY (id_servico) REFERENCES Servicos(id)
);


CREATE TABLE HorariosBons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_motorista INT NOT NULL,
    cep VARCHAR(9),
    bairro VARCHAR(100),
    horario TIME,
    media_lucro DECIMAL(10,2),
    recomendacao VARCHAR(200),
    FOREIGN KEY (id_motorista) REFERENCES Usuarios(id)
);
