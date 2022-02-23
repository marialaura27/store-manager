const productsServices = require('../services/productsServices');

const getAll = async (req, res) => {
    const products = await productsServices.getAll();

    res.status(200).json(products);
};

const findById = async (req, res) => {
    const { id } = req.params;
    const product = await productsServices.findById(id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(product);
};

module.exports = {
    getAll,
    findById,
};