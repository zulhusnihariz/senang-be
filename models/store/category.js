module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    category_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category_name: {
      type: DataTypes.STRING,
    },
  });

  Category.associate = models => {
    Category.hasMany(models.Product, {
      foreignKey: {
        name: 'category_id',
      },
      onDelete: 'CASCADE',
    });
  };

  return Category;
};
