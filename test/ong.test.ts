import { Incident } from '../src/Incident'
import { Ong } from '../src/Ong'

describe('Ong', () => {
  it('should be able to create a new Ong', () => {
    const ong = new Ong('APAD', 'apad@test.com', '123', 'Rio do Sul', 'SC')
    expect(ong).toHaveProperty('id')
  })

  it('should be able to add a new Incident to an Ong', () => {
    const ong = new Ong('APAD', 'mail@test.com', '123', 'Rio do Sul', 'SC')
    const incident = new Incident('Caso 1', 'Detalhes do caso', 120)
    ong.createNewIncident(incident)
    expect(ong.getIncidents()).toHaveLength(1)
  })
})