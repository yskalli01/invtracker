import { CONFIG } from 'src/config-global';
import { SupplierProvider } from 'src/sections/supplier/context/useSupplierContext';
import { SupplierView } from 'src/sections/supplier/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Supplier - ${CONFIG.appName}`}</title>

      <SupplierProvider><SupplierView /></SupplierProvider>
    </>
  );
}
