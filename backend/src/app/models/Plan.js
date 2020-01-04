import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING(50),
        duration: Sequelize.INTEGER,
        monthly_price: Sequelize.DECIMAL(6, 2),
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Plan;
