const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = 3000;

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        const timestamp = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
        const originalName = file.originalname.replace(/\s+/g, '_'); // Replace spaces with underscores

        // Check if file with same name exists
        let counter = 0;
        let newFileName = `${req.body.fileName}_${timestamp}_${originalName}`;
        while (fs.existsSync(path.join(__dirname, 'uploads', newFileName))) {
            counter++;
            newFileName = `${req.body.fileName}_${timestamp}_${counter}_${originalName}`;
        }

        cb(null, newFileName);
    }
});

const upload = multer({ storage: storage });

// Serve the HTML files
app.use(express.static(path.join(__dirname, 'public')));

// Handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    const fileName = req.body.fileName;

    if (!file || !fileName) {
        return res.status(400).send('Please provide both file and file name');
    }

    const uniqueSuffix = `${fileName}_${new Date().toISOString().replace(/[-:]/g, '').replace('T', '').split('.')[0]}`;
    const newFileName = `${uniqueSuffix}${path.extname(file.originalname)}`;
    const newFilePath = path.join(__dirname, 'uploads', newFileName);

    fs.rename(file.path, newFilePath, (err) => {
        if (err) {
            return res.status(500).send('Error uploading file');
        }
        res.redirect('/');
    });
});

// Serve uploaded files
app.get('/uploads/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'uploads', fileName);

    fs.exists(filePath, exists => {
        if (exists) {
            res.sendFile(filePath);
        } else {
            res.status(404).send('File not found');
        }
    });
});

// Get list of uploaded files
app.get('/files', (req, res) => {
    fs.readdir('uploads', (err, files) => {
        if (err) {
            res.status(500).send('Error retrieving files');
        } else {
            res.json(files);
        }
    });
});

// Serve files.html
app.get('/file-list', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'files.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
