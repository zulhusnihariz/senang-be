const Models = require('../models');
const fetch = require('node-fetch');

const product = {
  getAllProduct: async (req, res) => {
    let products = [];
    try {
      let products = [];
      try {
        products = await Models.Product.findAll();
      } catch (error) {
        console.log(error);
      }

      res.send(products);
      // products = await fetch('https://fakestoreapi.com/products')
      //   .then(res => res.json())
      //   .then(async json => {
      //     for (const product of json) {
      //       await Models.Product.create({
      //         title: product.title,
      //         price: product.price,
      //         description: product.description,
      //         category: product.category,
      //         image: product.image,
      //       });
      //     }

      //     res.send(json);
      //   });

      // res.send(products);

      // res.json(results);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = product;
