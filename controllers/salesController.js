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

const runValidations = (salesProducts) => salesProducts.map(({ productId, quantity }) => {
    if (!productId) return [{ message: '"productId" is required' }, 400];
    if (quantity <= 0) return [{ message: '"quantity" must be greater than or equal to 1' }, 422];
    if (!quantity) return [{ message: '"quantity" is required' }, 400];
    return null;
});

const create = async (req, res) => {
    const saleProducts = req.body;

    const compraValida = runValidations(saleProducts);
    const status = compraValida[0];

    if (status) {
        return res.status(status[1]).json(status[0]);
    }
    
    const results = await salesServices.create(saleProducts);
    return res.status(201).json(results);
};

module.exports = {
    getAll,
    findById,
    create,
};