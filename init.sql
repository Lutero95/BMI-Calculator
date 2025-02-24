CREATE TABLE imc_results (
                             id INT AUTO_INCREMENT PRIMARY KEY,
                             nome VARCHAR(255) NOT NULL,
                             altura FLOAT NOT NULL,
                             peso FLOAT NOT NULL,
                             imc FLOAT NOT NULL,
                             classificacao VARCHAR(50) NOT NULL,
                             data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
