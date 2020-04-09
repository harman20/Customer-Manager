// Module dependencies
const   mongoose = require('mongoose'),
        Customer = require('../models/customer'),
        State = require('../models/state'),
        dbConfig = require('./configLoader').databaseConfig,
        connectionString = `mongodb://${dbConfig.host}/${dbConfig.database}`,
        connection = null;

class DBSeeder {

    init() {
        mongoose.connection.db.listCollections({name: 'customers'})
                .next((err, collinfo) => {
                    if (!collinfo) {
                        console.log('Starting dbSeeder...');
                        this.seed();
                    }
                });
    }

    seed() {

        console.log('Seeding data....');

        //Customers
        var customerNames =
        [
            "Rahul,Sharma,Male,acmecorp.com",
            "Ajay,Kaushik,Male,gmail.com",
            "Sahil,Aggarwal,Male,outlook.com",
            "Disha,Sharma,Female,yahoo.com",
            "Pankhuri,Sharma,Female,gmail.com",
            "Jaspreet,Singh,Male,gmail.com",
            "Arun,Goel,Male,gmail.com",
            "Pavan,Singh,Male,gmail.com",
            "Ajay,Sharma,Male,acmecorp.com",
            "Garima,Gujaral,Female,hotmail.com",
            "Tushar,Sharma,Male,outlook.com",
            "Divya,Nanda,Female,outlook.com",
            "Shelly,Verma,Female,acmecorp.com",
            "Tarun,Goel,Male,yahoo.com",
            "Ritvik,Singh,Male,gmail.com",
            "Pinal,Dave,Male,gmail.com",
            "Fred,Roberts,Male,outlook.com",
            "Tina,Roberts,Female,outlook.com",
            "Cindy,Jamison,Female,gmail.com",
            "Robyn,Flores,Female,yahoo.com",
            "Jeff,Wahlin,Male,gmail.com",
            "Danny,Wahlin,Male,gmail.com",
            "Dikshaa,Khanna,Female,yahoo.com",
            "John,Papa,Male,gmail.com"
        ];
        var addresses =
        [
            "1233 Sector 4 Panchkula",
            "435 Main St.",
            "3456 Delhi Gate",
            "671 Sector 1 Rohtak",
            "12 Ocean View St.",
            "1600 Amrapali Sapphire Noida",
            "1604 Amphitheatre Parkway",
            "1607 Amrapali Sapphier Noida",
            "346 Sector 12 Panchkula",
            "4576 Sector 11 Chandigarh",
            "964 Sectr 2 Rohtak",
            "98756 Mumbai Lane",
            "35632 Richmond Circle Apt B",
            "2352 Angular Way",
            "23566 Directive Pl.",
            "235 Sector 11 Panchkula",
            "7656 Crescent St.",
            "76543 Moon Ave.",
            "84533 Hardrock St.",
            "568 Mumbai Bandra",
            "3463 Sector 22 Chandigarh",
            "23423 Adams St.",
            "633 Main St.",
            "899 Delhi"
        ];

        var citiesStates =
        [
            "Amaravati,AP,Andhra Pradesh",
            "Panchkula,HR,Haryana",
            "Chandigarh,CH,Chandigarh",
            "Gandhinagar,GJ,Gujarat",
            "Jodhpur,RJ,Rajasthan",
            "Patiala,PB,Punjab",
            "Ujjain,MP,Madhya Pradesh",
            "Ahmednagar,MH,Maharashtra",
            "Kochi,KL,Kerala",
            "Cuttack,OD,Odisha",
            "White Plains,NY,New York",
            "Las Vegas,NV,Nevada",
            "Los Angeles,CA,California",
            "Portland,OR,Oregon",
            "Seattle,WA,Washington",
            "Houston,TX,Texas",
            "Chicago,IL,Illinois",
            "Atlanta,GA,Georgia",
            "Chandler,AZ,Arizona",
            "Buffalo,NY,New York",
            "Albuquerque,AZ,Arizona",
            "Boise,ID,Idaho",
            "Salt Lake City,UT,Utah",
            "Orlando,FL,Florida"
        ];

        var citiesIds = [5, 9, 44, 5, 36, 17, 16, 9, 36, 14, 14, 6, 9, 24, 44, 36, 25, 19, 5, 14, 5, 23, 38, 17];


        var zip = 134109;

        var orders =
        [
        { "product": "Basket", "price": 29.99, "quantity": 1 },
        { "product": "Yarn", "price": 9.99, "quantity": 1 },
        { "product": "Needes", "price": 5.99, "quantity": 1 },
        { "product": "Speakers", "price": 499.99, "quantity": 1 },
        { "product": "iPod", "price": 399.99, "quantity": 1 },
        { "product": "Table", "price": 329.99, "quantity": 1 },
        { "product": "Chair", "price": 129.99, "quantity": 4 },
        { "product": "Lamp", "price": 89.99, "quantity": 5 },
        { "product": "Call of Duty", "price": 59.99, "quantity": 1 },
        { "product": "Controller", "price": 49.99, "quantity": 1 },
        { "product": "Gears of War", "price": 49.99, "quantity": 1 },
        { "product": "Lego City", "price": 49.99, "quantity": 1 },
        { "product": "Baseball", "price": 9.99, "quantity": 5 },
        { "product": "Bat", "price": 19.99, "quantity": 1 }
        ];

        Customer.remove({});

        var l = customerNames.length,
            i,
            j,
            firstOrder,
            lastOrder,
            tempOrder,
            n = orders.length;

        for (i = 0; i < l; i++) {
            var nameGenderHost = customerNames[i].split(',');
            var cityState = citiesStates[i].split(',');
            var state = { 'id': citiesIds[i], 'abbreviation': cityState[1], 'name': cityState[2] };
            var customer = new Customer({
                'firstName': nameGenderHost[0],
                'lastName': nameGenderHost[1],
                'email': nameGenderHost[0] + '.' + nameGenderHost[1] + '@' + nameGenderHost[3],
                'address': addresses[i],
                'city': cityState[0],
                'state': state,
                'stateId': citiesIds[i],
                'zip': zip + i,
                'gender': nameGenderHost[2],
                'orderCount': 0
            });
            firstOrder = Math.floor(Math.random() * orders.length);
            lastOrder = Math.floor(Math.random() * orders.length);
            if (firstOrder > lastOrder) {
                tempOrder = firstOrder;
                firstOrder = lastOrder;
                lastOrder = tempOrder;
            }

            customer.orders = [];
            //console.log('firstOrder: ' + firstOrder + ", lastOrder: " + lastOrder);
            for (j = firstOrder; j <= lastOrder && j < n; j++) {
                var today = new Date();
                var tomorrow = new Date();
                tomorrow.setDate(today.getDate() + (Math.random() * 100));

                var o = {
                    "product": orders[j].product,
                    "price": orders[j].price,
                    "quantity": orders[j].quantity,
                    "date": tomorrow
                };
                customer.orders.push(o);
            }
            customer.orderCount = customer.orders.length;

            customer.save((err, cust) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('inserted customer: ' + cust.firstName + ' ' + cust.lastName);
                }
            });
        }

        //States
        var states = [
            { "name": "Andhra Pradesh", "abbreviation": "AP" },
            { "name": "Arunachal Pradesh", "abbreviation": "AR" },
            { "name": "Assam", "abbreviation": "AS" },
            { "name": "Bihar", "abbreviation": "BR" },
            { "name": "Chhattisgarh", "abbreviation": "CG" },
            { "name": "Goa", "abbreviation": "GA" },
            { "name": "Gujarat", "abbreviation": "GJ" },
            { "name": "Haryana", "abbreviation": "HR" },
            { "name": "Himachal Pradesh", "abbreviation": "HP" },
            { "name": "Jharkhand", "abbreviation": "JH" },
            { "name": "Karnataka", "abbreviation": "KA" },
            { "name": "Kerala", "abbreviation": "KL" },
            { "name": "Madhya Pradesh", "abbreviation": "MP" },
            { "name": "Maharashtra", "abbreviation": "MH" },
            { "name": "Manipur", "abbreviation": "MN" },
            { "name": "Meghalaya", "abbreviation": "ML" },
            { "name": "Mizoram", "abbreviation": "MZ" },
            { "name": "Nagaland", "abbreviation": "NL" },
            { "name": "Odisha", "abbreviation": "OD" },
            { "name": "Punjab", "abbreviation": "PB" },
            { "name": "Rajasthan", "abbreviation": "RJ" },
            { "name": "Sikkim", "abbreviation": "SK" },
            { "name": "Tamil Nadu", "abbreviation": "TN" },
            { "name": "Telangana", "abbreviation": "TS" },
            { "name": "Tripura", "abbreviation": "TR" },
            { "name": "Uttar Pradesh", "abbreviation": "UP" },
            { "name": "Uttarakhand", "abbreviation": "UK" },
            { "name": "West Bengal", "abbreviation": "WB" },
            { "name": "Andaman and Nicobar Islands", "abbreviation": "AN" },
            { "name": "Chandigarh", "abbreviation": "CH" },
            { "name": "Dadra and Nagar Haveli and Daman and Diu", "abbreviation": "DD" },
            { "name": "Delhi", "abbreviation": "DL" },
            { "name": "Jammu and Kashmir", "abbreviation": "JK" },
            { "name": "Ladakh", "abbreviation": "LA" },
            { "name": "Lakshadweep", "abbreviation": "LD" },
            { "name": "Puducherry", "abbreviation": "PY" }
        ];

        var l = states.length,
            i;

        State.remove({});

        for (i = 0; i < l; i++) {
            var state = new State ({ 'id': i + 1, 'name': states[i].name, 'abbreviation': states[i].abbreviation });
            states.save();
        }
    }
}

module.exports = new DBSeeder();




