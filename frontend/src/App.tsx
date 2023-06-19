import { Stack } from "@mui/material"
import { People } from "./pages/People/People"
import { PeopleList } from "./pages/PeoplesList/PeoplesList"

function App() {
  return (
    <Stack
      sx={{
        height: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        p: "60px 0"
      }}
    >
      <PeopleList />
    </Stack>
  )
}

export default App
