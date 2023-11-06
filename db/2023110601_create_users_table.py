"""
Create table users
"""

from yoyo import step

__depends__ = {}

steps = [
    step("""
        CREATE TABLE users (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(30) NULL,
            email VARCHAR(250) NOT NULL,
            password BINARY(60) NULL,
            phone_number VARCHAR(25) NULL,
            gender VARCHAR(25) NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
            deleted_at TIMESTAMP NULL
        );
    """)
]
