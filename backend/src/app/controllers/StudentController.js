import { Op } from 'sequelize';

import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { name, page = 1 } = req.query;

    const students = await Student.findAll({
      where: {
        name: {
          [Op.iLike]: name ? `%${name}%` : `%%`,
        },
      },
      order: ['name'],
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
      limit: 15,
      offset: (page - 1) * 15,
    });

    return res.json(students);
  }

  async store(req, res) {
    const { email } = req.body;

    // verifica se já existe outro usuário com o e-mail
    const student = await Student.findOne({ where: { email } });

    if (student) {
      return res.status(400).json({
        message: 'Já existe um aluno cadastrado com este e-mail.',
      });
    }

    // cadastra o aluno
    const { id, name, age, weight, height } = await Student.create(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    // recupera o aluno
    const { id } = req.params.id;
    const { email } = req.body;
    const student = await Student.findByPk(req.userId);

    if (email && email !== student.email) {
      // verifica se o e-mail pertence a outro aluno cadastrado
      const studentExists = await Student.findOne({ where: { email } });

      if (studentExists) {
        return res.status(400).json({
          message: 'Já existe um aluno cadastrado com este e-mail.',
        });
      }
    }

    // atualiza o aluno
    await student.update(req.body);

    // recupera os dados atualizados
    const { name, age, weight, height } = await Student.findByPk(req.userId);

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }
}

export default new StudentController();
