DROP DATABASE IF EXISTS githelpers;
CREATE DATABASE githelpers;

\c githelpers;

CREATE TABLE events (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  time BIGINT,
);

-- INSERT INTO events (name, time)
--   VALUES ('new registration', '1');