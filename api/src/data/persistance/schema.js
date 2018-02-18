const mongoose = require('mongoose');

const { Schema } = mongoose;


const usersSchema = new Schema({
  name: String,
  facebookId: String,
  createdAt: Date,
  tokenSecret: String,
  picture: String,
});


//
//
//
// const valueCategoriesSchema = new Schema({
//   slug: String,
//   name: String,
// });
//
// const valuesSchema = new Schema({
//   slug: String,
//   name: String,
//   categoryId: Schema.Types.ObjectId,
//   description: String,
//   i18n: {
//     sv: {
//       name: String,
//       description: String,
//     },
//     fi: {
//       name: String,
//       description: String,
//     },
//     et: {
//       name: String,
//       description: String,
//     },
//     de: {
//       name: String,
//       description: String,
//     },
//     li: {
//       name: String,
//       description: String,
//     },
//   },
// });
//
// const userValuesConnectionsSchema = new Schema({
//   userId: Schema.Types.ObjectId,
//   valueId: Schema.Types.ObjectId,
// });
//

//
//
// const valueFormData = new Schema({
//   userId: Schema.Types.ObjectId,
//   categories: [
//     {
//       name: String,
//       values: [{
//         _id: String,
//         selected: {
//           active: Boolean,
//           changed: Date,
//           added: Date,
//         },
//         prioritized: {
//           active: Boolean,
//           changed: Date,
//           added: Date,
//         },
//       }],
//     },
//   ],
// });

// eslint-disable-next-line new-cap
const toObjectId = id => mongoose.Types.ObjectId(id);
const createObjectId = () => new mongoose.Types.ObjectId();
const toPOJO = doc => doc.toObject();

module.exports = {
  User: mongoose.model('Users', usersSchema),
  // UserPicture: mongoose.model('UserPictures', userPicturesSchema),
  // Value: mongoose.model('Values', valuesSchema),
  // ValueCategory: mongoose.model('ValuesCategories', valueCategoriesSchema),
  // UserValueConnection: mongoose.model('UserValueConnection', userValuesConnectionsSchema),
  // ValueFormData: mongoose.model('ValueFormData', valueFormData),
  toObjectId,
  createObjectId,
  toPOJO,
};
