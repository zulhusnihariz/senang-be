module.exports = (sequelize, DataTypes) => {
  const States = sequelize.define('states', {
    state_id: {
      type: DataTypes.INTEGER,

      primaryKey: true,
    },

    state_name: { type: DataTypes.STRING, unique: true },
  });

  States.associate = models => {
    States.hasMany(models.Areas, {
      foreignKey: {
        name: 'state_id',
      },
      onDelete: 'CASCADE',
    });
    States.hasMany(models.Postcodes, {
      foreignKey: {
        name: 'state_id',
      },
      onDelete: 'CASCADE',
    });
  };

  return States;
};
