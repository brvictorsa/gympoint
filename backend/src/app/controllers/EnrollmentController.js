import { addMonths } from 'date-fns';

import Plan from '../models/Plan';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';

import Queue from '../../lib/Queue';
import EnrollmentMail from '../jobs/EnrollmentMail';

class EnrollmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const enrollments = await Enrollment.findAll({
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

    return res.json(enrollments);
  }

  async store(req, res) {
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
    const enrollmentExists = await Enrollment.findOne({
      where: { student_id },
    });

    if (enrollmentExists) {
      return res
        .status(400)
        .json({ message: 'Já existe uma matrícula para este aluno.' });
    }

    // calcula a data de término e preço total
    const { start_date: strDate } = req.body;
    const start_date = Date.parse(strDate);
    const end_date = addMonths(start_date, plan.duration);
    const total_price = plan.monthly_price * plan.duration;

    // cadastra a matrícula
    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      total_price,
    });

    // envia e-mail de matrícula
    await Queue.add(EnrollmentMail.key, {
      student,
    });

    return res.json(enrollment);
  }

  async update(req, res) {
    // valida se o plano existe
    const { plan_id } = req.body;
    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ message: 'Plano não encontrado.' });
    }

    // recupera a matrícula
    const { id } = req.params;
    const enrollment = await Enrollment.findByPk(id);

    // calcula a data de término e preço total
    const { start_date: strDate } = req.body;
    const start_date = Date.parse(strDate);
    const end_date = addMonths(start_date, plan.duration);
    const total_price = plan.monthly_price * plan.duration;

    await enrollment.update({
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
    const enrollment = await Enrollment.findByPk(id);

    // remove a matrícula
    enrollment.destroy();

    return res.json(id);
  }
}

export default new EnrollmentController();
