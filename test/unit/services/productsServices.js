const sinon = require('sinon');
const { expect } = require('chai');

const connection = require("../../../models/connection");
const productsService = require("../../../services/productsServices");

describe('productsService', () => {
  describe('[GET] /products', async () => {
    const expected = {
      id: 1,
      name: 'Martelinho de Ouro',
      quantity: 10
    }
    before(() => {
      sinon.stub(connection, 'execute').resolves([expected]);
    })
    after(() => {
      connection.execute.restore();
    })

    it('[GET] /products', async () => {
      const response = await productsService.getAll()
      expect(response).to.be.equal(expected)
    })
  })

  describe('[GET] /product/:id', () => {
    const product = {
      id: 1,
      name: 'Martelinho de Ouro',
      quantity: 10
    }
    before(() => {
      sinon.stub(productsService, 'findById').resolves(product);
    })

    it('[GET] /product/:id', async () => {
      const response = await productsService.findById(product.id);
      expect(response).to.be.deep.equal(product);
    })
  })

  describe('[POST] /product', () => {
    const payload = {
      name: "Martelinho de Prata",
      quantity: 29
    };

    const successResponse = {
      id: 1,
      name: "Martelinho de Prata",
      quantity: 29
    }

    before(() => {
      sinon.stub(productsService, 'create').resolves(successResponse);
    })

    it('[POST] /product', async () => {
      const response = await productsService.create(payload.name, payload.quantity)
      expect(response).to.be.deep.equal(successResponse);
    })
  })

  describe('[DELETE] /product/:id', () => {
    const payload = {
      name: "Varinha Mágica",
      quantity: 5,
      id: 1
    };

    const executeResponse = [{ affectedRows: 1 }];

    before(() => {
      sinon.stub(connection, 'execute').resolves(executeResponse);
    })

    after(() => {
      connection.execute.restore()
    })

    it('[DELETE] /product/:id ✅', async () => {
      const response = await productsService.deleteProduct(payload.id);
      expect(response).to.be.true;
    })
  })

  describe('[UPDATE] /product/:id', () => {
    const expectedResponse = {
      id: 1,
      name: "Varinha Mágicax",
      quantity: 6
    }

    before(() => {
      sinon.stub(productsService, 'update').resolves(expectedResponse);
    })

    it('[UPDATE] /product/:id ✅', async () => {
      const response = await productsService.update(expectedResponse.id, expectedResponse.name, expectedResponse.quantity)
      expect(response).to.deep.equal(expectedResponse);
    })
  })
})