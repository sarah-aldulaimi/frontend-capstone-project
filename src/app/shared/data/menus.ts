export interface Menu {
  path: string;
  name: string;
}

export const menuList: Menu[] = [
  {
    path: '/products',
    name: 'Products'
  },
  // {
  //   path: '/about',
  //   name: 'About'
  // },
  // {
  //   path: '/contact',
  //   name: 'Contact'
  // },
  {
    path: '/dashboard',
    name: 'Dashboard'
  }
  // ,{
  //   path: '/doc',
  //   name: 'Doc'
  // }
];
export const AdminmenuList: Menu[] = [
  {
    path: '/products-admin',
    name: 'Products'
  },
  {
    path: '/category',
    name: 'Category'
  },
  {
    path: '/dashboard',
    name: 'Dashboard'
  }
];
