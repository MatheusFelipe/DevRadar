const knex = require('../knex');

const { createOneToOneLoader } = require('../loaders');

const DEVS = 'devs';

const devKeys = ['id', 'name', 'githubUsername', 'bio', 'avatarUrl', 'createdAt', 'updatedAt', 'coordinates', 'techs'];

const makePoint = ({ latitude, longitude }) => knex.raw(`point(${longitude},${latitude})`);

const parsePayload = payload => {
  const parsedPayload = {};
  devKeys.forEach(key => {
    if (key in payload && key !== 'id') parsedPayload[key] = payload[key];
  });
  if (payload.techs) parsedPayload.techs = payload.techs.map(tech => tech.trim());
  if (typeof payload.latitude === 'number' && typeof payload.longitude === 'number')
    parsedPayload.coordinates = makePoint({ latitude: payload.latitude, longitude: payload.longitude });
  return parsedPayload;
};

const devByIdLoader = reqId =>
  createOneToOneLoader(ids => knex(DEVS).whereIn('id', ids), ['id'], { reqId, name: 'devByIdLoader' });

const devByGithubUsernameLoader = reqId =>
  createOneToOneLoader(names => knex(DEVS).whereIn('githubUsername', names), ['githubUsername'], {
    reqId,
    name: 'devByGithubUsername',
  });

const Dev = {
  create: payload =>
    knex(DEVS)
      .insert(parsePayload(payload))
      .returning('*')
      .then(([record]) => record),

  update: (id, payload) =>
    knex(DEVS)
      .update({ ...parsePayload(payload), updatedAt: knex.fn.now() })
      .where({ id })
      .returning('*')
      .then(([record]) => record),

  remove: id =>
    knex(DEVS)
      .where({ id })
      .del()
      .returning('*')
      .then(([record]) => record),

  getById: (id, reqId) => devByIdLoader(reqId)().load(id),

  getByGithubUsername: (githubUsername, reqId) => devByGithubUsernameLoader(reqId)().load(githubUsername),

  getAll: async () => knex(DEVS).orderBy('id'),

  filterNearByTechs: async ({ latitude, longitude, techs }) => {
    if (!techs.length) return [];
    return knex
      .select('d.*')
      .from(knex.raw(`${DEVS} as d, unnest(techs) devTechs(x)`))
      .joinRaw(
        `join unnest(array [${techs
          .map(tech => `'${tech.trim().replace(/[',"]/g, '')}'`)
          .join()}]) inputTechs(x) on devTechs.x ilike inputTechs.x`
      )
      .whereRaw(`d.coordinates <@> ${makePoint({ latitude, longitude })} < 6.21371`)
      .groupBy('d.id');
  },
};

module.exports = { Dev };
