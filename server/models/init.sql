-- DROP DATABASE IF EXISTS githelpers;
CREATE DATABASE githelpers;

\c githelpers;

CREATE TABLE issues (
  ID SERIAL PRIMARY KEY,
  body VARCHAR,
  url VARCHAR,
  languages VARCHAR(64),
  title VARCHAR(64),
  created VARCHAR(64),
  state VARCHAR(10),
  creator VARCHAR(20)
);

CREATE TABLE events (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  time BIGINT
);

-- TODO: add issues table 
-- (or figure out alternative way of indexing/aggregating user issues with the githelpers label )

-- INSERT INTO events (name, time)
--   VALUES ('new registration', '1');

-- INSERT INTO issues (id, body, url, languages, title, created, state, creator)
-- VALUES (85198176 ,'Toast Hackathon 3/16/17 - Preorder Aggregation Server',
--         'https://api.github.com/repos/cbuonocore-toasttab/toast-hack-preorder',
--         'JavaScript', 'toast-hack-preorder', '2017-03-16T13:19:40Z', 'open', 'dockerz'
--         );

-- INSERT INTO issues (id, body, url, languages, title, created, state, creator)
-- VALUES (1234 ,'Testing',
--         'https://api.github.com/repos/cbuonocore-toasttab/toast-hack-preorder',
--         'JavaScript', 'test', '2017-03-16T13:19:40Z', 'open', 'rtre84'
--         );