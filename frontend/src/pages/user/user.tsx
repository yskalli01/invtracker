import { CONFIG } from 'src/config-global';
import { ClientProvider } from 'src/sections/user/context/useClientContext';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Users - ${CONFIG.appName}`}</title>

      <ClientProvider>
        <UserView />
      </ClientProvider>
    </>
  );
}
