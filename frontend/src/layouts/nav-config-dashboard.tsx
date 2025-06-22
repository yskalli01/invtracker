import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Inventory',
    path: '/products',
    icon: icon('ic-products'),
    // info: (
    //   <Label color="error" variant="inverted">
    //     +3
    //   </Label>
    // ),
  },
  {
    title: 'Clients',
    path: '/user',
    icon: icon('ic-glass-users'),
  },
  {
    title: 'Orders',
    path: '/orders',
    icon: icon('ic-cart'),
  },
  {
    title: 'Warehouses',
    path: '/warehouses',
    icon: icon('ic-warehouses'),
  },
  {
    title: 'Suppliers',
    path: '/suppliers',
    icon: icon('ic-user'),
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: icon('ic-profile'),
  },
  {
    title: 'Calendar',
    path: '/calendar',
    icon: icon('ic-calendar'),
  },
  // {
  //   title: 'Blog',
  //   path: '/blog',
  //   icon: icon('ic-blog'),
  // },
  // {
  //   title: 'Sign in',
  //   path: '/sign-in',
  //   icon: icon('ic-lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic-disabled'),
  // },
];
