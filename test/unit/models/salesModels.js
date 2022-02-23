const { expect } = require('chai');

const salesModel = {
  create: () => {}
};

describe('Insere uma nova venda no BD', () => {
  const sale = {
    date: '2021-09-09 00:45:23'
  }

  describe('quando é inserido com sucesso', () => {

    it('retorna um objeto', async () => {
      const response = await sales.create(sale);

      expect(response).to.be.a('object')
    });

    it('O objeto possui o id do novo produto inserido', async () => {
      const response = await salesModel.create(sale);

      expect(response).to.have.a.property('id')
    });

  });
});