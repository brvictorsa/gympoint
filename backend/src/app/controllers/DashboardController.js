import { fn, col } from 'sequelize';

import Enrollment from '../models/Enrollment';
import HelpOrder from '../models/HelpOrder';
import Plan from '../models/Plan';
import Student from '../models/Student';

class DashboardController {
  //lista as informações para o dashboard
  async index(req ,res) {

    const enrollments = await Enrollment.count();
    const helpOrders = await HelpOrder.count();
    const plans = await Plan.count();
    const students = await Student.count();

    return res.json({
      students,
      plans,
      enrollments,
      helpOrders,
    });
  }
}

export default new DashboardController();
