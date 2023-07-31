const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const path = require('path');

const app = express();

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Store uploaded images in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use(express.static('public'));

// Route to handle form submissions
app.post('/submit-form', upload.fields([{ name: 'profile_screenshot' }, { name: 'payment_screenshot' }]), (req, res) => {
  const formFields = req.body;
  const profileImagePath = req.files['profile_screenshot'][0].path;
  const paymentImagePath = req.files['payment_screenshot'][0].path;

  // Load existing data from the Excel file if it exists
  let workbook;
  try {
    workbook = XLSX.readFile('user_data.xlsx');
  } catch (error) {
    // If the file does not exist, create a new workbook with headers
    workbook = XLSX.utils.book_new();
    const headers = Object.keys(formFields).concat('Profile Screenshot', 'Payment Screenshot');
    const worksheet = XLSX.utils.aoa_to_sheet([headers]);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'UserData');
  }

  // Get the existing worksheet
  const worksheet = workbook.Sheets['UserData'];

  // Append the new user's data to the worksheet
  const newRowData = Object.values(formFields).concat(profileImagePath, paymentImagePath);
  XLSX.utils.sheet_add_json(worksheet, [newRowData], { skipHeader: true, origin: -1 });

  // Save the updated workbook to the Excel file
  XLSX.writeFile(workbook, 'user_data.xlsx');

  res.redirect('https://cdnblog.webkul.com/blog/wp-content/uploads/2018/03/Success-Message-1.png');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
