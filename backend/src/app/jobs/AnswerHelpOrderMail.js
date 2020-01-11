import Mail from '../../lib/Mail';

class AnswerHelpOrderMail {
  get key() {
    return 'AnswerHelpOrderMail';
  }

  async handle({ data }) {
    const { helpOrder, answerDateFormmatted, answerHourFormmatted } = data;

    // envia um e-mail de resposta do pedido de auxílio
    await Mail.sendMail({
      to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
      subject: 'Gympoint Responde',
      template: 'helporder',
      context: {
        name: helpOrder.student.name,
        date: answerDateFormmatted,
        hour: answerHourFormmatted,
      },
    });
    /**
     * Send helporder answer mail to student
     */
    // await Mail.sendMail({
    //   to: `${student.name} <${student.email}>`,
    //   subject: 'Gympoint - Registro de Matrícula',
    //   template: 'enrollment',
    //   context: {
    //     name: student.name,
    //   },
    // });
  }
}

export default new AnswerHelpOrderMail();
