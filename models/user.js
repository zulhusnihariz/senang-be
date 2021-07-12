module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: { type: DataTypes.STRING, isEmail: true, unique: true, allowNull: false },
    contactNumber: DataTypes.STRING,
    birthDate: DataTypes.STRING,
  });

  User.associate = models => {
    User.hasOne(models.Address, {
      foreignKey: {
        name: 'userId',
      },
      as: 'address',
      onDelete: 'CASCADE',
    });
  };

  return User;
};
