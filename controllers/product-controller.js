const Models = require('../models');
const fetch = require('node-fetch');
const { Op } = require('sequelize');
const { sequelize } = require('../models');

const product = {
  getAllProduct: async (req, res) => {
    // if both min & max price exists, combine both property to be {price: [min_price, max_price]}
    if (req.query.min_price && req.query.max_price) {
      req.query.price = [req.query.min_price, req.query.max_price];
      const { min_price, max_price, ...rest } = req.query;
      req.query = rest;
    }

    const query = Object.keys(req.query);
    const whereCondition = {};

    if (!!query.length) {
      query.forEach(key => {
        if (key.match('category') && !!req.query[key].length)
          whereCondition[key] = Array.from(req.query[key].split(','), Number);

        if (key.match('price') && !!req.query[key])
          whereCondition['price'] = { [Op.between]: req.query[key] };
      });

      // if (req.query.category_id)
      //   whereCondition['category_id'] = Array.from(req.query[key].split(','), Number);

      try {
        const products = await Models.Product.findAll({
          where: whereCondition,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        });
        res.send(products);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const products = await Models.Product.findAll({
          order: [['category_id', 'ASC']],
          include: { all: true, nested: true },
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
  },
  getAllCategory: async (req, res) => {
    try {
      const categories = await Models.Category.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
      console.log(categories);
      res.send(categories);
    } catch (error) {
      console.log(error);
    }
  },
  getProductByTextSearch: async (req, res) => {
    try {
      const results = await sequelize.query(`
        SELECT * FROM products
        WHERE document @@ plainto_tsquery('${req.params.text_condition}')
      `);

      res.send({ results: results[0], message: 'data retrieved successfully' });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = product;
