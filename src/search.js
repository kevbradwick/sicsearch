const elasticsearch = require("elasticsearch");

const client = new elasticsearch.Client({
  host: process.env.ES_HOST,
  log: process.env.ES_LOG || "trace"
});

const ping = () => {
  return new Promise((resolve, reject) => {
    client
      .ping({ requestTimeout: 1000 })
      .then(resolve)
      .catch(reject);
  });
};

const search = term => {
  return new Promise((resolve, reject) => {
    client
      .search({
        index: "sic-search",
        type: "sic-code",
        body: {
          min_score: 5,
          query: {
            match: {
              description: term
            }
          }
        }
      })
      .then(resolve)
      .catch(reject);
  });
};

module.exports = {
  ping,
  search
};
