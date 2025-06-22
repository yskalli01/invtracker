import { Card, Table, TableBody, TableContainer, TablePagination } from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { GenericTableHead, GenericTableToolbar, TableEmptyRows, TableNoData, emptyRows, propsToHeadLabel, useTable } from "src/components/table";
import { WarehouseProps, WarehouseTableRow } from "./warehouse-table-row";
import { useWarehouseContext } from "../context/useWarehouseContext";




type WarehouseTableProps = {
    filteredWarehouses: WarehouseProps[]; 
    filterName: string;
    setFilterName: (value : string) => void; 
    table : ReturnType<typeof useTable>
  };

export function WarehouseTable({filteredWarehouses, filterName, setFilterName,table} : WarehouseTableProps){
    const { deleteWarehouses } = useWarehouseContext();
  
    const notFound = !filteredWarehouses.length && !!filterName;
   
    return(
        <Card>
          <GenericTableToolbar
            numSelected={table.selected.length}
            filterName={filterName}
            onFilterName={(e) => {
              setFilterName(e.target.value);
              table.onResetPage();
            }}
            isFilter={false}
            deleteFunction={async () => {
              await deleteWarehouses(table.selected);
              table.setSelected([]);
            }}
            placeholderText=""
          />


          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <GenericTableHead
                  order={table.order}
                  orderBy={table.orderBy}
                  rowCount={filteredWarehouses.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      filteredWarehouses.map(w => w.id)
                    )
                  }
                  headLabel={propsToHeadLabel(filteredWarehouses[0] || {})}
                />

                <TableBody>
                  {filteredWarehouses
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <WarehouseTableRow
                        key={row.id}
                        row={row}
                        selected={!!row.id && table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={68}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, filteredWarehouses.length)}
                  />

                  {notFound && <TableNoData searchQuery={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            component="div"
            page={table.page}
            count={filteredWarehouses.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Card>
    )
}