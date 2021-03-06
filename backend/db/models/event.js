'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.User, { foreignKey: 'hostId' })
      Event.hasMany(models.Ticket, { foreignKey: 'eventId', onDelete: 'cascade'  })
      Event.belongsTo(models.Category, { foreignKey: 'categoryId' })
    }
  };
  Event.init({
    hostId: {
      type:  DataTypes.INTEGER,
      allowNull: false
    },
    categoryId: {
      // type:  DataTypes.STRING(40),
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    location:  {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name:  {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
