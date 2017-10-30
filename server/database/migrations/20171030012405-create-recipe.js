module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Recipes', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    UserId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    imageUrl: {
      type: Sequelize.STRING
    },
    timeToCook: {
      type: Sequelize.INTEGER
    },
    ingredients: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    procedure: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    upvoters: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      defaultValue: []
    },
    downvoters: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      defaultValue: []
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Recipes')
};
