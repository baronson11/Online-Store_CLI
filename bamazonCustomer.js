const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root",
  database: "b_amazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Welcome to the 'Darkside' of Amazon!");
  viewProducts();
});

function viewProducts() {
  let results = connection.query(
    "SELECT * FROM products",
    function(err, res) {
      if (err) throw err;
      for (i = 0; i < res.length; i++) {
        console.log(`
          ID: ${res[i].item_id} |
          Product: ${res[i].product_name} |  Dept: ${res[i].department_name} |
          Price: ${res[i].price} | Stock: ${res[i].stock_quantity}`);
      }
      welcomeCustomer();
    });
}

function welcomeCustomer() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do today?",
      choices: [
        "Purchase a product",
        "View all of the products",
        "Leave and never come back. Ever."
      ]
    }).then(function(answer) {
      switch (answer.action) {
      case "Purchase a product":
        purchaseProduct();
        break;

      case "View all of the products":
        viewProducts();
        break;

      case "Leave and never come back. Ever.":
        console.log("Fine! Your loss! Jeff Bezos is going to take over the world");
        console.log("and you will be left behind! HMPH! -exits angrily-");
        connection.end();
      }
    });
}

function purchaseProduct() {
  // We'll have to use inquirer to prompt the user for the artist they want to find
inquirer
  .prompt([{
    name: "item",
    type: "input",
    message: "Enter the ID number of the item:"
  }, {
    name: "quantity",
    type: "input",
    message: "Enter the number of units:"
  }])
  .then(function(answer) {
    // When we get the answer back, we can query the database for the result
    console.log(`Checking database for items....`);
    // Query Here
    let results = connection.query(
      "SELECT * FROM products WHERE ?",
      {
        item_id: answer.item
      },
      function (err, res) {
        if (err) throw err;
        console.log(
          `You've Selected:
          ${res[0].product_name} |
          The price is: $${res[0].price} |
          Currently in Stock: ${res[0].stock_quantity}`);
        let inStock = res[0].stock_quantity;
        if (inStock >= answer.quantity) {
          let total = answer.quantity * res[0].price;
          console.log("Your order has been processed!");
          console.log(`Your total is: $${total}`)
          let newQuantity = res[0].stock_quantity - answer.quantity;
          updateDatabase(answer.item, newQuantity);
        } else if (inStock < answer.quantity) {
          console.log("Sorry! We are unable to fulfill your order at this time.");
          connection.end();
        }
      }
    )
  });
}

function updateDatabase(productID, newQuantity) {
    console.log("Updating database...");
    let results = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: newQuantity
        },
        {
          item_id: productID
        }
      ],
      function(err, res) {
        if (err) throw err;
        console.log(`${res.affectedRows} item/s has been updated`);
        welcomeCustomer();
      });
}
