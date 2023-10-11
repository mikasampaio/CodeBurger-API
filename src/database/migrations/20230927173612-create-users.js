'use strict';

// Rodar a migration: yarn sequelize db:migrate
// Parar a migration: yarn sequelize db:migrate:undo (desfaz a última alteração)
// yarn sequelize db:migrate:undo:all (desfaz todas as alterações)

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false, // -> O campo não pode ser nulo
        primaryKey: true // -> A chave primária deve ser única
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true // -> Email deve ser único
      },
      password_hash: { // -> Senha criptografada
        type: Sequelize.STRING,
        allowNull: false
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }

    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
