import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      answer: Yup.string()
        .max(255, 'A resposta pode ter no máximo 255 caracteres.')
        .required('A resposta não pode ser vazia.'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({ error: 'A validação falhou', messages: err.errors })
  }
}
