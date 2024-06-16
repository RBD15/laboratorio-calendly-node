const express = require('express');
const ScheduleService = require('../services/schedule.service');
const availabilityService = require('../services/availability.service');

const availabilityRouter = express.Router();
const scheduleService = new ScheduleService();


availabilityRouter.post('/', async (req, res, next) => {
  try {
    const {scheduleId} = req.body;
    const schedule = await scheduleService.getById(scheduleId)
    const intervalSlots = await availabilityService.getSlotsAvailable(schedule)
    res.json({error:false,data:intervalSlots})
  } catch (error) {
    next(error);
  }
});


module.exports = availabilityRouter
