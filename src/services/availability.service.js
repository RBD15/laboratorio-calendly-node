const moment = require("moment");

class AvailabilityService{

  async getSlotsAvailable(userSchedule){
    const duration = userSchedule.duration
    const margin = userSchedule.margin
    const availableSlot = userSchedule.availability[0]

    let intervalSlots = []
    availableSlot.intervals.map((interval) => {
      intervalSlots.push(this.calculateSlot(duration,margin,interval))
    })
    return intervalSlots
  }

  calculateSlot(duration,margin,interval){

    const startTime = interval.startTime
    const endTime = interval.endTime

    let startSlot = startTime
    let endSlot
    let slots = []

    while (startSlot < endTime) {
      endSlot = moment(startSlot,'HH:mm').add(duration,'m').format('HH:mm');
      if(endSlot > endTime)
        break;
      slots.push({startDate:startSlot,endDate:endSlot,status:'on'})
      startSlot = moment(endSlot,'HH:mm').add(margin,'m').format('HH:mm');
    }

    return slots
  }
}

const availabilityService = new AvailabilityService()
module.exports = availabilityService
