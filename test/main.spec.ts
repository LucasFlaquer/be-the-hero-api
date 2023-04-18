import axios from 'axios'
axios.defaults.validateStatus = function () {
  return true
}
describe('API tests', () => {
  it('should be able to register an ONG', async () => {
    const input = {
      name: 'ONG1',
      email: 'fakemail@test.com',
      whatsapp: '+55(15)98809-7161',
      city: 'Sorocaba',
      uf: 'SP'
    }
    const response = await axios.post('http://localhost:3333/register', input)
    expect(response.status).toBe(201)
    expect(response.data.id).toHaveLength(36)
  })
  it('should be able to add an incident to an Ong', async () => {
    const ongID = 'fc2c9b6e-53d4-47dd-9dbf-9759f3d9bf69'
    const input = {
      title: 'A Title',
      description: 'A description here',
      value: 120
    }
    const response = await axios.post('http://localhost:3333/incidents', input)
    expect(response.status).toBe(201)
    
  })
})