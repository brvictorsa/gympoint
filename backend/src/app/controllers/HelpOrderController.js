import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import Queue from '../../lib/Queue';
import AnswerHelpOrderMail from '../jobs/AnswerHelpOrderMail';

class HelpOrderController {
  // listar pedidos de auxílio de um aluno
  async index(req, res) {
    // recupera os dados
    const { page = 1 } = req.query;
    const { id } = req.params;

    const helpOrders = await HelpOrder.findAll({
      order: ['id'],
      attributes: [
        'id',
        'question',
        'answer',
        'answer_at',
        'created_at',
        'updated_at',
      ],
      where: { student_id: id },
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

    return res.json(helpOrders);
  }

  // cadastro de pedidos de auxílio
  async store(req, res) {
    // recupera os dados
    const { id: student_id } = req.params;
    const { question } = req.body;

    // cadastra o pedido de auxílio
    const { id } = await HelpOrder.create({
      student_id,
      question,
    });

    return res.json({
      id,
      student_id,
      question,
    });
  }

  // cadastro da resposta do pedido de auxílio
  async update(req, res) {
    // recupera os dados
    const { id } = req.params;
    const { answer } = req.body;
    const answerDate = new Date();

    // recupera o help-order
    const helpOrder = await HelpOrder.findOne({
      where: { id },
      attributes: ['id', 'question'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (!helpOrder) {
      return res.status(400).json({
        message: 'Pedido de auxílio não encontrado.',
      });
    }

    // atualiza a resposta
    await helpOrder.update({
      answer,
      answer_at: answerDate,
    });

    // formata as informações para o e-mail
    const answerDateFormmatted = format(answerDate, "d 'de' MMMM 'de' Y", {
      locale: pt,
    });

    const answerHourFormmatted = format(answerDate, 'hh:mm:ss', {
      locale: pt,
    });

    // envia um e-mail de resposta do pedido de auxílio
    await Queue.add(AnswerHelpOrderMail.key, {
      helpOrder, answerDateFormmatted, answerHourFormmatted
    });

    return res.json('update: pedido de auxílio respondido');
  }
}

export default new HelpOrderController();
