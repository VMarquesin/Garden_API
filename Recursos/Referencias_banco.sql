CREATE TABLE IF NOT EXISTS `paciente` (
	`paciente_id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`paciente_nome_completo` varchar(100) NOT NULL,
	`paciente_nome_usuario` varchar(50) NOT NULL,
	`paciente_telefone` varchar(16) NOT NULL,
	`paciente_idade` int NOT NULL,
	`paciente_filho` int,
	`paciente_escolaridade` varchar(50) NOT NULL,
	`paciente_trabalho` varchar(50) NOT NULL,
	`paciente_estado_civil` varchar(50) NOT NULL,
	`paciente_medicamento` varchar(100) NOT NULL,
	`tus_id` int NOT NULL,
	PRIMARY KEY (`paciente_id`)
);

CREATE TABLE IF NOT EXISTS `TipoUsuario` (
	`tus_id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`tus_descricao` varchar(30) NOT NULL,
	PRIMARY KEY (`tus_id`)
);

CREATE TABLE IF NOT EXISTS `emocao` (
	`emo_id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`emo_descricao` varchar(20) NOT NULL,
	PRIMARY KEY (`emo_id`)
);

CREATE TABLE IF NOT EXISTS `diario` (
	`diario_id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`paciente_id` int NOT NULL,
	`emo_id` int NOT NULL,
	`diario_relato` varchar(2000) NOT NULL,
	`diario_data` datetime NOT NULL,
	PRIMARY KEY (`diario_id`)
);

CREATE TABLE IF NOT EXISTS `psicologo` (
	`psi_id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`psi_nome_completo` varchar(100) NOT NULL,
	`psi_email` varchar(100) NOT NULL,
	`psi_nome_usuario` varchar(50) NOT NULL,
	`psi_crp` varchar(20) NOT NULL,
	`tus_id` int NOT NULL,
	PRIMARY KEY (`psi_id`)
);

CREATE TABLE IF NOT EXISTS `adm` (
	`tus_id` int AUTO_INCREMENT NOT NULL UNIQUE,
	PRIMARY KEY (`tus_id`)
);

CREATE TABLE IF NOT EXISTS `ppr` (
	`ppr` int AUTO_INCREMENT NOT NULL UNIQUE,
	`paciente_id` int NOT NULL UNIQUE,
	`psi_id` int NOT NULL UNIQUE,
	`ppr_datainicial` datetime NOT NULL,
	`ppr_datafinal` datetime NOT NULL,
	PRIMARY KEY (`ppr`)
);

CREATE TABLE IF NOT EXISTS `psi_anotacao` (
	`psi_anotacao_id` int AUTO_INCREMENT NOT NULL,
	`psi_id` int NOT NULL,
	`anotacao` varchar(2000),
	`anotacao_data` datetime NOT NULL,
	PRIMARY KEY (`psi_anotacao_id`)
);

ALTER TABLE `paciente` ADD CONSTRAINT `paciente_fk10` FOREIGN KEY (`tus_id`) REFERENCES `TipoUsuario`(`tus_id`);


ALTER TABLE `diario` ADD CONSTRAINT `diario_fk1` FOREIGN KEY (`paciente_id`) REFERENCES `paciente`(`paciente_id`);

ALTER TABLE `diario` ADD CONSTRAINT `diario_fk2` FOREIGN KEY (`emo_id`) REFERENCES `emocao`(`emo_id`);
ALTER TABLE `psicologo` ADD CONSTRAINT `psicologo_fk5` FOREIGN KEY (`tus_id`) REFERENCES `TipoUsuario`(`tus_id`);
ALTER TABLE `adm` ADD CONSTRAINT `adm_fk0` FOREIGN KEY (`tus_id`) REFERENCES `TipoUsuario`(`tus_id`);
ALTER TABLE `ppr` ADD CONSTRAINT `ppr_fk1` FOREIGN KEY (`paciente_id`) REFERENCES `paciente`(`paciente_id`);

ALTER TABLE `ppr` ADD CONSTRAINT `ppr_fk2` FOREIGN KEY (`psi_id`) REFERENCES `psicologo`(`psi_id`);
ALTER TABLE `psi_anotacao` ADD CONSTRAINT `psi_anotacao_fk1` FOREIGN KEY (`psi_id`) REFERENCES `psicologo`(`psi_id`);