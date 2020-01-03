import { addMonths } from 'date-fns';
import * as Yup from 'yup';

import Plan from '../models/Plan';
import Registration from '../models/Registration';
import Student from '../models/Student';

import Mail from '../../lib/Mail';

// valida os dados de entrada
const validateInputData = async dataToValidate => {
  const schema = Yup.object().shape({
    student_id: Yup.number()
      .moreThan(0, 'Identificador do aluno inválido.')
      .required('Aluno obrigatório.'),
    plan_id: Yup.number()
      .moreThan(0, 'Identificador do plano inválido.')
      .required('Plano obrigatório.'),
    start_date: Yup.date().required('Data de início obrigatória'),
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

const validateInputDataUpdate = async dataToValidate => {
  const schema = Yup.object().shape({
    plan_id: Yup.number()
      .moreThan(0, 'Identificador do plano inválido.')
      .required('Plano obrigatório.'),
    start_date: Yup.date().required('Data de início obrigatória.'),
  });

  let validateUpdateMessage = null;

  if (!(await schema.isValid(dataToValidate))) {
    // eslint-disable-next-line func-names
    await schema.validate(dataToValidate).catch(function(err) {
      validateUpdateMessage = err.errors;
    });
  }

  return validateUpdateMessage;
};

class RegistrationController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const plans = await Registration.findAll({
      order: ['start_date'],
      attributes: ['id', 'start_date', 'end_date', 'total_price', 'active'],
      limit: 15,
      offset: (page - 1) * 15,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
      ],
    });

    return res.json(plans);
  }

  async store(req, res) {
    // validação dos dados
    const validateMessage = await validateInputData(req.body);

    if (validateMessage) {
      return res
        .status(400)
        .json({ error: `A validação falhou: ${validateMessage}` });
    }

    // valida se o aluno e o plano existem
    const { student_id, plan_id } = req.body;
    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ message: 'Aluno não encontrado.' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ message: 'Plano não encontrado.' });
    }

    // valida se o aluno já está matriculado
    const registrationExists = await Registration.findOne({
      where: { student_id },
    });

    if (registrationExists) {
      return res
        .status(400)
        .json({ message: 'Já existe uma matrícula para este aluno.' });
    }

    // calcula a data de término e preço total// envia e-mail de matrícula
    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Gympoint - Matrícula',
      text: 'Você acabou de se matricular na Gympoint.',
    });
    const { start_date: strDate } = req.body;
    const start_date = Date.parse(strDate);
    const end_date = addMonths(start_date, plan.duration);
    const total_price = plan.monthly_price * plan.duration;

    // cadastra a matrícula
    const registration = await Registration.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      total_price,
    });

    // envia e-mail de matrícula
    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Gympoint - Matrícula',
      text: 'Você acabou de se matricular na Gympoint.',
    });

    return res.json(registration);
  }

  async update(req, res) {
    // validação dos dados
    const validateMessage = await validateInputDataUpdate(req.body);

    if (validateMessage) {
      return res
        .status(400)
        .json({ error: `A validação falhou: ${validateMessage}` });
    }

    // valida se o plano existe
    const { plan_id } = req.body;
    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ message: 'Plano não encontrado.' });
    }

    // recupera a matrícula
    const { id } = req.params;
    const registration = await Registration.findByPk(id);

    // calcula a data de término e preço total
    const { start_date: strDate } = req.body;
    const start_date = Date.parse(strDate);
    const end_date = addMonths(start_date, plan.duration);
    const total_price = plan.monthly_price * plan.duration;

    await registration.update({
      plan_id,
      start_date,
      end_date,
      total_price,
    });

    return res.json('update');
  }

  async delete(req, res) {
    // recupera a matrícula
    const { id } = req.params;
    const registration = await Registration.findByPk(id);

    // remove a matrícula
    registration.destroy();

    return res.json(id);
  }
}

export default new RegistrationController();
