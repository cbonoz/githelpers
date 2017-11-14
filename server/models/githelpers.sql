-- DROP DATABASE IF EXISTS githelpers;
CREATE DATABASE IF NOT EXISTS githelpers;

\c githelpers;

CREATE TABLE issues (
  ID SERIAL PRIMARY KEY,
  body VARCHAR,
  url VARCHAR,
  languages VARCHAR(64)
  title VARCHAR(64)
  created VARCHAR(64)
  state VARCHAR(10)
);

CREATE TABLE events (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  time BIGINT,
);

-- TODO: add issues table 
-- (or figure out alternative way of indexing/aggregating user issues with the githelpers tag)

-- INSERT INTO events (name, time)
--   VALUES ('new registration', '1');