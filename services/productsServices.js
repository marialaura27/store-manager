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

module.exports = {
    getAll,
    findById,
};