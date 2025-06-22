import type { WarehouseProps } from './components/warehouse-table-row';

// ----------------------------------------------------------------------


type ApplyFilterProps = {
  inputData: WarehouseProps[];
  filterName: string;
  comparator: (a: any, b: any) => number;
};


export type WarehouseFieldsProps = {
  name: string;
  location: string;
  capacity: string;
  setName: (value: string) => void;
  setLocation: (value: string) => void;
  setCapacity: (value: string) => void;
};


export function applyFilter({ inputData, comparator, filterName }: ApplyFilterProps) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  
  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (warehouse) => warehouse.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 || warehouse.location.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}



