const express = require('express');
const ScheduleService = require('../services/schedule.service');
const availabilityService = require('../services/availability.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getAvailabilityDTO } = require('../dtos/availability.dto');
const availabilityRouter = express.Router();
const scheduleService = new ScheduleService();

availabilityRouter.post('/',validatorHandler(getAvailabilityDTO,'body'), async (req, res, next) => {
  try {
    const {scheduleId,date:requestDate,timezone} = req.body
    const schedule = await scheduleService.getById(scheduleId)
    const intervalSlots = await availabilityService.getSlotsAvailable(schedule,requestDate,timezone)
    res.json({error:false,data:intervalSlots})
  } catch (error) {
    next(error);
  }
});


module.exports = availabilityRouter
