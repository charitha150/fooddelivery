const express = require("express");
const bodyParser = require("body-parser");
const menu = require("./data/menu");
const orders = require("./data/orders");
const { startCronJobs } = require("./utils/cron-jobs");

const app = express();
app.use(bodyParser.json());

// Add Menu Item
app.post("/menu", (req, res) => {
    const { name, price, category } = req.body;
    if (!name || price <= 0 || !category) {
        return res.status(400).send("Invalid menu item data");
    }
    const id = menu.length + 1;
    menu.push({ id, name, price, category });
    res.send({ message: "Menu item added", menu });
});

// Get Menu
app.get("/menu", (req, res) => {
    res.send(menu);
});

// Place Order
app.post("/orders", (req, res) => {
    const { items } = req.body;
    if (!Array.isArray(items) || !items.length) {
        return res.status(400).send("Invalid order data");
    }
    const invalidItems = items.filter((id) => !menu.find((item) => item.id === id));
    if (invalidItems.length) {
        return res.status(400).send(`Invalid item IDs: ${invalidItems}`);
    }
    const id = orders.length + 1;
    const status = "Preparing";
    const timestamp = new Date();
    orders.push({ id, items, status, timestamp });
    res.send({ message: "Order placed", orderId: id });
});

// Get Order
app.get("/orders/:id", (req, res) => {
    const order = orders.find((o) => o.id === parseInt(req.params.id));
    if (!order) {
        return res.status(404).send("Order not found");
    }
    res.send(order);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Start CRON jobs
startCronJobs(orders);
