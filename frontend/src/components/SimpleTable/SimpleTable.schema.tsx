import { SxProps, Theme } from "@mui/material"
import { ReactNode } from "react"

type SimpleTableColumnSchema<T> = {
    /**
     * The content of the column header.
     *
     * We can use column filter components here.
     */
    headerCell: ReactNode
    /**
     * The key name of the object-row property being rendered in the column data cell.
     *
     * If we want to render action buttons, specify the value `actions` and a callback in `actionCell` *prop*.
     */
    dataCellType: keyof T | "actions"
    /**
     * Callback that receives the object-row being rendered and returns a JSX Element.
     *
     * It can be used to create advanced/customized cells like a cell for action buttons.
     *
     * To use this prop, we need to set the *prop* `dataCellType` to `actions`
     *
     * @param row The object being rendered in the row
     * @param index The index of row
     * @returns The element that will be rendered in the column data cell.
     */
    actionCell?: (row: T, index: number) => JSX.Element
    /**
     * Width applied in the column's cells
     */
    width?: string | number
    /**
     * CSS applied in the column's cells
     */
    sx?: SxProps<Theme>
}
export interface SimpleTablePropsSchema<T> {
    id?: string
    className?: string
    /**
     * A array specifying the column header and column content.
     */
    columns: SimpleTableColumnSchema<T>[]
    /**
     * The array of objects that will be rendered as rows.
     */
    rows: T[]
    /**
     * A caption functions like a heading for a table. Most screen readers announce the content of captions. Captions help users to find a table and understand what it's about and decide if they want to read it.
     */
    caption?: ReactNode
    /**
     * A component or string can be passed as a table footer
     */
    footer?: ReactNode
    /**
     * Set the footer sticky.
     *
     * @default true
     */
    stickyFooter?: boolean
}
