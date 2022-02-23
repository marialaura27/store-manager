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

module.exports = {
    getAll,
    findById,
};