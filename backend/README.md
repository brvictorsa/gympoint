## :rocket: Aplicação Backend

A aplicação que iremos dar início ao desenvolvimento a partir de agora é um app gerenciador de academia, o **Gympoint**.

### Checklist de implementação (MÓDULO 2)

Abaixo o checklist de implementação para cumprir o desafio do módulo.

#### 1. Usuário administrador <img alt="OK" src="https://img.shields.io/badge/brvictorsagym-OK-green">

  1. Criar a tabela de usuários administradores (*users*).

  2. Criar um usuário administrador utilizando a funcionalidade de *seeds* do sequelize.

  ```js
  yarn sequelize db:seed:all
  ```

#### 2. Autenticação <img alt="OK" src="https://img.shields.io/badge/brvictorsagym-OK-green">

  1. Permitir que um usuário se autentique em sua aplicação utilizando e-mail e uma senha.

  2. A autenticação deve ser feita utilizando JWT.

  4. Validar dos dados de entrada na autenticação.

#### 3. Cadastro de alunos <img alt="OK" src="https://img.shields.io/badge/brvictorsagym-OK-green">

  1. Criar a tabela de alunos (*students*).

  2. Permitir que alunos sejam mantidos (cadastrados/atualizados) na aplicação utilizando nome, email, idade, peso e altura.

  3. O cadastro de alunos só pode ser feito por administradores autenticados na aplicação.

  4. O aluno não pode se autenticar no sistema, ou seja, não possui senha.

### Checklist de implementação (MÓDULO 3)

  Abaixo o checklist de implementação para cumprir o desafio do módulo.

#### 1. Gestão de planos <img alt="OK" src="https://img.shields.io/badge/brvictorsagym-OK-green">

  1. Permitir que o usuário possa cadastrar planos (*plans*).

  2. Crição alguns planos como por exemplo (Start : Plano de 1 mês por R$129 / Gold : Plano de 3 meses por R$109/mês / Diamond : Plano de 6 meses por R$89/mês).

  3. Crie rotas para listagem/cadastro/atualização/remoção de planos;

  *Obs.: Essa funcionalidade é para administradores autenticados na aplicação.*

#### 2. Gestão de matrículas

1. Criar um cadastro de matrículas (*enrollments*) por aluno. <img alt="OK" src="https://img.shields.io/badge/brvictorsagym-OK-green">

2. Regra(s) de datas <img alt="OK" src="https://img.shields.io/badge/brvictorsagym-OK-green">

* A **data de início** da matrícula deve ser escolhida pelo usuário.
* A **data de término e preço da matrícula deve ser calculada** com base no plano selecionado.

3. E-mail de matrícula

Quando um aluno **realiza uma matrícula** ele recebe um e-mail com detalhes da sua
inscrição na academia como plano, data de término, valor e uma mensagem de boas vindas. <img alt="OK" src="https://img.shields.io/badge/brvictorsagym-OK-green">

4. Crie rotas para listagem/cadastro/atualização/remoção de matrículas; <img alt="OK" src="https://img.shields.io/badge/brvictorsagym-OK-green">

*Obs.: Essa funcionalidade é para administradores autenticados na aplicação*

#### 3. Funcionalidades do aluno <img alt="OK" src="https://img.shields.io/badge/brvictorsagym-OK-green">

1. Checkins: criar a tabela de checkins dos alunos.

2. Regra(s) dos checkins: o usuário só pode fazer **5 checkins** dentro de um período de 7 dias corridos.

*Exemplo de requisição: POST https://gympoint.com/students/3/checkins*

3. Criar rota para listagem de todos checkins realizados por um aluno com base em
seu ID de cadastro.

*Exemplo de requisição: GET https://gympoint.com/students/3/checkins*

4. Criar a a tabela de pedidos de auxílio (*help_orders*). <img alt="OK" src="https://img.shields.io/badge/brvictorsagym-OK-green">

5. Criar uma para a academia listar todos pedidos de auxílio sem resposta. <img alt="OK" src="https://img.shields.io/badge/brvictorsagym-OK-green">

6. Criar uma rota o aluno cadastrar pedidos de auxílio. <img alt="OK" src="https://img.shields.io/badge/brvictorsagym-OK-green">

*Exemplo de requisição: POST https://gympoint.com/students/3/help-orders*

7. Criar uma rota para listar todos pedidos de auxílio de um aluno. <img alt="OK" src="https://img.shields.io/badge/brvictorsagym-OK-green">

*Exemplo de requisição: GET https://gympoint.com/students/3/help-orders*

8. Criar uma rota para a academia responder um pedido de auxílio. <img alt="OK" src="https://img.shields.io/badge/brvictorsagym-OK-green">

*Exemplo de requisição: POST https://gympoint.com/help-orders/1/answer*

8. E-mail de resposta

Quando um pedido de auxílio **for respondido, o aluno deve receber um e-mail da plataforma com a pergunta e resposta da academia**. <img alt="OK" src="https://img.shields.io/badge/brvictorsagym-OK-green">






