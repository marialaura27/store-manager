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

const create = async (req, res) => {
    const [{ productId, quantity }] = req.body;
    if (!productId) return res.status(400).json({ message: '"productId" is required' });
    if (!quantity) return res.status(400).json({ message: '"quantity" is required' });
    if (quantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    const vendaCadastrada = await salesServices.create(productId, quantity);
    res.status(201).json(vendaCadastrada);
};

module.exports = {
    getAll,
    findById,
    create,
};