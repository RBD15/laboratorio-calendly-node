const moment = require('moment-timezone')

class AvailabilityService{

  async getSlotsAvailable(userSchedule,requestDate,requestTimezone){
    const {duration, margin, timezone: originalTimezone} = userSchedule
    const availableSlot = userSchedule.availability[0]
    const day = availableSlot.day
    let intervalSlots = []

    availableSlot.intervals.map((interval) => {
      intervalSlots.push(this.calculateSlots(duration,margin,interval,day,requestDate,originalTimezone,requestTimezone))
    })
    return intervalSlots
  }

  calculateSlots(duration,margin,interval,dayName,requestDate,originalTimezone,requestTimezone){
    let {startTime, endTime} = interval
    //Modify slots edge time usign Timezones
    if(this.isDifferentTimeZone(originalTimezone,requestTimezone)){
      startTime = this.convertHourByTimeZone(originalTimezone,requestTimezone,startTime)
      endTime = this.convertHourByTimeZone(originalTimezone,requestTimezone,endTime)
    }

    return this.getSlotsAvailableArray(startTime,endTime,duration,margin,requestDate,dayName)
  }

  isDifferentTimeZone(originalTimeZone,requestTimeZone){
    return !(originalTimeZone === requestTimeZone)
  }

  getSlotsAvailableArray(startTime,endTime,duration,margin,requestDate,dayName){
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

  // async convertSlotsUsingTimeZone(slots,originalTimeZone,requestTimeZone){
  // TODO: A different approach, in this case you get first all slots for a timezone and then you modified usign another timezone
  //   let slotsConverted = []
  //   for (let index = 0; index < slots.length; index++) {
  //     const currentSlot = slots[index];
  //     slotsConverted.push(currentSlot.map(slotDate=>{
  //       let startDate,endDate
  //       startDate = this.convertHourByTimeZone(originalTimeZone,requestTimeZone,slotDate.startDate)
  //       endDate = this.convertHourByTimeZone(originalTimeZone,requestTimeZone,slotDate.endDate)
  //       return {startDate,endDate,status:slotDate.status}
  //     })
  //     )
  //   }
  //   return slotsConverted
  // }

  convertHourByTimeZone(originalTimeZone,requestTimeZone,date){
    //TODO:This format has a problem when you convert time zone, you never now whats the whole day, you only know hour
    const currentDate = moment(date,'HH:mm').format('YYYY-MM-DD HH:mm')
    const availableHour = moment.tz(currentDate,originalTimeZone);
    const hourConverted = availableHour.clone().tz(requestTimeZone).format('HH:mm')
    return hourConverted
  }
}

const availabilityService = new AvailabilityService()
module.exports = availabilityService
