CREATE TABLE task_table (
    task_id INT NOT NULL AUTO_INCREMENT,
    task_detail TEXT NOT NULL,
    task_completed BOOLEAN NOT NULL DEFAULT FALSE,
    done_by VARCHAR(255) NOT NULL,
    done_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (task_id)
);