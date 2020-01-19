const { UserInputError } = require('apollo-server');
const axios = require('axios');

const { Dev } = require('./models');

const getParsedName = name => {
  const parsedName = name.trim();
  if (!parsedName) throw new UserInputError('EMPTY_NAME');
  return parsedName;
};

const getAllDevs = () => Dev.getAll();

const getDev = ({ id }, context = {}) => Dev.getById(id, context.reqId);

const getDevByGithubUsername = ({ githubUsername }, context = {}) =>
  Dev.getByGithubUsername(githubUsername, context.reqId);

const createDev = async ({ githubUsername, techs, latitude, longitude }, context = {}) => {
  const parsedGithubUsername = getParsedName(githubUsername);
  const dev = await Dev.getByGithubUsername(parsedGithubUsername, context.reqId);

  if (dev) return Dev.update(dev.id, { techs, latitude, longitude });

  const {
    data: { name, login, avatar_url: avatarUrl, bio },
  } = await axios.get(`https://api.github.com/users/${githubUsername}`);
  return Dev.create({
    githubUsername: parsedGithubUsername,
    name: name || login,
    avatarUrl,
    bio,
    techs,
    latitude,
    longitude,
  });
};

const updateDev = async ({ id, name, avatarUrl, bio, techs, latitude, longitude }) => {
  const dev = await Dev.update(id, { name, avatarUrl, bio, techs, latitude, longitude });
  if (!dev) throw new UserInputError('DEV_NOT_FOUND', { invalieArgs: [id] });
  return dev;
};

const removeDev = async ({ id }) => {
  const dev = await Dev.remove(id);
  if (!dev) throw new UserInputError('DEV_NOT_FOUND', { invalieArgs: [id] });
  return dev;
};

const filterNearDevsByTechs = async ({ latitude, longitude, techs }) =>
  Dev.filterNearByTechs({ latitude, longitude, techs });

module.exports = { createDev, filterNearDevsByTechs, getAllDevs, getDev, getDevByGithubUsername, removeDev, updateDev };
