export class Incident {
  private title: string
  private description: string
  private amount: number

  constructor(title: string, description: string, amount: number) {
    if (amount < 0) throw new Error('Amount must be greater than zero')
    
    this.title = title
    this.description = description
    this.amount = amount  
  }

  getTitlte(): string {
    return this.title
  }

}