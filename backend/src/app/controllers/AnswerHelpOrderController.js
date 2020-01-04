import { Op } from 'sequelize';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class AnswerHelpOrderController {
  // lista os pedidos de auxílio sem resposta
  async index(req, res) {
    const { page = 1 } = req.query;

    const helpOrdersNoAnswered = await HelpOrder.findAll({
      where: {
        answer_at: {
          [Op.is]: null,
        },
      },
      order: ['id'],
      attributes: [
        'id',
        'question',
        'answer',
        'answer_at',
        'created_at',
        'updated_at',
      ],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
      limit: 15,
      offset: (page - 1) * 15,
    });

    return res.json(helpOrdersNoAnswered);
  }
}

export default new AnswerHelpOrderController();
