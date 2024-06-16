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
      return schedule
    } catch (error) {
      throw new Error('User wasnt found it')
    }
  }

  update(id, changes) {
    return Schedule.findByIdAndUpdate(id, changes, { upsert: true, new: true });
  }
}

module.exports = ScheduleService;
