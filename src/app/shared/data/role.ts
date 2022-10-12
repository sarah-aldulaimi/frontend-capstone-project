export class Role {
  id: number;
  name: String;
  description: String;
}

export const roles: Role[] = [
  {
    id: 1,
    name: 'Admin',
    description: 'An admin'
  },
  {
    id: 2,
    name: 'Customer',
    description: 'Customer'
  }
];
