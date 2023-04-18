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
})