import { useState, useCallback } from "react";

// ----------------------------------------------------------------------

export const visuallyHidden = {
    border: 0,
    margin: -1,
    padding: 0,
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    clip: 'rect(0 0 0 0)',
} as const;
  
// ----------------------------------------------------------------------
  
export function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
    return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}
  
// ----------------------------------------------------------------------
  
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
  
// ----------------------------------------------------------------------
  
export function getComparator<Key extends keyof any>(
    order: 'asc' | 'desc',
    orderBy: Key
): (
    a: {
        [key in Key]: number | string;
    },
    b: {
        [key in Key]: number | string;
    }
) => number {
    return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


export type TableProps = {
    colName : string,
    initialRows : number
}


//  colName : the name of the column to sort on first
//  initialRows : the initial number of rows to have on a single page in the table
export function useTable( {colName,initialRows} : TableProps) {
    const [page, setPage] = useState(0);
    const [orderBy, setOrderBy] = useState(colName);
    const [rowsPerPage, setRowsPerPage] = useState(initialRows);
    const [selected, setSelected] = useState<(number|string)[]>([]);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  
    const onSort = useCallback(
      (id: any) => {
        const isAsc = orderBy === id && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
      },
      [order, orderBy]
    );
  
    const onSelectAllRows = useCallback((checked: boolean, newSelecteds: any[]) => {
      if (checked) {
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    }, []);
  
    const onSelectRow = useCallback(
      (inputValue: any) => {
        const newSelected = selected.includes(inputValue)
          ? selected.filter((value) => value !== inputValue)
          : [...selected, inputValue];
  
        setSelected(newSelected);
      },
      [selected]
    );
  
    const onResetPage = useCallback(() => {
      setPage(0);
    }, []);
  
    const onChangePage = useCallback((event: unknown, newPage: number) => {
      setPage(newPage);
    }, []);
  
    const onChangeRowsPerPage = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        onResetPage();
      },
      [onResetPage]
    );
  
    return {
      page,
      order,
      onSort,
      orderBy,
      selected,
      setSelected,
      rowsPerPage,
      onSelectRow,
      onResetPage,
      onChangePage,
      onSelectAllRows,
      onChangeRowsPerPage,
    };
}


type HeadLabel = {
  id: string;
  label?: string;
};


export function propsToHeadLabel<T extends object>(props: T): HeadLabel[] {
  const formatLabel = (key: string) => {
    
    const withSpaces = key.replace(/([A-Z])/g, ' $1'); // e.g. "unitPrice" -> "unit Price"
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
  };

  const array = Object.keys(props)
    .filter((key) => key !== 'id')
    .map((key) => ({
      id: key,
      label: formatLabel(key),
    }));

  array.push({ id: '', label: '' });

  return array;
}
