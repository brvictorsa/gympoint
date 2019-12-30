import { Op } from 'sequelize';
import * as Yup from 'yup';

import Plan from '../models/Plan';
import Registration from '../models/Registration';

// valida os dados de entrada
const validateInputData = async dataToValidate => {
  const schema = Yup.object().shape({
    title: Yup.string()
      .max(50, 'O título do plano pode ter no máximo 50 caracteres.')
      .required(),
    duration: Yup.number()
      .moreThan(0, 'A duranção deve ser um número positivo e maior que zero.')
      .required('Duração em meses obrigatória.'),
    monthly_price: Yup.number()
      .min(0, 'O preço mensal deve ser um valor positivo.')
      .required('Preço mensal obrigatório'),
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

class PlanController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const plans = await Plan.findAll({
      order: ['title'],
      attributes: ['id', 'title', 'duration', 'monthly_price'],
      limit: 15,
      offset: (page - 1) * 15,
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

    const { title } = req.body;

    // verifica se já existe um plano com o mesmo título
    const planExists = await Plan.findOne({ where: { title } });

    if (planExists) {
      return res.status(400).json({
        message: 'Já existe um plano cadastrado com este título.',
      });
    }

    // cadastra o plano
    const { id, duration, monthly_price } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
      monthly_price,
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

    // recupera o plano
    const { id } = req.params;
    const { title } = req.body;
    const plan = await Plan.findByPk(id);

    if (title && title !== plan.title) {
      // verifica se existe outro plano com o título a ser atualizado
      const planExists = await Plan.findOne({
        where: {
          [Op.and]: [
            {
              id: {
                [Op.ne]: id,
              },
            },
            {
              title: {
                [Op.eq]: title,
              },
            },
          ],
        },
      });

      if (planExists) {
        return res.status(400).json({
          message: 'Já existe um plano cadastrado com este título.',
        });
      }
    }

    // atualiza o plano
    await plan.update(req.body);

    // recupera os dados atualizados
    const { duration, monthly_price } = await Plan.findByPk(id);

    return res.json({
      id,
      title,
      duration,
      monthly_price,
    });
  }

  async delete(req, res) {
    // valida se existe aluno matricula no plano
    const { id } = req.params;

    const registrationExists = await Registration.findOne({
      where: { plan_id: id },
    });

    if (registrationExists) {
      return res
        .status(400)
        .json({ message: 'Existem alunos matriculados neste plano.' });
    }

    // remove o plano
    const plan = await Plan.findByPk(id);
    plan.destroy();

    return res.json(id);
  }
}

export default new PlanController();
