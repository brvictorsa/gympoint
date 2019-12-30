module.exports = {
  up: queryInterface => {
    /* Create basic student for the project */
    return queryInterface.bulkInsert(
      'students',
      [
        {
          name: 'Jose da Silva',
          email: 'jose@gmail.com.br',
          age: 25,
          weight: 88.35,
          height: 1.81,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Maria Alves',
          email: 'mariaalves@gmail.com.br',
          age: 21,
          weight: 62.15,
          height: 1.71,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
