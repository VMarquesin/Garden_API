CREATE TABLE usuarios (
    usu_id INT  AUTO_INCREMENT PRIMARY KEY,
    usu_nome VARCHAR(40) NOT NULL,
    usu_nick VARCHAR(30) NOT NULL,
    usu_email VARCHAR(80) NOT NULL,
    usu_senha VARCHAR(20) NOT NULL,
    usu_adm BIT NOT NULL
);
CREATE TABLE paciente (
    paciente_id INT PRIMARY KEY DEFAULT 0,
    paci_telefone VARCHAR(16) NOT NULL,
    paci_cpf VARCHAR(15) NOT NULL,
    paci_filho INT DEFAULT 0,
    paci_escolaridade VARCHAR(50) NOT NULL,
    paci_data_nasc DATE NOT NULL,
    paci_trabalho VARCHAR(50) NOT NULL,
    paci_estado_civil VARCHAR(50) NOT NULL,
    paci_status BOOLEAN DEFAULT 0,
    FOREIGN KEY (paciente_id) REFERENCES usuarios(usu_id)
);

CREATE TABLE diario (
    diario_id INT AUTO_INCREMENT PRIMARY KEY DEFAULT 0,
    paciente_id INT DEFAULT 0,
    diario_relato VARCHAR(2000) NOT NULL,
    diario_data DATETIME DEFAULT '0000-00-00 00:00:00',
    FOREIGN KEY (paciente_id) REFERENCES paciente(paciente_id)
);


CREATE TABLE emocao (
    emo_id INT AUTO_INCREMENT PRIMARY KEY,
    emo_descricao VARCHAR(80) NOT NULL
);

CREATE TABLE emocao_paciente (
    epa_id INT AUTO_INCREMENT PRIMARY KEY,
    emo_id INT NOT NULL,
    emo_data DATETIME DEFAULT '0000-00-00 00:00:00',
    paciente_id INT DEFAULT 0,
    FOREIGN KEY (emo_id) REFERENCES emocao(emo_id),
    FOREIGN KEY (paciente_id) REFERENCES paciente(paciente_id)
);

CREATE TABLE endereco (
    endereco_id INT AUTO_INCREMENT PRIMARY KEY,
    cep VARCHAR(20) NOT NULL,
    bairro VARCHAR(50) NOT NULL,
    rua VARCHAR(50) NOT NULL,
    numero INT NOT NULL,
    complemento VARCHAR(25)    
);

CREATE TABLE endereco_usuario (
	endereco_id INT PRIMARY KEY,
    paciente_id INT NOT NULL,
    psi_id INT NOT NULL,
    FOREIGN KEY (psi_id) REFERENCES psicologo(psi_id),
    FOREIGN KEY (paciente_id) REFERENCES paciente(paciente_id),
    FOREIGN KEY (endereco_id) REFERENCES endereco(endereco_id)
);


CREATE TABLE psicologo (
    psi_id INT AUTO_INCREMENT PRIMARY KEY,
    endereco VARCHAR(100) NOT NULL,
    cnpj VARCHAR(14) NOT NULL,
    FOREIGN KEY (psi_id) REFERENCES usuarios(usu_id)
);


CREATE TABLE atividade (
    ati_id INT AUTO_INCREMENT PRIMARY KEY,
    ati_descricao VARCHAR(350) NOT NULL,
    atividade_data DATETIME DEFAULT '0000-00-00 00:00:00',
    psi_id INT NOT NULL,
    FOREIGN KEY (psi_id) REFERENCES psicologo(psi_id)
);

CREATE TABLE atividade_paciente (
    apa_id INT AUTO_INCREMENT PRIMARY KEY,
    ati_id INT DEFAULT 0,
    paciente_id INT NOT NULL,
    UNIQUE (apa_id),
    FOREIGN KEY (ati_id) REFERENCES atividade(ati_id),
    FOREIGN KEY (paciente_id) REFERENCES paciente(paciente_id)
);

CREATE TABLE ppr (
    ppr INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT DEFAULT 0,
    psi_id INT DEFAULT 0,
    ppr_datainicial DATE DEFAULT '0000-00-00',
    ppr_datafinal DATE DEFAULT '0000-00-00',
    FOREIGN KEY (paciente_id) REFERENCES paciente(paciente_id),
    FOREIGN KEY (psi_id) REFERENCES psicologo(psi_id)
);


CREATE TABLE psi_anotacao (
    psi_anotacao_id INT AUTO_INCREMENT PRIMARY KEY,
    psi_id INT DEFAULT 0,
    anotacao VARCHAR(2000),
    anotacao_data DATETIME DEFAULT '0000-00-00 00:00:00',
    paciente_id INT NOT NULL,
    FOREIGN KEY (psi_id) REFERENCES psicologo(psi_id),
    FOREIGN KEY (paciente_id) REFERENCES paciente(paciente_id)
);

CREATE TABLE data_sessao (
    dtsec_id INT AUTO_INCREMENT PRIMARY KEY,
    psi_id INT,
    paciente_id INT,
    FOREIGN KEY (psi_id) REFERENCES psicologo(psi_id),
    FOREIGN KEY (paciente_id) REFERENCES paciente(paciente_id)
);

CREATE TABLE lembrete (
    lembrete_id INT AUTO_INCREMENT PRIMARY KEY,
    lembrete_psi VARCHAR(300) NOT NULL,
    psi_id INT,
    paciente_id INT,
    FOREIGN KEY (psi_id) REFERENCES psicologo(psi_id),
    FOREIGN KEY (paciente_id) REFERENCES paciente(paciente_id)
);
