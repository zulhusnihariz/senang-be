module.exports = (sequelize, DataTypes) => {
  const Postcodes = sequelize.define('postcodes', {
    postcode_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    postcode_name: { type: DataTypes.STRING, unique: true },
    state_id: DataTypes.INTEGER,
    area_id: DataTypes.INTEGER,
  });

  Postcodes.associate = models => {
    Postcodes.belongsTo(models.States);
    Postcodes.belongsTo(models.Areas);
  };

  return Postcodes;
};
