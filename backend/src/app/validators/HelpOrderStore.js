import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      question: Yup.string()
        .max(255, 'A pergunta pode ter no máximo 255 caracteres.')
        .required('A pergunta não pode ser vazia.'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({ error: 'A validação falhou', messages: err.errors })
  }
}
