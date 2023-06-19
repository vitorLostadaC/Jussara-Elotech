import { Box } from "@mui/material"
import { ContainerFormSchema } from "./ContainerForm.schema"

export const ContainerForm = ({ children }: ContainerFormSchema) => {
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "6px",
        padding: 2,
        position: "relative"
      }}
    >
      {children}
    </Box>
  )
}
