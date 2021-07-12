module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('user_address', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
    },
    addressLine1: DataTypes.STRING,
    addressLine2: DataTypes.STRING,
    city: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    country: DataTypes.STRING,
    contactNumber: DataTypes.STRING,
  });

  Address.associate = models => {
    Address.belongsTo(models.User);
  };

  return Address;
};
