import Bee from 'bee-queue';
import AnswerHelpOrderMail from '../app/jobs/AnswerHelpOrderMail';
import EnrollmentMail from '../app/jobs/EnrollmentMail';
import redisConfig from '../config/redis';

const jobs = [AnswerHelpOrderMail, EnrollmentMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queueName, job) {
    return this.queues[queueName].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
