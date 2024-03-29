CREATE TABLE if not exists task_table (
    task_id INT NOT NULL AUTO_INCREMENT,
    task_detail TEXT NOT NULL,
    task_completed BOOLEAN NOT NULL DEFAULT FALSE,
    done_by VARCHAR(255) NOT NULL,
    done_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (task_id)
);

CREATE TABLE if not exists later_table (
    later_id INT NOT NULL AUTO_INCREMENT,
    later_detail TEXT NOT NULL,
    task_assignee VARCHAR(255) NOT NULL,
    completion_time VARCHAR(255) NOT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (later_id)
);

CREATE TABLE if not exists tomorrow_table (
    tomorrow_id INT NOT NULL AUTO_INCREMENT,
    tomorrow_detail TEXT NOT NULL,
    task_assignee VARCHAR(255) NOT NULL,
    completion_time VARCHAR(255) NOT NULL,
    registered_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (tomorrow_id)
);

CREATE TABLE if not exists employee (
    employee_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(32),
    job_title VARCHAR(32) NOT NULL,
    registered_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (employee_id)
);