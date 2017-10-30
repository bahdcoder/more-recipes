'use strict';
module.exports = (sequelize, DataTypes) => {
  var Favorite = sequelize.define('Favorite', {
    UserId: DataTypes.UUID
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Favorite;
};