import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { GenericTableHead} from ".";
import { emptyRows, propsToHeadLabel, useTable } from "./utils";
import { Scrollbar } from "../scrollbar";



export function GenericTableBody<T extends { id?: any; }, U extends Object>(
  table: ReturnType<typeof useTable>,
  filteredElements: T[],
  element: U,
  renderRow: (row: T, selected: boolean, onSelect: () => void) => React.ReactNode,
  notFound: boolean,
  filterName ?: string) {
  
  return( 
    <Scrollbar>
    <TableContainer sx={{ overflow: 'unset' }}>
      <Table sx={{ minWidth: 800 }}>
        
        <GenericTableHead
          order={table.order}
          orderBy={table.orderBy}
          rowCount={filteredElements.length}
          numSelected={table.selected.length}
          onSort={table.onSort}
          onSelectAllRows={(checked) => table.onSelectAllRows(
            checked,
            filteredElements.map((w) => w.id)
          )}
          headLabel={propsToHeadLabel(element)} />

        <TableBody>
          {filteredElements
            .slice(
              table.page * table.rowsPerPage,
              table.page * table.rowsPerPage + table.rowsPerPage
            )
            .map((row) => renderRow(
              row,
              typeof row.id !== 'undefined' && table.selected.includes(row.id),
              () => table.onSelectRow(row.id)
            )
            )}

            {/* Empty rows  */}
            {emptyRows(table.page, table.rowsPerPage, filteredElements.length) > 0 && (
              <TableRow
                sx={{
                  height: 0 * emptyRows(table.page, table.rowsPerPage, filteredElements.length),
                }}
              >
                <TableCell colSpan={9} />
              </TableRow>
            )}

          
          {notFound && 
            <TableRow>
              <TableCell align="center" colSpan={7}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Not found
                  </Typography>

                  <Typography variant="body2">
                    No results found for &nbsp;
                    <strong>&quot;{filterName}&quot;</strong>.
                    <br /> Try checking for typos or using complete words.
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          }

        </TableBody>
      </Table>
    </TableContainer>
  </Scrollbar>
  )
}
