CREATE DATABASE IF NOT EXISTS motoristas_vendedores;
USE motoristas_vendedores;

CREATE TABLE Motorista (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100),
    cidade VARCHAR(100),
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Servico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_motorista INT NOT NULL,
    nome VARCHAR(100) NOT NULL,       -- Ex: "Venda de Ovos", "Churros"
    preco_medio DECIMAL(10,2),
    descricao TEXT,
    FOREIGN KEY (id_motorista) REFERENCES Motorista(id)
);

-- 3️⃣ VENDA
CREATE TABLE Venda (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_servico INT NOT NULL,
    data_venda DATETIME DEFAULT CURRENT_TIMESTAMP,
    local_venda VARCHAR(150),          -- pode armazenar CEP ou endereço
    quantidade INT DEFAULT 1,
    valor_total DECIMAL(10,2),
    FOREIGN KEY (id_servico) REFERENCES Servico(id)
);

CREATE TABLE HorarioBom (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_motorista INT NOT NULL,
    cep VARCHAR(9),
    bairro VARCHAR(100),
    horario TIME,
    media_lucro DECIMAL(10,2),
    recomendacao VARCHAR(200),
    FOREIGN KEY (id_motorista) REFERENCES Motorista(id)
);
