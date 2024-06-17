const moment = require("moment");

class AvailabilityService{

  async getSlotsAvailable(userSchedule,requestDate){
    const duration = userSchedule.duration
    const margin = userSchedule.margin
    const availableSlot = userSchedule.availability[0]
    const day = userSchedule.availability[0].day
    let intervalSlots = []
    availableSlot.intervals.map((interval) => {
      intervalSlots.push(this.calculateSlot(duration,margin,interval,day,requestDate))
    })
    return intervalSlots
  }

  calculateSlot(duration,margin,interval,dayName,requestDate){

    const startTime = interval.startTime
    const endTime = interval.endTime
    let startSlot = startTime
    let endSlot
    let slots = []
    let status
    while (startSlot < endTime) {
      endSlot = moment(startSlot,'HH:mm').add(duration,'m').format('HH:mm')
      if(endSlot > endTime)
        break;

      status = this.checkStatusDate(dayName,requestDate)
      slots.push({startDate:`${moment(requestDate+' '+startSlot).utc(true).toISOString()}`,endDate:`${moment(requestDate+' '+endSlot).utc(true).toISOString()}`,status})
      startSlot = moment(endSlot,'HH:mm').add(margin,'m').format('HH:mm');
    }

    return slots
  }

  checkStatusDate(dayName,requestDate){
    const dayNameRequestDate = moment(requestDate).format('dddd');
    dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);

    return dayNameRequestDate == dayName ? 'on' : 'off'
  }
}

const availabilityService = new AvailabilityService()
module.exports = availabilityService
