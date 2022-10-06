export class Orders {
  id: number;
  userID: number;
  orderNumber: number;
  productID: number;
  productCount: number;
  totalCost: number;
  status: String;

  constructor(userID: number) {
    this.userID = userID;
    this.status = 'initialized';
  }

  // constructor(id: number, userID: number, orderNumber: number,  productID: number, productCount: number, totalCost: number,status: String;) {
  //   this.userID = userID;
  //   this.status = 'initialized';
  // }
}
