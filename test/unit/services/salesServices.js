const sinon = require('sinon');
const { expect } = require('chai');

const connection = require("../../../models/connection");
const salesService = require("../../../services/salesServices");

describe('salesService', () => {
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
      quantity: 5,
    }]
    before(() => {
      sinon.stub(connection, 'execute').resolves([raw]);
    })
    after(() => {
      connection.execute.restore();
    })

    it('[GET] /sales', async () => {
      const response = await salesService.getAll()
      expect(response).to.deep.equal(expected)
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
    before(() => {
      sinon.stub(connection, 'execute').resolves([raw]);
    })
    after(() => {
      connection.execute.restore();
    })

    it('[GET] /sales/:id', async () => {
      const response = await salesService.findById(1);
      expect(response).to.be.deep.equal(expected);
    })
  })

  describe('[POST] /sales', () => {
    const payload = [{
      id: 3,
      productId: 1,
      quantity: 12
    }]

    const successResponse = {
      itemsSold: [{
        productId: 1,
        quantity: 12
      }, {
        productId: 3,
        quantity: 9
      }]
    }

    before(() => {
      sinon.stub(salesService, 'create').resolves(successResponse);
    })

    it('[POST] /sales', async () => {
      const response = await salesService.create(payload)
      expect(response).to.be.deep.equal(successResponse);
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
      const response = await salesService.deleteSale(payload.id);
      expect(response).to.be.true;
    })
  })

  describe('[UPDATE] /product/:id', () => {
    const payload = {
      id: 1,
      productId: 1,
      quantity: 9,
    };

    const queryResponse = [{ sale_id: 1, product_id: 1, quantity: 9 }]

    const expectedResponse = {
        saleId: 1,
        itemUpdated: [
          {
            productId: 1,
            quantity: 9,
          },
        ],
    };

    before(() => {
      sinon.stub(connection, 'execute').resolves(queryResponse);
    })

    after(() => {
      connection.execute.restore()
    })

    it('[UPDATE] /sales/:id ✅', async () => {
      const response = await salesService.update(payload.id, payload.productId, payload.quantity)
      expect(response).to.deep.equal(expectedResponse);
    })
  })
})