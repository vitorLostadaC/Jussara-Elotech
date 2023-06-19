import { ContactSchema } from "../schema/contact.schema"
import { PeopleSchema } from "../schema/people.schema"

export type CreatePeopleParamsSchema = Omit<PeopleSchema, "id" | "contacts"> & {
  contacts: Omit<ContactSchema, "id">[]
}

export interface GetAllPeopleResponse {
  content: PeopleSchema[]
  totalPages: number
  pageable: {
    pageSize: number
    pageNumber: number
  }
}
