const express = require('express');
const ScheduleService = require('../services/schedule.service');
const availabilityService = require('../services/availability.service');
const boom = require('@hapi/boom');
// const moment = require('moment');
const moment = require('moment-timezone');
const { default: mongoose } = require('mongoose');
const availabilityRouter = express.Router();
const scheduleService = new ScheduleService();

availabilityRouter.post('/', async (req, res, next) => {
  try {
    if(Object.keys(req.body).length === 0)
      throw boom.badRequest('Body vacio')
    const {scheduleId,date:requestDate,timezone} = req.body

    if(!moment(requestDate,'YYYY-MM-DD').isValid())
      throw boom.badRequest('Fecha Invalida')

    if(moment.tz.names().indexOf(timezone) === -1)
      throw boom.badRequest('Zona horaria Invalida')

    if(!mongoose.isObjectIdOrHexString(scheduleId))
      throw boom.badRequest('ScheduleID Invalida')

    const schedule = await scheduleService.getById(scheduleId)
    const intervalSlots = await availabilityService.getSlotsAvailable(schedule,requestDate)
    res.json({error:false,data:intervalSlots})
  } catch (error) {
    next(error);
  }
});


module.exports = availabilityRouter
