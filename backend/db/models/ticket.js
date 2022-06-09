'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.belongsTo(models.User, { foreignKey: 'userId' })
      Ticket.belongsTo(models.Event, { foreignKey: 'eventId', onDelete: 'cascade'  })
    }
  };
  Ticket.init({
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};
