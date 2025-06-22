import { CONFIG } from 'src/config-global';
import { OrderProvider } from 'src/sections/order/context/useOrderContext';
import { OrderView } from 'src/sections/order/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Orders - ${CONFIG.appName}`}</title>
      <OrderProvider>
      <OrderView />
      </OrderProvider>
    </>
  );
}
