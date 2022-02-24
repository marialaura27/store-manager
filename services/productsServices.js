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
module.exports = {
    getAll,
    findById,
    create,
};