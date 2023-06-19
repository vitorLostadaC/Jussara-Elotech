import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography
} from "@mui/material"
import { ContainerForm } from "../../components/ContainerForm/ContainerForm"
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm
} from "react-hook-form"
import { maskCPF, maskPhone } from "../../utils/maks"
import { ContactInputSchema, PeopleInputSchema } from "./People.schema"
import { IoMdAdd } from "react-icons/io"
import { FiTrash2 } from "react-icons/fi"
import { formFeedback } from "../../utils/formFeedback"
import { useMutation } from "react-query"

import { toast } from "react-toastify"
import { CreatePeopleParamsSchema } from "../../services/peopleService.schema"
import { createPeople } from "../../services/peopleService"

const contactDefaultValues: ContactInputSchema = {
  email: "",
  name: "",
  phone: ""
}

const peopleDefaultValues: PeopleInputSchema = {
  name: "",
  birthday: "",
  cpf: "",
  contacts: [contactDefaultValues]
}

export const People = () => {
  const methods = useForm<PeopleInputSchema>({
    defaultValues: peopleDefaultValues
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset
  } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts"
  })

  const createPeopleMutation = useMutation({
    mutationFn: (params: CreatePeopleParamsSchema) => createPeople(params),
    onSuccess: () => {
      reset()
      toast.success("Pessoa cadastrada com sucesso")
    }
  })

  const onSubmit: SubmitHandler<PeopleInputSchema> = (data) => {
    createPeopleMutation.mutate({
      ...data,
      birthday: new Date(data.birthday).toJSON(),
      cpf: data.cpf.replace(/\D/g, "")
    })
  }

  return (
    <>
      <Typography variant="h3" sx={{ fontWeight: 100, mb: "60px" }}>
        Cadastrar
      </Typography>
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "60%",
          padding: "10px",
          borderRadius: "8px",
          textAlign: "center",
          gap: "15px",
          boxShadow: 2
        }}
      >
        <Typography sx={{ letterSpacing: "10px" }}>
          Informações pessoais
        </Typography>
        <ContainerForm>
          <Grid container spacing={4}>
            <Grid item md={12}>
              <Controller
                control={control}
                name="name"
                rules={{
                  required: formFeedback.general.required
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    variant="standard"
                    label="Nome *"
                  />
                )}
              />
            </Grid>
            <Grid item md={6}>
              <Controller
                control={control}
                name="birthday"
                rules={{
                  required: formFeedback.general.required
                }}
                render={({ field }) => (
                  <TextField //TODO: change to DatePicker
                    fullWidth
                    {...field}
                    variant="standard"
                    error={!!errors.birthday}
                    helperText={errors.birthday?.message}
                    label="Data de Nascimento *"
                    type="date"
                  />
                )}
              />
            </Grid>
            <Grid item md={6}>
              <Controller
                control={control}
                name="cpf"
                rules={{
                  required: formFeedback.general.required,
                  minLength: formFeedback.general.minLength(14)
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="standard"
                    label="CPF *"
                    helperText={errors.cpf?.message}
                    error={!!errors.cpf}
                    onChange={(event) => {
                      field.onChange(maskCPF(event.target.value))
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </ContainerForm>
        <Typography sx={{ letterSpacing: "10px" }}>Contatos</Typography>
        {fields.map((contact, index) => (
          <>
            <ContainerForm key={contact.id}>
              <Grid container spacing={4}>
                <Grid item md={12}>
                  <Controller
                    control={control}
                    rules={{
                      required: formFeedback.general.required
                    }}
                    name={`contacts.${index}.name`}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        variant="standard"
                        helperText={errors.contacts?.[index]?.name?.message}
                        error={!!errors.contacts?.[index]?.name}
                        label="Nome *"
                      />
                    )}
                  />
                </Grid>
                <Grid item md={6}>
                  <Controller
                    control={control}
                    rules={{
                      required: formFeedback.general.required
                    }}
                    name={`contacts.${index}.email`}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        variant="standard"
                        helperText={errors.contacts?.[index]?.email?.message}
                        error={!!errors.contacts?.[index]?.email}
                        label="Email *"
                      />
                    )}
                  />
                </Grid>
                <Grid item md={6}>
                  <Controller
                    control={control}
                    name={`contacts.${index}.phone`}
                    rules={{
                      required: formFeedback.general.required,
                      min: formFeedback.general.minLength(6)
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        variant="standard"
                        helperText={errors.contacts?.[index]?.phone?.message}
                        error={!!errors.contacts?.[index]?.phone}
                        label="Telefone * "
                        inputProps={{
                          maxLength: 15
                        }}
                        onChange={(e) =>
                          field.onChange(maskPhone(e.target.value))
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </ContainerForm>
            <Button
              startIcon={<FiTrash2 />}
              disabled={fields.length === 1}
              variant="text"
              sx={{ width: "max-content" }}
              onClick={() => remove(index)}
            >
              Deletar contato acima
            </Button>
          </>
        ))}
        <Button
          startIcon={<IoMdAdd />}
          variant="outlined"
          onClick={() =>
            append(contactDefaultValues, {
              shouldFocus: true
            })
          }
        >
          Adicionar novo contato
        </Button>

        <Button type="submit" variant="contained">
          Castrar
        </Button>
      </Box>
    </>
  )
}
