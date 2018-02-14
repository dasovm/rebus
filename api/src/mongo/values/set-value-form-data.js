const { ValueFormData } = require('./../schema');


const setValueFormData = (userId, formData) => new Promise((resolve, reject) => {
  const _formData = new ValueFormData({
    userId,
    categories: formData,
  });

  _formData.save(saveError => {
    if (saveError) {
      reject(saveError);
      return;
    }

    resolve(formData);
  });
});


module.exports = {
  setValueFormData,
};
