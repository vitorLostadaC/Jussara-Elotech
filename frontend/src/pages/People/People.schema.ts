import { ContactSchema } from "../../schema/contact.schema"
import { PeopleSchema } from "../../schema/people.schema"

export type PeopleInputSchema = Omit<PeopleSchema, "id" | "contacts"> & {
  contacts: ContactInputSchema[]
}

export type ContactInputSchema = Omit<ContactSchema, "id">
