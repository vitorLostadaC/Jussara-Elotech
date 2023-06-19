import { api } from "../lib/api"
import { PeopleSchema } from "../schema/people.schema"
import {
  CreatePeopleParamsSchema,
  GetAllPeopleResponse
} from "./peopleService.schema"

export const createPeople = (
  params: CreatePeopleParamsSchema
): Promise<PeopleSchema> => api.post("/people", params)

export const GET_ALL_PEOPLE = "getAllPeople"
export const getAllPeople = (): Promise<GetAllPeopleResponse> =>
  api.get("/people")

export const delelePeople = (peopleId: string) =>
  api.delete(`/people/${peopleId}`)
