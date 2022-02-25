const connection = require('./connection');

const getAll = async () => {
    const [products] = await connection.execute(
        'SELECT id, name, quantity FROM StoreManager.products;',
    );
    return products;
};

const findById = async (id) => {
    const query = 'SELECT id, name, quantity FROM StoreManager.products WHERE id = ?';
    const [productData] = await connection.execute(query, [id]);

    if (productData.length === 0) return null;

    return productData[0];
};

const findByName = async (name) => {
    const query = 'SELECT id, name, quantity FROM StoreManager.products WHERE name = ?';
    const [productData] = await connection.execute(query, [name]);

    if (productData.length === 0) return null;

    return productData[0];
}; 

const create = async (name, quantity) => {
    const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?,?)';
    await connection.execute(query, [name, quantity]);  
    return findByName(name);
};

const update = async (id, name, quantity) => {
    const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?';
    console.log(name, quantity);
    await connection.execute(query, [name, quantity, id]);
    return findById(id);
};

module.exports = {
    getAll,
    findById,
    create,
    findByName,
    update,
};