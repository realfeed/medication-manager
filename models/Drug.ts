import DrugTaking from './DrugTaking'

interface Drug {
  name: string
  stock: number
  prescriptions: number[]
  history: DrugTaking[]
}

export default Drug
