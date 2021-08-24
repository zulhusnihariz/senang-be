const csv = require('csv-parser');
const fs = require('fs');
const Models = require('../models');
const fetch = require('node-fetch');

// let locations = [];

let states = [
  { id: 1, state: 'Johor' },
  { id: 2, state: 'Kedah' },
  { id: 3, state: 'Kelantan' },
  { id: 4, state: 'Melaka' },
  { id: 5, state: 'Negeri Sembilan' },
  { id: 6, state: 'Pahang' },
  { id: 7, state: 'Perak' },
  { id: 8, state: 'Perlis' },
  { id: 9, state: 'Pulau Pinang' },
  { id: 10, state: 'Sarawak' },
  { id: 11, state: 'Selangor' },
  { id: 12, state: 'Terengganu' },
  { id: 13, state: 'WP Kuala Lumpur' },
  { id: 14, state: 'Labuan' },
  { id: 15, state: 'Sabah' },
  { id: 16, state: 'WP Putrajaya' },
];

const product = {
  getAllStates: async (req, res) => {
    try {
      const states = await Models.States.findAll();
      // fs.createReadStream('./static/postcode.csv')
      //   .pipe(csv({}))
      //   .on('data', data => locations.push(data))
      //   .on('end', async () => {
      //     Setup states table
      //     states.forEach(async state => {
      //       await Models.States.create({
      //         state_id: state.id,
      //         state_name: state.state,
      //       });
      //     });
      //     Setup areas table
      //     const uniqueLocations = [
      //       ...new Map(locations.map(item => [item['post_office'], item])).values(),
      //     ];
      //     uniqueLocations.forEach(async loc => {
      //       try {
      //         await Models.Areas.create({
      //           area_name: loc.post_office,
      //           state_id: states.find(el => loc.state === el.state).id,
      //         });
      //       } catch (error) {
      //         console.log(error);
      //       }
      //     });
      //     Setup postcodes table
      //     const areas = await Models.Areas.findAll();
      //     const uniquePostcodes = [
      //       ...new Map(locations.map(item => [item['postcode'], item])).values(),
      //     ];
      //     console.log(areas);
      //     let i = 1;
      //     uniquePostcodes.forEach(async loc => {
      //       const found = areas.find(x => loc.post_office === x.area_name);
      //       try {
      //         await Models.Postcodes.create({
      //           postcode_name: loc.postcode,
      //           area_id: found.area_id,
      //           state_id: found.state_id,
      //         });
      //       } catch (error) {
      //         console.log(error);
      //       }
      //     });
      //     res.send(areas);
      //   });

      res.send({ states, message: 'Data successfully retrieved' });
    } catch (error) {
      console.log(error);
    }
  },
  getAllAreas: async (req, res) => {
    try {
      const areas = await Models.Areas.findAll();

      res.send({ areas, message: 'Data successfully retrieved' });
    } catch (error) {
      console.log(error);
    }
  },
  getAllPostcodes: async (req, res) => {
    try {
      const postcodes = await Models.Postcodes.findAll();

      res.send({ postcodes, message: 'Data successfully retrieved' });
    } catch (error) {
      console.log(error);
    }
  },
  getStatesByID: async (req, res) => {
    console.log(req.params);
    try {
      const states = await Models.States.findOne({
        where: { state_id: req.params.id },
      });

      res.send({ states, message: 'Data successfully retrieved' });
    } catch (error) {
      console.log(error);
    }
  },
  getAreasByID: async (req, res) => {
    console.log(req.params);
    try {
      const areas = await Models.Areas.findAll({
        where: { state_id: req.params.id },
      });

      res.send({ areas, message: 'Data successfully retrieved' });
    } catch (error) {
      console.log(error);
    }
  },
  getPostcodesByID: async (req, res) => {
    try {
      const postcodes = await Models.Postcodes.findAll({
        where: { state_id: req.params.state_id },
      });

      res.send({ postcodes, message: 'Data successfully retrieved' });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = product;
