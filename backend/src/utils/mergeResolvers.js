module.exports = (baseResolvers, newResolvers) => {
  const resp = {};
  const types = [...new Set(Object.keys(baseResolvers).concat(Object.keys(newResolvers)))];
  types.forEach(type => {
    resp[type] = { ...baseResolvers[type], ...newResolvers[type] };
  });
  return resp;
};
