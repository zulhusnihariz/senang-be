'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.changeColumn('products', 'category_id', {
      //   type: 'INTEGER USING CAST("category_id" as INTEGER)',
      //   allowNull: false,
      // }),
      // queryInterface.addColumn('products', 'categoryCategoryId', {
      //   type: Sequelize.INTEGER,
      // }),
      // queryInterface.bulkInsert('categories', [
      //   {
      //     category_id: 1,
      //     category_name: "Men's clothing",
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      //   {
      //     category_id: 2,
      //     category_name: "Women's clothing",
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      //   {
      //     category_id: 3,
      //     category_name: 'Jewelry',
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      //   {
      //     category_id: 4,
      //     category_name: 'Eletronics',
      //     createdAt: new Date(),
      //     updatedAt: new Date(),
      //   },
      // ]),
      // queryInterface.addConstraint('products', {
      //   fields: ['category_id'],
      //   type: 'foreign key',
      //   references: {
      //     table: 'categories',
      //     field: 'category_id',
      //   },
      //   onDelete: 'cascade',
      // }),
    ]);
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
