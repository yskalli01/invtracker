import { CONFIG } from 'src/config-global';
import { WarehouseProvider } from 'src/sections/warehouse/context/useWarehouseContext';

import { WarehouseView } from 'src/sections/warehouse/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Warehouse - ${CONFIG.appName}`}</title>
      <WarehouseProvider>
        <WarehouseView />
      </WarehouseProvider>
    </>
  );
}
