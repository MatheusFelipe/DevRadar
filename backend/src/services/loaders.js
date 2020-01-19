const Dataloader = require('dataloader');

let requestsLoaders = {};

const startRequestLoaders = id => {
  if (Object.keys(requestsLoaders).length > 1000) requestsLoaders = {};
  requestsLoaders[id] = {};
};

const resetRequestLoaders = id => {
  delete requestsLoaders[id];
};

const registerLoader = (loadFn, keys) => {
  const reqLoaders = requestsLoaders[keys.reqId];
  const loaderKey = keys.name;
  return () => {
    if (!(loaderKey in reqLoaders)) reqLoaders[loaderKey] = new Dataloader(loadFn);
    return reqLoaders[loaderKey];
  };
};

const generateKeys = (row, targetFields) => targetFields.map(fields => row[fields]).join();

const createOneToOneLoader = (query, targetFields, keys) =>
  registerLoader(
    ids =>
      query(ids).then(rows => {
        const batch = {};
        rows.forEach(row => {
          batch[generateKeys(row, targetFields)] = row;
        });
        return ids.map(id => batch[id]);
      }),
    keys
  );

const createOneToManyLoader = (query, targetFields, keys) =>
  registerLoader(
    ids =>
      query(ids).then(rows => {
        const batch = {};
        ids.forEach(id => {
          batch[id] = [];
        });
        rows.forEach(row => batch[generateKeys(row, targetFields)].push(row));
        return ids.map(id => batch[id]);
      }),
    keys
  );

module.exports = { startRequestLoaders, resetRequestLoaders, createOneToOneLoader, createOneToManyLoader };
