const availabilityService = require("../../src/services/availability.service")

describe('Test availability Services',() => {
  beforeEach(async () => {

  })

  test("Get Slots from one schedule with same timezone", async() => {
    const requestTimezone = 'America/La_Paz'
    const schedule =
      {
        "_id": "666630f90279a571565e4a5e",
        "title": "Mentorias de Frontend",
        "description": "Este espacio está creado para que hablemos sobre tus dudas técnicas y los bloqueos que tengas respecto a Frontend.",
        "duration": 15,
        "margin": 5,
        "timezone": "America/La_Paz",
        "availability": [
          {
            "day": "monday",
            "intervals": [
              {
                "startTime": "09:00",
                "endTime": "10:15",
                "_id": "666630f90279a571565e4a60"
              },
              {
                "startTime": "20:00",
                "endTime": "21:00",
                "_id": "666630f90279a571565e4a61"
              }
            ],
            "_id": "666630f90279a571565e4a5f"
          },
          {
            "day": "wednesday",
            "intervals": [
              {
                "startTime": "18:00",
                "endTime": "19:00",
                "_id": "666630f90279a571565e4a63"
              }
            ],
            "_id": "666630f90279a571565e4a62"
          }
        ],
        "user": "666630f90279a571565e4a5c",
        "__v": 0
      }
    const requestDate = "2024-06-10"

    const slots = await availabilityService.getSlotsAvailable(schedule,requestDate,requestTimezone)
    expect(slots[0]).toEqual([{startDate:"2024-06-10T09:00:00.000Z",endDate:"2024-06-10T09:15:00.000Z",status:"on"},{startDate:"2024-06-10T09:20:00.000Z",endDate:"2024-06-10T09:35:00.000Z",status:"on"},{startDate:"2024-06-10T09:40:00.000Z",endDate:"2024-06-10T09:55:00.000Z",status:"on"},{startDate:"2024-06-10T10:00:00.000Z",endDate:"2024-06-10T10:15:00.000Z",status:"on"}]);
    // expect(slots[1]).toEqual(['20:00 - 20:15', '20:20 - 20:35', '20:40 - 20:55'])
  })

  test('Convert hour using timezone',()=>{
    const requestTimezone = 'America/Caracas'
    const originalTimezone = 'America/Bogota'
    const hour = "10:00"
    const dateConverted = availabilityService.convertHourByTimeZone(originalTimezone,requestTimezone,hour)
    expect('11:00').toEqual(dateConverted)
  })

  test("Get Slots from one schedule different timezone", async() => {
    const requestTimeZone = "America/Caracas"
    const schedule =
      {
        "_id": "666630f90279a571565e4a5e",
        "title": "Mentorias de Frontend",
        "description": "Este espacio está creado para que hablemos sobre tus dudas técnicas y los bloqueos que tengas respecto a Frontend.",
        "duration": 15,
        "margin": 5,
        "timezone": "America/Bogota",
        "availability": [
          {
            "day": "monday",
            "intervals": [
              {
                "startTime": "09:00",
                "endTime": "10:15",
                "_id": "666630f90279a571565e4a60"
              },
              {
                "startTime": "20:00",
                "endTime": "21:00",
                "_id": "666630f90279a571565e4a61"
              }
            ],
            "_id": "666630f90279a571565e4a5f"
          },
          {
            "day": "wednesday",
            "intervals": [
              {
                "startTime": "18:00",
                "endTime": "19:00",
                "_id": "666630f90279a571565e4a63"
              }
            ],
            "_id": "666630f90279a571565e4a62"
          }
        ],
        "user": "666630f90279a571565e4a5c",
        "__v": 0
      }
    const requestDate = "2024-06-10"
    let slots = await availabilityService.getSlotsAvailable(schedule,requestDate,requestTimeZone)

    expect(slots[0]).toEqual([{startDate:"2024-06-10T10:00:00.000Z",endDate:"2024-06-10T10:15:00.000Z",status:"on"},{startDate:"2024-06-10T10:20:00.000Z",endDate:"2024-06-10T10:35:00.000Z",status:"on"},{startDate:"2024-06-10T10:40:00.000Z",endDate:"2024-06-10T10:55:00.000Z",status:"on"},{startDate:"2024-06-10T11:00:00.000Z",endDate:"2024-06-10T11:15:00.000Z",status:"on"}]);
    // expect(slots[1]).toEqual(['20:00 - 20:15', '20:20 - 20:35', '20:40 - 20:55'])
  })


})
