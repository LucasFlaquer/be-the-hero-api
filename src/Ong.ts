import { Incident } from './Incident'

export class Ong {
  private id: string
  private name: string
  private email: string
  private whatsapp: string
  private city: string
  private uf: string
  private incidents: Incident[]

  constructor(name: string, email: string, whatsapp: string, city: string, uf: string) {
    this.generateId()
    this.name = name
    this.email = email
    this.whatsapp = whatsapp
    this.city = city
    this.uf = uf
    this.incidents = []
    this.id=''
  }

  private generateId(): void {
    this.id = Math.random().toString(36)
  }

  public getId(): string {
    return this.id
  }

  public createNewIncident(incident: Incident) {
    this.incidents.push(incident)
  }

  public getIncidents(): Incident[] {
    return this.incidents
  }

  public removeIncident(title: string) {
    const index = this.incidents.findIndex(incident => incident.getTitlte() === title)
    if (index === -1) throw new Error('Incident not found')
    this.incidents.splice(index, 1)
  }
}