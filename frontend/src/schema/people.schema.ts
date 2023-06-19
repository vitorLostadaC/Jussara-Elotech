import { ContactSchema } from "./contact.schema"

export interface PeopleSchema {
  id: string
  name: string
  cpf: string
  birthday: string
  contacts: ContactSchema[]
}
