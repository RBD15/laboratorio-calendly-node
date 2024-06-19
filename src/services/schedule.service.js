const boom = require('@hapi/boom');
const Schedule = require('./../database/entities/schedule.entity');

class ScheduleService {
  create(dto) {
    const newSchedule = new Schedule({
      ...dto,
      user: dto.userId,
    });
    return newSchedule.save();
  }

  getAll() {
    return Schedule.find();
  }

  getByUser(userId) {
    try{
      return Schedule.find({ user: userId });
    } catch (error) {
      throw new Error('Schedule wasnt found it')
    }
  }

  async getById(id) {
    try {
      const schedule = await Schedule.findById(id).populate('user');
      if(!schedule)
        throw new Error('Shedule wanst found it')
      return schedule
    } catch (error) {
      throw boom.notFound('Shedule wanst found it')
    }
  }

  update(id, changes) {
    return Schedule.findByIdAndUpdate(id, changes, { upsert: true, new: true });
  }
}

module.exports = ScheduleService;
