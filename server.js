const express = require('express');
const app = express();

// Custom middleware to verify working hours
const workingHoursMiddleware = (req, res, next) => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const hours = date.getHours();
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hours >= 9 && hours < 17) {
    // Proceed to the next middleware or route handler
    next();
  } else {
    // Send the response with a styled message
    res.send(`
      <html>
      <head>
        <style>
          body {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background: #1d1f20;
            color: white;
            font-family: Arial, sans-serif;
          }

          h1 {
            font-size: 24px;
            text-align: center;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <h1>Sorry, the web application is only available during working hours (Monday to Friday, from 9 AM to 5 PM).</h1>
      </body>
      </html>
    `);
  }
};

// Apply the middleware to all routes
app.use(workingHoursMiddleware);

// Serve static files (CSS, images, etc.)
app.use(express.static('public'));

// Route for the home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});

// Route for the Our Services page
app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/views/services.html');
});

// Route for the Contact us page
app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/views/contact.html');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
