const salesServices = require('../services/salesServices');

const getAll = async (req, res) => {
    const sales = await salesServices.getAll();

    res.status(200).json(sales);
};

const findById = async (req, res) => {
    const { id } = req.params;
    const sale = await salesServices.findById(id);

    if (!sale) return res.status(404).json({ message: 'Sale not found' });

  res.status(200).json(sale);
};

module.exports = {
    getAll,
    findById,
};