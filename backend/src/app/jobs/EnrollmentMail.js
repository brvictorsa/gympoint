import Mail from '../../lib/Mail';

class EnrollmentMail {
  get key() {
    return 'EnrollmentMail';
  }

  async handle({ data }) {
    const { student } = data;

    /**
     * Send enrollment mail to student
     */
    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Gympoint - Registro de Matrícula',
      template: 'enrollment',
      context: {
        name: student.name,
      },
    });
  }
}

export default new EnrollmentMail();
