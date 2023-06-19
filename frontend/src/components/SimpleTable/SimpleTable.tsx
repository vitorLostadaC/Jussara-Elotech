import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material"
import { ReactNode } from "react"
import { SimpleTablePropsSchema } from "./SimpleTable.schema"
import { StyledTableFooter } from "./SimpleTable.syled"

//TODO: convert colapse table for show contacts
// (https://mui.com/material-ui/react-table/#collapsible-table)
export const SimpleTable = <T,>(props: SimpleTablePropsSchema<T>) => {
  const stickyFooter = props.stickyFooter ?? true

  return (
    <TableContainer
      id={props.id}
      className={`SimpleTable ${props.className}`}
      component={Paper}
    >
      <Table stickyHeader>
        {props.caption && <caption>{props.caption}</caption>}
        <TableHead>
          <TableRow>
            {props.columns.map((column, index) => (
              <TableCell
                key={`${index} - ${String(column.dataCellType)}`}
                width={column.width}
                sx={column.sx}
              >
                {column.headerCell}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {props.columns.map((column, columnIndex) => {
                if (column.actionCell) {
                  if (column.dataCellType !== "actions")
                    console.error(
                      "actionCell prop can not be defined without dataCellType value as 'actions'"
                    )
                  return (
                    <TableCell
                      key={`${columnIndex} - ${String(column.dataCellType)}`}
                      width={column.width}
                      sx={column.sx}
                    >
                      {column.actionCell(row, columnIndex)}
                    </TableCell>
                  )
                }

                return (
                  <TableCell
                    key={`${columnIndex} - ${String(column.dataCellType)}`}
                    width={column.width}
                    sx={column.sx}
                  >
                    {row[column.dataCellType as keyof T] as ReactNode}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
        {props.footer && (
          <StyledTableFooter
            className={stickyFooter ? "TableFooter--sticky" : ""}
          >
            <TableRow>
              <TableCell colSpan={props.columns.length}>
                {typeof props.footer === "string" ? (
                  <Box sx={{ caption: { padding: "0", whiteSpace: "nowrap" } }}>
                    <Typography variant="body2">{props.footer}</Typography>
                  </Box>
                ) : (
                  props.footer
                )}
              </TableCell>
            </TableRow>
          </StyledTableFooter>
        )}
      </Table>
    </TableContainer>
  )
}
