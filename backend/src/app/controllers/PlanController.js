import { Op } from 'sequelize';

import Plan from '../models/Plan';
import Enrollment from '../models/Enrollment';

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

    const enrollmentExists = await Enrollment.findOne({
      where: { plan_id: id },
    });

    if (enrollmentExists) {
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
