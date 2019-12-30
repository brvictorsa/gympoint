import jwt from 'jsonwebtoken';

import * as Yup from 'yup';
import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    // validação dos dados
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      let message = [];
      // eslint-disable-next-line func-names
      await schema.validate(req.body).catch(function(err) {
        message = err.errors;
      });
      return res.status(400).json({ error: `A validação falhou: ${message}` });
    }

    const { email, password } = req.body;

    // verifica se já existe um usuário
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ error: 'Usuário não encontrado.', token: null, user: null });
    }

    // verifica a senha
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha não confere.' });
    }

    const { id, name } = user;

    // gera o token
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
