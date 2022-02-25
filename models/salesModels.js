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

const create = async (saleProducts) => {
    const vendaQuery = 'INSERT INTO StoreManager.sales (date) VALUES(NOW());';
    const [venda] = await connection.execute(vendaQuery);
    const saleId = venda.insertId;
    
    const itemsSold = await Promise.all(saleProducts.map(async ({ productId, quantity }) => {
        const query = 'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)';
        const query2 = 'VALUES (?,?,?)';

        await connection.execute(query + query2, [saleId, productId, quantity]); 

        return {
            productId,
            quantity,
        };
    }));

    return {
        id: saleId,
        itemsSold,
    };
};
module.exports = {
    getAll,
    findById,
    create,
};
