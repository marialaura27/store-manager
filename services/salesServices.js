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

  const deleteSale = async (id) => {
    const res = await salesModels.deleteSale(id);
    return res;
  };

  const update = async (id, productId, quantity) => {
    const res = await salesModels.update(id, productId, quantity);
    return res;
  };

module.exports = {
    getAll,
    findById,
    create,
    deleteSale,
    update,
};