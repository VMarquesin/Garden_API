CREATE TABLE usuarios (
    usu_id INT AUTO_INCREMENT PRIMARY KEY,
    usu_nome VARCHAR(60) NOT NULL,
    usu_nick VARCHAR(30) NOT NULL UNIQUE,
    usu_email VARCHAR(80) NOT NULL UNIQUE,
    usu_senha VARCHAR(255) NOT NULL,
    usu_adm BIT NOT NULL
);

CREATE TABLE paciente (
    pac_id INT AUTO_INCREMENT PRIMARY KEY,
    pac_telefone VARCHAR(16) NOT NULL,
    pac_cpf CHAR(11) NOT NULL UNIQUE,
    pac_filho INT,
    pac_escolaridade VARCHAR(50) NOT NULL,
    pac_data_nasc DATE NOT NULL,
    pac_trabalho VARCHAR(50) NOT NULL,
    pac_estado_civil VARCHAR(50) NOT NULL,
    pac_status BOOLEAN,
    usu_id INT not null,
    FOREIGN KEY (usu_id) REFERENCES usuarios(usu_id)
);

CREATE TABLE diario (
    dia_id INT AUTO_INCREMENT PRIMARY KEY,
    pac_id INT not null,
    dia_relato LONGTEXT,
    dia_data DATETIME,
    FOREIGN KEY (pac_id) REFERENCES paciente(pac_id)
);

CREATE TABLE emocao (
    emo_id INT AUTO_INCREMENT PRIMARY KEY,
    emo_descricao VARCHAR(80) NOT NULL
);

CREATE TABLE emocao_paciente (
    epa_id INT AUTO_INCREMENT PRIMARY KEY,
    emo_id INT NOT NULL,
    emo_data DATETIME,
    pac_id INT not null,
    FOREIGN KEY (emo_id) REFERENCES emocao(emo_id),
    FOREIGN KEY (pac_id) REFERENCES paciente(pac_id)
);

CREATE TABLE psicologo (
    psi_id INT AUTO_INCREMENT PRIMARY KEY,
    psi_endereco VARCHAR(100) NOT NULL,
    psi_cnpj CHAR(14) NOT NULL UNIQUE,
    usu_id INT not null,
    FOREIGN KEY (usu_id) REFERENCES usuarios(usu_id)
);

CREATE TABLE pais (
  pas_id int(11) NOT NULL PRIMARY KEY,
  pas_nome varchar(60) DEFAULT NULL,
  pas_nome_pt varchar(60) DEFAULT NULL,
  pas_sigla varchar(2) DEFAULT NULL,
  pas_bacen int(5) DEFAULT NULL
);

CREATE TABLE estado (
  est_id int(11) NOT NULL PRIMARY KEY,
  est_nome varchar(75) DEFAULT NULL,
  est_uf varchar(2) DEFAULT NULL,
  est_ibge int(2) DEFAULT NULL,
  est_ddd varchar(50) DEFAULT NULL
);


CREATE TABLE cidade (
  cid_id int(11) NOT NULL PRIMARY KEY,
  cid_nome varchar(120) DEFAULT NULL,
  cid_uf int(2) DEFAULT NULL,
  cid_ibge int(7) DEFAULT NULL
);

CREATE TABLE bairro (
  bai_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  bai_nome VARCHAR(125),
  cid_id INT,
  FOREIGN KEY (cid_id) REFERENCES cidade(cid_id)
);


CREATE TABLE endereco (
    end_id INT AUTO_INCREMENT PRIMARY KEY,    
    end_cep VARCHAR(20) NOT NULL,    
    end_rua VARCHAR(50) NOT NULL,
    bai_id INT,
    FOREIGN KEY (bai_id) REFERENCES bairro(bai_id)
);

CREATE TABLE endereco_usuario (
    eus_id INT AUTO_INCREMENT PRIMARY KEY,
    bai_id INT NOT NULL,
	end_numero INT,
	end_complemento VARCHAR(50),
    pac_id INT,
    psi_id INT,
    FOREIGN KEY (psi_id) REFERENCES psicologo(psi_id),
    FOREIGN KEY (pac_id) REFERENCES paciente(pac_id),
    FOREIGN KEY (bai_id) REFERENCES bairro(bai_id)
);


CREATE TABLE atividade (
    ati_id INT AUTO_INCREMENT PRIMARY KEY,
    ati_descricao VARCHAR(350) NOT NULL,
    ati_data DATETIME,
    psi_id INT NOT NULL,
    FOREIGN KEY (psi_id) REFERENCES psicologo(psi_id)
);

CREATE TABLE atividade_paciente (
    apa_id INT AUTO_INCREMENT PRIMARY KEY,
    ati_id INT,
    pac_id INT NOT NULL,
    FOREIGN KEY (ati_id) REFERENCES atividade(ati_id),
    FOREIGN KEY (pac_id) REFERENCES paciente(pac_id)
);

CREATE TABLE paciente_psi_relacao (
    ppr_id INT AUTO_INCREMENT PRIMARY KEY,
    pac_id INT not null,
    psi_id INT not null,
    ppr_datainicial DATE,
    ppr_datafinal DATE,
    FOREIGN KEY (pac_id) REFERENCES paciente(pac_id),
    FOREIGN KEY (psi_id) REFERENCES psicologo(psi_id)
);

CREATE TABLE psi_anotacao (
    pan_id INT AUTO_INCREMENT PRIMARY KEY,
    psi_id INT not null,
    pan_anotacao LONGTEXT,
    pan_anotacao_data DATETIME,
    pac_id INT NOT NULL,
    FOREIGN KEY (psi_id) REFERENCES psicologo(psi_id),
    FOREIGN KEY (pac_id) REFERENCES paciente(pac_id)
);


CREATE TABLE data_sessao (
    dse_id INT AUTO_INCREMENT PRIMARY KEY,
    psi_id INT,
    pac_id INT,
    dse_sessao_data DATETIME,
    FOREIGN KEY (psi_id) REFERENCES psicologo(psi_id),
    FOREIGN KEY (pac_id) REFERENCES paciente(pac_id)
);

CREATE TABLE lembrete (
    lem_id INT AUTO_INCREMENT PRIMARY KEY,
    lem_psi LONGTEXT,
    lem_data DATETIME,
    psi_id INT not null,
    pac_id INT not null,
    FOREIGN KEY (psi_id) REFERENCES psicologo(psi_id),
    FOREIGN KEY (pac_id) REFERENCES paciente(pac_id)
);
