const connection = require('./connection');

const serialize = (data) => ({
    saleId: data.sale_id,
    productId: data.product_id,
    date: data.product_id,
    quantity: data.quantity,
});

const getAll = async () => {
    const [sales] = await connection.execute(
        'SELECT * FROM StoreManager.sales_products;',
    );
    return sales.map(serialize);
};

const findById = async (id) => {
    const query = 'SELECT product_id, quantity FROM StoreManager.sales_products WHERE sale_id = ?';
    const [saleData] = await connection.execute(query, [id]);

    if (saleData.length === 0) return null;

    return saleData.map(serialize);
};

module.exports = {
    getAll,
    findById,
};
