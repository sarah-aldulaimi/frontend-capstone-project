export class User {
  id: number;
  firstName: String;
  lastName: String;
  age: number;
  email: String;
  mobile: number;
  password: String;
  locationId: number;

  constructor() {
    this.firstName = 'admin';
    this.lastName = 'account';
    this.age = 99;
    this.email = 'admin@email.com';
    this.mobile = 111;
    this.password = 'admin';
    this.locationId = 1;
  }
}
