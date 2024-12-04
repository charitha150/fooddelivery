# fooddelivery
Features
Menu Management: Add and retrieve menu items with details such as name, price, and category.
Order Placement: Place orders with selected menu items.
Order Tracking: Fetch order details, including current status and timestamps.
Automated Status Updates: Periodically update order statuses from Preparing → Out for Delivery → Delivered using a CRON job.

Tech Stack
Node.js: Backend runtime environment.
Express.js: Web framework for handling API routes.
node-cron: For automating periodic status updates.
In-memory storage: Arrays to store menu items and orders for simplicity.

Requirements
Node.js (v14 or higher)
npm (Node Package Manager)
