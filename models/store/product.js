module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    price: DataTypes.DECIMAL,
    description: DataTypes.STRING(1500),
    category_id: DataTypes.INTEGER,
    image: DataTypes.STRING,
  });

  Product.associate = models => {
    Product.belongsTo(models.Category);
  };

  return Product;
};
