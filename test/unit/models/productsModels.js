const sinon = require('sinon');
const { expect } = require('chai');

const connection = require("../../../models/connection");
const productsModels = require("../../../models/productsModels");

describe('productsModels', () => {
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
      const response = await productsModels.getAll()
      expect(response).to.deep.equal(expected)
    })
  })

  describe('[GET] /product/:id', () => {
    const product = {
      id: 1,
      name: 'Martelinho de Ouro',
      quantity: 10
    }
    before(() => {
      sinon.stub(connection, 'execute').resolves([product]);
    })
    after(() => {
      connection.execute.restore();
    })

    it('[GET] /product/:id', async () => {
      const response = await productsModels.findById(1);
      expect(response).to.deep.equal(response)
    })
  })

  describe('[POST] /product', () => {
    const payload = {
      name: "Martelinho de Prata",
      quantity: 29
    };

    const successResponse = [{
      id: 1,
      name: "Martelinho de Prata",
      quantity: 29
    }]

    before(() => {
      sinon.stub(connection, 'execute').resolves(successResponse);
    })

    after(() => {
      connection.execute.restore()
    })

    it('[POST] /product', async () => {
      const response = await productsModels.create(payload.name, payload.quantity)
      expect(response).to.deep.equal(response);
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

    it('[DELETE] /product/:id - NULL', async () => {
      const response = await productsModels.deleteProduct(null)
      expect(response).to.be.true;
    })

    it('[DELETE] /product/:id ✅', async () => {
      const response = await productsModels.deleteProduct(payload.id);
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
      sinon.stub(productsModels, 'findById').resolves([expectedResponse])
      sinon.stub(productsModels, 'update').resolves(expectedResponse);
    })

    it('[UPDATE] /product/:id ✅', async () => {
      
      const response = await productsModels.update(expectedResponse.id, expectedResponse.name, expectedResponse.quantity)
      expect(response).to.deep.equal(expectedResponse);
    })
  })
})