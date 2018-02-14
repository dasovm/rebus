const { UserValueConnection, Value } = require('./../schema');


const valueSlugsToIds = slugs => new Promise((resolve, reject) => {
  Value.find({ slug: { $in: slugs } }, (findError, values) => {
    if (findError) {
      reject(findError);
      return;
    }

    if (slugs.length !== values.length) {
      reject(new Error('Some values provided are not found'));
      return;
    }

    resolve(values.map(({ _id }) => _id));
  });
});


const createConnection = (userId, valueId) => new Promise((resolve, reject) => {
  const connection = new UserValueConnection({ userId, valueId });

  connection.save(saveError => {
    if (saveError) {
      reject(saveError);
      return;
    }

    resolve(connection);
  });
});

const setValuesFromSlugs = (userId, slugs) => valueSlugsToIds(slugs)
  .then(ids => Promise.all(ids.map(id => createConnection(userId, id))));


module.exports = {
  setValuesFromSlugs,
};
