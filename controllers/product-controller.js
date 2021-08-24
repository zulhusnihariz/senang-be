const Models = require('../models');
const fetch = require('node-fetch');

const product = {
  getAllProduct: async (req, res) => {
    try {
      let products = [];

      const isQuery = Object.keys(req.query).length > 0;

      if (!isQuery) {
        try {
          products = await Models.Product.findAll({ include: { all: true, nested: true } });
          res.send(products);
        } catch (error) {
          console.log(error);
        }
      } else {
        const integerQuery = Array.from(req.query.category_id.split(','), Number);
        try {
          products = await Models.Product.findAll({
            where: { category_id: integerQuery },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          });
          res.send(products);
        } catch (error) {
          console.log(error);
        }
      }

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
  getAllCategory: async (req, res) => {
    let categories = [];

    try {
      categories = await Models.Category.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
      res.send(categories);
    } catch (error) {
      console.log(error);
    }
  },
  filterProductsByCategory: async (req, res) => {
    console.log('params', req.query);

    try {
      let categories = [];
      categories = await Models.Product.findAll({
        where: { category_id: [req.params.id] },
      });
      res.send({ categories, message: 'data retrieved successfully' });
    } catch (error) {
      console.log(error);
    }

    res.send(categories);
  },
};

module.exports = product;
