const Dataloader = require('dataloader');
const uuid = require('uuid/v4');

let requestsLoaders = {};

const startRequestLoaders = id => {
  if (Object.keys(requestsLoaders).length > 1000) requestsLoaders = {};
  requestsLoaders[id] = {};
};

const resetRequestLoaders = id => {
  delete requestsLoaders[id];
};

const registerLoader = (loadFn, reqId) => {
  const reqLoaders = requestsLoaders[reqId];
  const loaderKey = uuid();
  return () => {
    if (!(loaderKey in reqLoaders)) reqLoaders[loaderKey] = new Dataloader(loadFn);
    return reqLoaders[loaderKey];
  };
};

const generateKeys = (row, targetFields) => targetFields.map(fields => row[fields]).join();

const createOneToOneLoader = (query, targetFields, reqId) =>
  registerLoader(
    ids =>
      query(ids).then(rows => {
        const batch = {};
        rows.forEach(row => {
          batch[generateKeys(row, targetFields)] = row;
        });
        return ids.map(id => batch[id]);
      }),
    reqId
  );

const createOneToManyLoader = (query, targetFields, reqId) =>
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
    reqId
  );

module.exports = { startRequestLoaders, resetRequestLoaders, createOneToOneLoader, createOneToManyLoader };
