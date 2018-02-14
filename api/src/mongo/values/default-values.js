const { Value, ValueCategory } = require('./../schema');

const defaultValues = {
  foundation: require('./defaults/foundation'),
  greater_good: require('./defaults/greater_good'),
  self_fulfillment: require('./defaults/self_fulfillment'),
};

const valuesExists = () => new Promise((resolve, reject) => {
  Value.count({}, (countError, count) => {
    if (countError) {
      reject(countError);
      return;
    }

    resolve(count > 0);
  });
});


const valueCategoriesExists = () => new Promise((resolve, reject) => {
  ValueCategory.count({}, (countError, count) => {
    if (countError) {
      reject(countError);
      return;
    }
    resolve(count > 0);
  });
});

const defaultValuesExists = () => Promise.all([
  valuesExists(),
  valueCategoriesExists(),
]).then(([valExists, valCatExists]) => valExists || valCatExists);


const insertValueCategory = ({ name, slug }) => new Promise((resolve, reject) => {
  const valueCategory = new ValueCategory({ name, slug });
  valueCategory.save(saveError => {
    if (saveError) {
      reject(saveError);
      return;
    }

    resolve(valueCategory);
  });
});


const insertValue = value => new Promise((resolve, reject) => {
  const valueModel = new Value(value);
  valueModel.save(saveError => {
    if (saveError) {
      reject(saveError);
      return;
    }
    resolve(value);
  });
});

const insertValues = ({ _id: categoryId, slug }) => {
  const values = defaultValues[slug];

  const promises = values.map(({ _id, ...rest }) => ({ slug: _id, categoryId, ...rest })).map(insertValue);

  return Promise.all(promises);
};


const defaultValueCategories = [{
  name: 'Foundation',
  slug: 'foundation',
}, {
  name: 'Greater Good',
  slug: 'greater_good',
}, {
  name: 'Self Fulfillment',
  slug: 'self_fulfillment',
}];

const insertDefaultValues = () => Promise.resolve()
  .then(() => Promise.all(defaultValueCategories.map(insertValueCategory)))
  .then(categories => Promise.all(categories.map(insertValues)))
  // Dont leak anything
  .then(() => ({}));


module.exports = {
  defaultValuesExists,
  insertDefaultValues,
};
