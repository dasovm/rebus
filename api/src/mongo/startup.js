const { defaultValuesExists, insertDefaultValues } = require('./values/default-values');


const startup = () => defaultValuesExists()
  .then(exists => (exists ? null : insertDefaultValues()))
  .catch(err => {
    console.error(err);
    setTimeout(() => { throw err; }, 0);
  });


module.exports = startup;