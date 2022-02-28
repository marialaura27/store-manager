const productsServices = require('../services/productsServices');
const productsModels = require('../models/productsModels');

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

const produtoExiste = async (name, res, quantity) => {
    const n = await productsModels.findByName(name);
    if (n) {
        return res.status(409).json({ message: 'Product already exists' });
    }
    const produtoCadastrado = await productsServices.create(name, quantity);
    res.status(201).json(produtoCadastrado);
};

const create = async (req, res) => {
    const { name, quantity } = req.body;
    if (!name) return res.status(400).json({ message: '"name" is required' });
    if (name.length < 5) {
      return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
    }
    if (!quantity) return res.status(400).json({ message: '"quantity" is required' });
    if (quantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    await produtoExiste(name, res, quantity);
};

const update = async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const falsyQt = quantity === undefined;
    if (name.length < 5) {
      return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
    }
    if (falsyQt) return res.status(400).json({ message: '"quantity" is required' });
    if (quantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    const product = await productsServices.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    const editado = await productsServices.update(id, name, quantity);
    res.status(200).json(editado);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await productsServices.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    await productsServices.deleteProduct(id);
    res.status(204).json();
};

module.exports = {
    getAll,
    findById,
    create,
    update,
    deleteProduct,
};