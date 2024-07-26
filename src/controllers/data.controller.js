// src/controllers/data.controller.js
let submissions = []; // In-memory storage for simplicity

// Render the form page
export const renderForm = (req, res) => {
  console.log('in renderform function')
    res.render('form');
  };
// Handle form submission
// Handle form submission
export const uploadData = (req, res) => {
  const { name, product, price } = req.body;
  const image = req.file ? req.file.filename : null;

  // Save data to the in-memory storage
  submissions.push({ name, product, price, image });
  console.log('Submission:', submissions);
  // Redirect to display page
  res.redirect('/display');
};

// Display the submitted data
export const displayData = (req, res) => {
  res.render('display', { submissions });
};
