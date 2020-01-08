import { Op } from 'sequelize';
import { subDays } from 'date-fns';

import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  // lista os checkins do aluno
  async index(req, res) {
    const { page = 1 } = req.query;
    const { id: student_id } = req.params;

    const checkins = await Checkin.findAll({
      order: ['created_at'],
      where: { student_id },
      limit: 15,
      offset: (page - 1) * 15,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(checkins);
  }

  // realiza o checkin
  async store(req, res) {
    // recupera o id do aluno
    const { id: student_id } = req.params;

    // verifica se já tem 5 checkins nos últimos 7 dias
    const checkinDate = new Date();
    const startDate = subDays(checkinDate, 7);

    const { count } = await Checkin.findAndCountAll({
      where: {
        student_id,
        created_at: {
          [Op.between]: [startDate, checkinDate],
        },
      },
    });

    if (count > 4) {
      return res.status(400).json({
        error:
          'O aluno já atingiu o limite de 5 checkins nos últimos 7 dias. Tente novamente amanhã.',
      });
    }

    // realiza o checkin
    const checkin = await Checkin.create({ student_id });

    return res.json(checkin);
  }
}

export default new CheckinController();
