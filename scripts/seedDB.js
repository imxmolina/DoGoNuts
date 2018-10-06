const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/donutDB"
);

const donutSeed = [
    
  // { id: 1,
  //   name: 'Coffee Glazed Doughnut',
  //   image: '../client/src/assets/images/coffeedonut.png' },
  { id: 2,
    name: 'Pumpkin Spice Cake',
    image: 'https://rpelm.com/images/donut-clipart-sugar-donut-5.png' },
  { id: 3,
    name: 'Original Glazed® Doughnut',
    image: 'https://www.krispykreme.com/getattachment/1aa956f7-e7ca-4e27-bcc6-a603211d7c68/Original-Glazed-Doughnut.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 4,
    name: 'Chocolate Iced Glazed',
    image: 'https://www.krispykreme.com/getattachment/6139e1be-6614-479b-80cb-5067293d901d/Chocolate-Iced-Glazed.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 5,
    name: 'Chocolate Iced Glazed with Sprinkles',
    image: 'https://www.krispykreme.com/getattachment/da056e18-6433-4474-b98e-b4f3696bb72b/Chocolate-Iced-Glazed-with-Sprinkles.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 6,
    name: 'Chocolate Iced with KREME™ Filling',
    image: 'https://www.krispykreme.com/getattachment/2da1a66a-78de-46c1-ab88-1715d69cf287/Chocolate-Iced-with-KREME-Filling.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 7,
    name: 'Cake Batter Doughnut',
    image: 'https://www.krispykreme.com/getattachment/7671b2a8-442c-4fbc-80ea-ef21d16c6673/Cake-Batter-Doughnut.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 8,
    name: 'Apple Fritter',
    image: 'https://www.krispykreme.com/getattachment/e84619be-bce0-4239-8352-2117e1b66ad0/Apple-Fritter.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 9,
    name: 'Chocolate Iced Custard Filled',
    image: 'https://www.krispykreme.com/getattachment/2921a3c7-350a-4077-8194-5c8900a9a940/Chocolate-Iced-Custard-Filled.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 10,
    name: 'Glazed Raspberry Filled',
    image: 'https://www.krispykreme.com/getattachment/2453215a-619a-40bd-a64b-1696f533d199/Glazed-Raspberry-Filled.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 11,
    name: 'Glazed Lemon Filled',
    image: 'https://www.krispykreme.com/getattachment/0bd48216-d5a8-4838-885e-1e643a3a0e36/Glazed-Lemon-Filled.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 12,
    name: 'Strawberry Iced with Sprinkles',
    image: 'https://www.krispykreme.com/getattachment/fcd5370c-1aa5-464a-8b24-3b82df06837a/Strawberry-Iced-with-Sprinkles.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 13,
    name: 'Glazed with KREME™  Filling',
    image: 'https://www.krispykreme.com/getattachment/2aa7568e-2b7e-4534-a70b-05f08162e879/Glazed-with-KREME-Filling.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 14,
    name: 'Chocolate Iced Cake',
    image: 'https://www.krispykreme.com/getattachment/1d5b486e-45b0-4771-ab56-f44a2426baf7/Chocolate-Iced-Cake.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 15,
    name: 'Chocolate Iced Raspberry Filled',
    image: 'https://www.krispykreme.com/getattachment/fee97a59-8427-4cbb-b5ee-cb387f578d85/Chocolate-Iced-Raspberry-Filled.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 16,
    name: 'Glazed Chocolate Cake',
    image: 'https://www.krispykreme.com/getattachment/0cc91aab-7ead-4e5d-952a-88e909190a35/Glazed-Chocolate-Cake.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 17,
    name: 'Glazed Blueberry Cake',
    image: 'https://www.krispykreme.com/getattachment/6b57c2f3-b56b-4b6c-8828-c63d0f99e32c/Glazed-Blueberry-Cake.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 18,
    name: 'Cinnamon Apple Filled',
    image: 'https://www.krispykreme.com/getattachment/63312c7f-ff3a-4391-b35e-270852fa6717/Cinnamon-Apple-Filled.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 19,
    name: 'Cinnamon Bun',
    image: 'https://www.krispykreme.com/getattachment/6869881c-ffe6-442e-b1a5-47ac503c1af6/Cinnamon-Bun.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 20,
    name: 'Cinnamon Sugar',
    image: 'https://www.krispykreme.com/getattachment/cbe20d75-913b-4ad7-9dc6-164d850395c4/Cinnamon-Sugar.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 21,
    name: 'Glazed Sour Cream',
    image: 'https://www.krispykreme.com/getattachment/84f85c76-bb0d-40b1-a9f4-0ca5ac8dd52c/Glazed-Sour-Cream.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 22,
    name: 'Traditional Cake',
    image: 'https://www.krispykreme.com/getattachment/d4841d35-ba1e-4708-9549-4dc52793ed39/Traditional-Cake.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 23,
    name: ' Chocolate Iced Glazed Cruller',
    image: 'https://www.krispykreme.com/getattachment/9e6fd86b-c813-46ef-be32-6526422998b5/Chocolate-Iced-Glazed-Cruller.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 24,
    name: 'Cinnamon Twist',
    image: 'https://www.krispykreme.com/getattachment/4fe0bd30-d7e6-4c1b-a7b5-218b9f88bc81/Cinnamon-Twist.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 25,
    name: 'Double Dark Chocolate',
    image: 'https://www.krispykreme.com/getattachment/7137f4fe-f3b2-4b87-9d4f-55ed8cf6d85d/Double-Dark-Chocolate.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 26,
    name: 'Dulce De Leche',
    image: 'https://www.krispykreme.com/getattachment/90a71261-aecc-4206-b695-acab9926a443/Dulce-De-Leche.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 27,
    name: 'Glazed Cinnamon',
    image: 'https://www.krispykreme.com/getattachment/c8002aa7-853e-4097-ad35-1ab43b32cb24/Glazed-Cinnamon.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 28,
    name: 'Glazed Cruller',
    image: 'https://www.krispykreme.com/getattachment/d8f110d2-a357-473d-8c56-22dc80c9e073/Glazed-Cruller.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 29,
    name: 'Maple Iced Glazed',
    image: 'https://www.krispykreme.com/getattachment/dc92076b-0766-42c2-b6f4-63000e0f7af9/Maple-Iced-Glazed.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 30,
    name: 'Mini Chocolate Iced Glazed',
    image: 'https://www.krispykreme.com/getattachment/5e920ad5-4b1e-4829-bd3f-1fd4c7a9050a/Mini-Chocolate-Iced-Glazed.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 31,
    name: 'Mini Chocolate Iced with Sprinkles',
    image: 'https://www.krispykreme.com/getattachment/3c4db6b9-5997-41b1-8d51-4439d06f64e1/Mini-Chocolate-Iced-with-Sprinkles.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 32,
    name: 'Mini Original Glazed® Doughnuts',
    image: 'https://www.krispykreme.com/getattachment/a9bd1d66-c0c1-416a-8b6d-ac1bdb64486a/Mini-Original-Glazed-Doughnuts.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 33,
    name: 'New York Cheesecake',
    image: 'https://www.krispykreme.com/getattachment/fdcc4ab6-e90e-4c6d-88e2-7ca95d78f377/New-York-Cheesecake.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 34,
    name: 'Powdered Blueberry Filled',
    image: 'https://www.krispykreme.com/getattachment/8c233c71-2f68-424a-920c-9d7795391732/Powdered-Blueberry-Filled.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 35,
    name: 'Powdered Cake',
    image: 'https://www.krispykreme.com/getattachment/fb68570f-4549-45ae-a269-e45023b64695/Powdered-Cake.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 36,
    name: 'Powdered Cinnamon Cake',
    image: 'https://www.krispykreme.com/getattachment/56792d34-6537-427d-abdb-401bba948a80/Powdered-Cinnamon-Cake.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 37,
    name: 'Powdered Strawberry Filled',
    image: 'https://www.krispykreme.com/getattachment/de7437d4-9d1a-40f3-b453-c5e511da0c4c/Powdered-Strawberry-Filled.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 38,
    name: 'Powdered with Lemon Kreme',
    image: 'https://www.krispykreme.com/getattachment/5a180ed8-b70c-4f68-bb51-63ec4952da0c/Powdered-with-Lemon-Kreme.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 39,
    name: 'Powdered with Strawberry Kreme',
    image: 'https://www.krispykreme.com/getattachment/ab902bc0-3d50-4a7e-aca2-f90c07f68bd1/Powdered-with-Strawberry-Kreme.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 40,
    name: 'Strawberry Iced',
    image: 'https://www.krispykreme.com/getattachment/7ab68d1c-aa89-445a-9828-11bedd5817e2/Strawberry-Iced.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 41,
    name: 'Original Glazed® Doughnut Holes',
    image: 'https://www.krispykreme.com/getattachment/edfafc3f-82bf-40f5-ae09-8896419c6f4a/Original-Glazed-Doughnut-Holes.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 42,
    name: 'Glazed Cake Doughnut Holes',
    image: 'https://www.krispykreme.com/getattachment/8e641aa4-836f-4726-b5e6-2a11464af93e/Glazed-Cake-Doughnut-Holes.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 43,
    name: 'Glazed Blueberry Cake Doughnut Holes',
    image: 'https://www.krispykreme.com/getattachment/73217a92-df7c-4703-a1d9-4e2c055ab454/Glazed-Blueberry-Cake-Doughnut-Holes.aspx?width=310&height=310&mode=max&quality=60&format=jpg' },
  { id: 44,
    name: 'Glazed Chocolate Cake Doughnut Holes',
    image: 'https://www.krispykreme.com/getattachment/c9dca2e7-fcb6-4c03-b41b-89d0075b66b6/Glazed-Chocolate-Cake-Doughnut-Holes.aspx?width=310&height=310&mode=max&quality=60&format=jpg' }
];

const boxSeed = [
    {
        boxname: "box10",
        donutcount: []
    }
]

const userSeed = [
    {
        username: "Tony123",
        password: "Pa$$w0rd"
    }
]

db.Box
.remove({})
.then(() => db.Box.collection.insertMany(boxSeed))
.then(data => {
    console.log(data.result.n + "donuts inserted");
    process.exit(0);
})
.catch(err => {
    console.error(err);
    process.exit(1);
});

db.Donut
.remove({})
.then(() => db.Donut.collection.insertMany(donutSeed))
.then(data => {
    console.log(data.result.n + "donuts inserted");
    process.exit(0);
})
.catch(err => {
    console.error(err);
    process.exit(1);
});

db.User
.remove({})
.then(() => db.User.collection.insertMany(userSeed))
.then(data => {
    console.log(data.result.n + "user inserted");
    process.exit(0);
})
.catch(err => {
    console.error(err);
    process.exit(1);
});
