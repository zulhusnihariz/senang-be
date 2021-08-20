module.exports = (sequelize, DataTypes) => {
  const Areas = sequelize.define('areas', {
    area_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    area_name: { type: DataTypes.STRING, unique: true },
    state_id: DataTypes.INTEGER,
  });

  Areas.associate = models => {
    Areas.belongsTo(models.States);
    Areas.hasMany(models.Postcodes, {
      foreignKey: {
        name: 'area_id',
      },
      onDelete: 'CASCADE',
    });
  };

  return Areas;
};
