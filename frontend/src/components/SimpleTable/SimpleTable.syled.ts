import { styled, TableFooter } from "@mui/material"

export const StyledTableFooter = styled(TableFooter)(({ theme }) => ({
    "&.TableFooter--sticky .MuiTableCell-footer": {
        backgroundColor: theme.palette.common.white,
        left: 0,
        bottom: 0,
        zIndex: 2,
        position: "sticky",
    },
}))
