import { DashboardContent } from 'src/layouts/dashboard';
import { _user } from 'src/_mock';
import { roleViews } from '../config';

// ----------------------------------------------------------------------



export function ProductsView() {
  const role = _user.role as keyof typeof roleViews;
  const View = roleViews[role];

  return (
    <DashboardContent>
      <View />
    </DashboardContent>
  );
}
