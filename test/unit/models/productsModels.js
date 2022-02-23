const { expect } = require('chai');

const productsModel = {
    create: () => {}
  };

  describe('Insere um novo produto no BD', () => {
    const product = {
      name: 'Armadura',
      quantity: 4,
    }
  
    describe('quando é inserido com sucesso', () => {
  
      it('retorna um objeto', async () => {
        const response = await productsModel.create(product);
  
        expect(response).to.be.a('object')
      });
  
      it('O objeto possui o id do novo produto inserido', async () => {
        const response = await MoviesModel.create(product);
  
        expect(response).to.have.a.property('id')
      });
  
    });
  });