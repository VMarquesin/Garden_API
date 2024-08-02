ALTER TABLE psicologo
CHANGE diario_id diario_id INT AUTO_INCREMENT PRIMARY KEY default 0;

ALTER TABLE diario
MODIFY COLUMN diario_id INT AUTO_INCREMENT PRIMARY KEY;

drop table diario

CREATE TABLE diario (
    diario_id INT AUTO_INCREMENT PRIMARY KEY,
    paciente_id INT,
    diario_relato VARCHAR(2000) NOT NULL,
    diario_data DATETIME DEFAULT '0000-00-00 00:00:00',
    FOREIGN KEY (paciente_id) REFERENCES paciente(paciente_id)
);
drop table diario

select * from usuarios

INSERT INTO paciente
            (paciente_id,  paci_telefone, paci_cpf, paci_filho,  paci_escolaridade,
            paci_data_nasc,  paci_trabalho, paci_estado_civil, paci_status )
            VALUES (4, 111111, ?, ?, ?, ?, ?, ?, ?)
select * from diario

drop table psicologo 

ALTER TABLE atividade
ADD FOREIGN KEY (psi_id) REFERENCES psicologo(psi_id)

ALTER TABLE psi_anotacao
ADD FOREIGN KEY (psi_id) REFERENCES psicologo(psi_id)

ALTER TABLE data_sessao
ADD FOREIGN KEY (psi_id) REFERENCES psicologo(psi_id);

ALTER TABLE ppr
ADD FOREIGN KEY (psi_id) REFERENCES psicologo(psi_id)

ALTER TABLE endereco_usuario
ADD FOREIGN KEY (psi_id) REFERENCES psicologo(psi_id);

ALTER TABLE lembrete
ADD FOREIGN KEY (psi_id) REFERENCES psicologo(psi_id);


-- Apagar todas as tabelas do banco

SHOW TABLES;

SET FOREIGN_KEY_CHECKS = 0;

SET @tables = NULL;
SELECT GROUP_CONCAT('`', table_name, '`') INTO @tables
FROM information_schema.tables
WHERE table_schema = (SELECT DATABASE());

SET @tables = IFNULL(@tables, 'DUMMY_TABLE_DOES_NOT_EXIST');
SET @stmt = CONCAT('DROP TABLE IF EXISTS ', @tables);
PREPARE stmt FROM @stmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET FOREIGN_KEY_CHECKS = 1;

