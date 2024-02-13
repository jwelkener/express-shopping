const express = require('express');
const app = express();
const itemsRoutes = require("./routes/items")
const ExpressError = require('./expressError')

app.use(express.json());
app.use("/items", itemsRoutes);

// Define a route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
const port = 3001;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

/** 404 handler */

app.use(function (req, res, next) {
	return new ExpressError("Not Found", 404);
  });

//general error handler

  app.use((err, req, res, next) => {
	res.status(err.status || 500);
  
	return res.json({
	  error: err.message,
	});
  });

  module.exports = app