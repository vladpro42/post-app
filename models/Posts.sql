CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    title varchar(255) NOT NULL,
    text text NOT NULL,
    tags varchar[],
    avatar_url varchar(255),
    user_id int REFERENCES users(id)
);