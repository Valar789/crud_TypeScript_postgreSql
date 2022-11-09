CREATE TABLE IF NOT EXISTS task(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(200),
    created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)

INSERT INTO task(title, description) VALUES('Task 1', 'Description 1');