const knex = require('knex');
const { Query, types } = require('pg');

const config = require('../../knexfile');

if (process.env.NODE_ENV !== 'production') {
  const actualSubmit = Query.prototype.submit;

  types.setTypeParser(20, val => parseInt(val, 10));

  types.setTypeParser(1114, stringValue => new Date(`${stringValue}+0000`));
  /* eslint-disable-next-line */
  Query.prototype.submit = function(...args) {
    const { text, values } = this;
    const query = (values || []).reduce((q, v, i) => q.replace(`$${i + 1}`, v), text);
    global.console.log(query);
    actualSubmit.apply(this, args);
  };
}
module.exports = knex(config);
