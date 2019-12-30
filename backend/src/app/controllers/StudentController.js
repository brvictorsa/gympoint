import { Op } from 'sequelize';
import * as Yup from 'yup';

import Student from '../models/Student';

// valida os dados de entrada
const validateInputData = async dataToValidate => {
  const schema = Yup.object().shape({
    name: Yup.string().required('Nome obrigatório.'),
    email: Yup.string('E-mail brigatório.')
      .email()
      .required(),
    age: Yup.number()
      .moreThan(12, 'O aluno deve ter pelo menos 13 anos de idade.')
      .required(),
    weight: Yup.number()
      .moreThan(45, 'O aluno deve pesar pelo menos 45Kg.')
      .required('Peso obrigatório.'),
    height: Yup.number()
      .moreThan(0, 'Altura inválida.')
      .required('Altura obrigatória'),
  });

  let validateMessage = null;

  if (!(await schema.isValid(dataToValidate))) {
    // eslint-disable-next-line func-names
    await schema.validate(dataToValidate).catch(function(err) {
      validateMessage = err.errors;
    });
  }

  return validateMessage;
};

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
    // validação dos dados
    const validateMessage = await validateInputData(req.body);

    if (validateMessage) {
      return res
        .status(400)
        .json({ error: `A validação falhou: ${validateMessage}` });
    }

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
    // validação dos dados
    const validateMessage = await validateInputData(req.body);

    if (validateMessage) {
      return res
        .status(400)
        .json({ error: `A validação falhou: ${validateMessage}` });
    }

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
