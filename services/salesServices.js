const salesModels = require('../models/salesModels');

const getAll = async () => {
    const allSales = await salesModels.getAll();
  
    return allSales;
  };
  
  const findById = async (id) => {
    const salesById = await salesModels.findById(id);
  
    if (!salesById) return null;
  
    return salesById;
  };

  const create = async (saleProducts) => {
    const s = await salesModels.create(saleProducts);
    return s;
  };

module.exports = {
    getAll,
    findById,
    create,
};