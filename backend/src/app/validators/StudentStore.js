import * as Yup from 'yup';

export default async(req , res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required('Nome obrigatório'),
      email: Yup.string()
        .email('E-mail inválido')
        .required('E-mail brigatório'),
      age: Yup.number()
        .moreThan(12, 'O aluno deve ter pelo menos 13 anos de idade')
        .required('Idade obrigatória'),
      weight: Yup.number()
        .moreThan(45, 'O aluno deve pesar pelo menos 45Kg')
        .required('Peso obrigatório'),
      height: Yup.number()
        .moreThan(0, 'Altura inválida')
        .required('Altura obrigatória'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({ error: 'A validação falhou', messages: err.errors })
  }
}
