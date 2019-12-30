import { Op } from 'sequelize';
import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

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
    // validação dos dados
    const schema = Yup.object().shape({
      question: Yup.string()
        .max(255, 'A pergunta pode ter no máximo 255 caracteres.')
        .required('A pergunta não pode ser vazia.'),
    });

    if (!(await schema.isValid(req.body))) {
      let validationMessage = '';
      // eslint-disable-next-line func-names
      await schema.validate(req.body).catch(function(err) {
        validationMessage = err.errors;
      });

      return res
        .status(400)
        .json({ error: `A validação falhou: ${validationMessage}` });
    }

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
    // validação dos dados
    const schema = Yup.object().shape({
      answer: Yup.string()
        .max(255, 'A resposta pode ter no máximo 255 caracteres.')
        .required('A resposta não pode ser vazia.'),
    });

    if (!(await schema.isValid(req.body))) {
      let validationMessage = '';
      // eslint-disable-next-line func-names
      await schema.validate(req.body).catch(function(err) {
        validationMessage = err.errors;
      });

      return res
        .status(400)
        .json({ error: `A validação falhou: ${validationMessage}` });
    }

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
          attributes: ['id', 'name'],
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

    return res.json('update');
  }
}

export default new HelpOrderController();
