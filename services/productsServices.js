const productModels = require('../models/productsModels');

const getAll = async () => {
  const allProducts = await productModels.getAll();
  return allProducts;
};
  
const findById = async (id) => {
  const productById = await productModels.findById(id);

  if (!productById) return null;

  return productById;
};

const create = async (name, quantity) => {
  const p = await productModels.create(name, quantity);
  return p;
};

const update = async (id, name, quantity) => {
  const res = await productModels.update(id, name, quantity);
  return res;
};

const deleteProduct = async (id) => {
  const res = await productModels.deleteProduct(id);
  return res;
};

module.exports = {
    getAll,
    findById,
    create,
    update,
    deleteProduct,
};