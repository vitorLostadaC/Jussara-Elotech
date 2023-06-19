import { Box, IconButton, Stack, Typography } from "@mui/material"
import { useMutation, useQuery, useQueryClient } from "react-query"
import {
  GET_ALL_PEOPLE,
  delelePeople,
  getAllPeople
} from "../../services/peopleService"
import { useEffect, useState } from "react"
import { PeopleSchema } from "../../schema/people.schema"
import { SimpleTable } from "../../components/SimpleTable/SimpleTable"
import { FiTrash2 } from "react-icons/fi"
import { toast } from "react-toastify"

export const PeopleList = () => {
  const queryClient = useQueryClient()
  const [peoples, setPeoples] = useState<PeopleSchema[]>([])

  const getAllPeopleQuery = useQuery({
    queryKey: GET_ALL_PEOPLE,
    queryFn: getAllPeople
  })

  const delelePeopleMutation = useMutation({
    mutationFn: (peopleId: string) => delelePeople(peopleId),
    onSuccess: () => {
      queryClient.invalidateQueries([GET_ALL_PEOPLE])
      toast.success("Registro deletado com sucesso!")
    }
  })

  useEffect(() => {
    if (getAllPeopleQuery.data) {
      const peoples = getAllPeopleQuery.data.content.map((people) => ({
        ...people,
        birthday: new Date(people.birthday).toLocaleDateString()
      }))

      setPeoples(peoples)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAllPeopleQuery.data])

  return (
    <Box>
      <Typography variant="h3" sx={{ fontWeight: 100, mb: "60px" }}>
        Pessoas
      </Typography>
      <SimpleTable
        rows={peoples}
        columns={[
          {
            headerCell: "Nome",
            dataCellType: "name",
            width: "20%"
          },
          {
            dataCellType: "birthday",
            headerCell: "Data de aniversário"
          },
          {
            dataCellType: "cpf",
            headerCell: "Cpf"
          },
          {
            dataCellType: "actions",
            headerCell: "",
            actionCell: (row, index) => (
              <Stack direction="row" justifyContent="flex-end">
                <IconButton onClick={() => delelePeopleMutation.mutate(row.id)}>
                  <FiTrash2 />
                </IconButton>
              </Stack>
            )
          }
        ]}
      />
    </Box>
  )
}
