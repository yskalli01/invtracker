import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
  roles : string[]
};

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
    roles : ["ADMIN","CLIENT"]
  },
  {
    title: 'Inventory',
    path: '/products',
    icon: icon('ic-products'),
    roles : ["ADMIN","CLIENT"]
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
    roles : ["ADMIN"]
  },
  {
    title: 'Orders',
    path: '/orders',
    icon: icon('ic-cart'),
    roles : ["ADMIN"]
  },
  {
    title: 'Warehouses',
    path: '/warehouses',
    icon: icon('ic-warehouses'),
    roles : ["ADMIN"]
  },
  {
    title: 'Suppliers',
    path: '/suppliers',
    icon: icon('ic-user'),
    roles : ["ADMIN"]
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: icon('ic-profile'),
    roles : ["ADMIN","CLIENT"]
  },
  {
    title: 'Calendar',
    path: '/calendar',
    icon: icon('ic-calendar'),
    roles : ["ADMIN"]
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
