import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      title: Yup.string()
        .max(50, 'O título do plano pode ter no máximo 50 caracteres')
        .required(),
      duration: Yup.number()
        .moreThan(0, 'A duranção deve ser um número positivo e maior que zero')
        .required('Duração em meses obrigatória'),
      monthly_price: Yup.number()
        .min(0, 'O preço mensal deve ser um valor positivo')
        .required('Preço mensal obrigatório'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({ error: 'A validação falhou', messages: err.errors })
  }
}
