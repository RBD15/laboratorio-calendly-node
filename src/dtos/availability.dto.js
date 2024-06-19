const Joi = require("joi");
const moment = require('moment-timezone')
Joi.objectId = require('joi-objectid')(Joi);

const scheduleId = Joi.objectId()
const date = Joi.date().iso()
const timezone = Joi.string().valid(...moment.tz.names())

const getAvailabilityDTO = Joi.object({
	date: date.required(),
	timezone: timezone.required(),
	scheduleId: scheduleId.required()
})

module.exports = {getAvailabilityDTO}
