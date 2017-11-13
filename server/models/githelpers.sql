DROP DATABASE IF EXISTS githelpers;
CREATE DATABASE githelpers;

\c githelpers;

CREATE TABLE events (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  time BIGINT,
);

-- TODO: add issues table 
-- (or figure out alternative way of indexing/aggregating user issues with the githelpers tag)

-- INSERT INTO events (name, time)
--   VALUES ('new registration', '1');