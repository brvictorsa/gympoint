import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .moreThan(0, 'Identificador do aluno inválido')
        .required('Aluno obrigatório'),
      plan_id: Yup.number()
        .moreThan(0, 'Identificador do plano inválido')
        .required('Plano obrigatório'),
      start_date: Yup.date().required('Data de início obrigatória'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({ error: 'A validação falhou', messages: err.errors })
  }
}
