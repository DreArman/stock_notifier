export class UserStock {
    constructor({ stock_name = '', type = '', purchase_price = null, quantity = null, total_price = null } = {}) {
      this.stock_name = stock_name;
      this.type = type;
      this.purchase_price = purchase_price;
      this.quantity = quantity;
      this.total_price = total_price;
    }
  
    static fromJson(json) {
      return new UserStock({
        stock_name: json.stock_name,
        type: json.type,
        purchase_price: json.purchase_price,
        quantity: json.quantity,
        total_price: json.total_price,
      });
    }
  }
  