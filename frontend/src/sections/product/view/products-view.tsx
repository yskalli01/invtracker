import { DashboardContent } from 'src/layouts/dashboard';
import { _user } from 'src/_mock';
import { roleViews } from '../config';
import { useAuth } from 'src/context/auth-context';

// ----------------------------------------------------------------------



export function ProductsView() {
  const {user} = useAuth();
  const role = user?.role as keyof typeof roleViews;
  const View = roleViews[role];

  return (
    <DashboardContent>
      <View />
    </DashboardContent>
  );
}
