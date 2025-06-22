import { Card, TablePagination } from "@mui/material";
import { GenericTableToolbar } from ".";
import { useTable } from "./utils";
import { GenericTableBody } from "./generic-table-body";



type GenericTableProps<T, U> = {
  filteredElements: T[];
  filterName : string;
  setFilterName: (value: string) => void;
  table: ReturnType<typeof useTable>;
  deleteElements: (ids: any[]) => Promise<boolean>;
  placeholderText: string;
  element: U;
  isFilter: boolean;
  renderRow: (row: T, selected: boolean, onSelect: () => void) => React.ReactNode;
};


export function GenericTable<T extends { id?: any }, U extends Object>({
  filteredElements,
  filterName,
  setFilterName,
  table,
  deleteElements,
  placeholderText,
  element,
  isFilter,
  renderRow,
}: GenericTableProps<T, U>) {
  const notFound = !filteredElements.length && !!filterName;
  return (
    <Card sx={{borderRadius : 0}}>
      <GenericTableToolbar
        numSelected={table.selected.length}
        filterName={filterName}
        onFilterName={(e) => {
          setFilterName(e.target.value);
          table.onResetPage();
        }}
        isFilter={isFilter}
        deleteFunction={async () => {
          await deleteElements(table.selected);
          table.setSelected([]);
        }}
        placeholderText={placeholderText}
      />

      {GenericTableBody<T, U>(table, filteredElements, element, renderRow, notFound, filterName)}

      <TablePagination
        component="div"
        page={table.page}
        count={filteredElements.length}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}



