const {
  UserValueConnection, Value, ValueCategory, toPOJO,
} = require('./../schema');


const getValueIds = userId => new Promise((resolve, reject) => {
  UserValueConnection.find({ userId }, (findError, connections) => {
    if (findError) {
      reject(findError);
      return;
    }

    resolve(connections.map(({ valueId }) => valueId));
  });
});

const getValuesFromIds = valueIds => new Promise((resolve, reject) => {
  Value.find({ _id: { $in: valueIds } }, (findError, values) => {
    if (findError) {
      reject(findError);
      return;
    }

    resolve(values.map(toPOJO));
  });
});


const validateLanguage = (values, language) => {
  // English is the default language so no need to check.
  if (!language || language === 'en') {
    return;
  }

  values.forEach(value => {
    if (!value.i18n[language]) {
      console.warn(`Language was ${language} but value ${value.name} did not have a translation for it.`);
    }
  });
};

const translateValues = (values, language) => {
  // Check if language is valid.
  // This is only to be able to detect if an unknown language is used, through console.warn
  // It adds another loop over the values, so could be removed for performance gains.
  validateLanguage(values, language);

  return values.map(({ i18n, ...doc }) => ({
    ...doc,
    ...language && i18n[language],
  }));
};

// Be warned: the categories returned from this method is *NOT* guaranteed to be
// in the same order as input.
const getValueCategoriesFromIds = ids => new Promise((resolve, reject) => {
  ValueCategory.find({ _id: { $in: ids } }, (findError, categories) => {
    if (findError) {
      reject(findError);
      return;
    }

    resolve(categories);
  });
});

// Sets category field on values
const mapToCategorySlugs = values => {
  const catIds = values.map(({ categoryId }) => categoryId);
  return getValueCategoriesFromIds(catIds)
    .then(categories => {
      const categoryIdToSlugMap = {};
      categories.forEach(category => {
        categoryIdToSlugMap[category._id] = category.slug;
      });

      return values.map(({ categoryId, ...rest }) =>
        ({ category: categoryIdToSlugMap[categoryId], categoryId, ...rest }));
    });
};

const getValues = (userId, language) => getValueIds(userId)
  .then(getValuesFromIds)
  .then(values => translateValues(values, language))
  .then(mapToCategorySlugs);


const getValuesWrappedInCategory = (userId, language) => getValues(userId, language)
  .then(values => {
    const mapping = {};
    values.forEach(({ category, ...rest }) => {
      if (!mapping[category]) {
        mapping[category] = [];
      }
      mapping[category].push({ category, ...rest });
    });


    const inCategoryWrapping = [];
    Object.keys(mapping).forEach(category => {
      inCategoryWrapping.push({
        name: category,
        values: mapping[category],
      });
    });

    return inCategoryWrapping;
  });

module.exports = {
  getValues,
  getValuesWrappedInCategory,
};
