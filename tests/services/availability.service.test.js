const availabilityService = require("../../src/services/availability.service")

describe('Test availability Services',() => {
  beforeEach(async () => {

  })

  test("Get Slots from one schedule", async() => {
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

    const slots = await availabilityService.getSlotsAvailable(schedule)
    expect(slots[0]).toEqual([{startDate:"09:00",endDate:"09:15",status:"on"},{startDate:'09:20',endDate:'09:35',status:'on'},{startDate:'09:40',endDate:'09:55',status:'on'},{startDate:'10:00',endDate:'10:15',status:'on'}]);
    // expect(slots[1]).toEqual(['20:00 - 20:15', '20:20 - 20:35', '20:40 - 20:55'])
  })


})
