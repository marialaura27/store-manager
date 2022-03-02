const sinon = require('sinon');
const { expect } = require('chai');

const connection = require("../../../models/connection");
const salesModels = require("../../../models/salesModels");

describe('salesModels', () => {

  describe('[GET] /sales', async () => {
    const raw = [{
      sale_id: 1,
      product_id: 1,
      date: 1,
      quantity: 5,
    }]

    const expected = [{
      saleId: 1,
      productId: 1,
      date: 1, 
      quantity: 5
    }]
    after(() => {
      connection.execute.restore();
    })

    it('[GET] /sales', async () => {
      sinon.stub(connection, 'execute').resolves([raw]);
      const response = await salesModels.getAll();
      expect(response).to.deep.equal(expected);
    })
  })

  describe('[GET] /sales/:id', () => {
    const raw = [{
      product_id: 1,
      date: 1,
      quantity: 5,
      sale_id: 1,
    }]

    const expected = [{
      productId: 1,
      date: 1,
      quantity: 5,
      saleId: 1,
    }]
    after(() => {
      connection.execute.restore();
    })

    it('[GET] /sales/:id', async () => {
      sinon.stub(connection, 'execute').resolves([raw]);
      const response = await salesModels.findById(1);
      expect(response).to.deep.equal(expected);
    })
  })

  describe('[POST] /sales', () => {
    const payload = [{
      productId: 1,
      quantity: 12
    }]

    const successResponse = {
      id: 3,
      itemsSold: [{
        productId: 1,
        quantity: 12
      }]
    }

    after(() => {
      connection.execute.restore()
    })

    it('[POST] /sales', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      sinon.stub(salesModels, 'create').resolves(successResponse);

      const response = await salesModels.create(payload)
      expect(response).to.deep.equal(successResponse);
    })
  })

  describe('[DELETE] /sales/:id', () => {
    const payload = {
      id: 1
    };

    before(() => {
      sinon.stub(connection, 'execute').resolves(true);
    })

    after(() => {
      connection.execute.restore()
    })

    it('[DELETE] /sales/:id ✅', async () => {
      const response = await salesModels.deleteSale(payload.id);
      expect(response).to.be.true;
    })
  })

  describe('[UPDATE] /product/:id', () => {
    const payload = {
      productId: 1,
      quantity: 9,
    };

    const expectedResponse = {
      saleId: 1,
      itemUpdated: [
        payload
      ]
    }

    before(() => {
      sinon.stub(connection, 'execute').resolves(expectedResponse);
    })

    after(() => {
      connection.execute.restore()
    })

    it('[UPDATE] /sales/:id ✅', async () => {
      const response = await salesModels.update(1, payload.productId, payload.quantity)
      expect(response).to.deep.equal(expectedResponse);
    })
  })
})