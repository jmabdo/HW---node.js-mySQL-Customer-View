var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bamazon"
})

connection.connect(function(err){
    if(err) throw err;

    console.log("connected!");

    displayItems();

})


function displayItems(){
    connection.query("SELECT * FROM products", function(err, results, fields){
        if(err) throw err;

        console.table(results);

        var customerChoices = [];

        for(var i = 0; i < results.length; i++){
            customerChoices.push(results[i].product_name)
        }

        promptCustomer(customerChoices);
    })
}

function promptCustomer(availableItems){
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to buy",
            choices: availableItems,
            name: "purchasedItem"
        },
        {
            type: "input",
            message: "Great, how much many you like to buy?",
            name: "purchaseQuanity"
        }
    ]).then(function(answers){
        console.log(answers.purchasedItem)
        console.log(answers.purchaseQuanity)

        console.log("answers: ", answers)
    })
}