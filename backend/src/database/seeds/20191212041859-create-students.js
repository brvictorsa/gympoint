module.exports = {
  up: queryInterface => {
    /* Create basic student for the project */
    return queryInterface.bulkInsert(
      'students',
      [
        {
          name: 'Aluno 1',
          email: 'aluno1@gmail.com.br',
          age: 25,
          weight: 108.35,
          height: 1.91,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Aluno 2',
          email: 'aluno2@gmail.com.br',
          age: 21,
          weight: 62.15,
          height: 1.71,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Aluno 3',
          email: 'aluno3@gmail.com.br',
          age: 19,
          weight: 52.62,
          height: 1.57,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
