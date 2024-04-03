<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Professional File Upload</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f7f7f7;
        }
        .container {
            text-align: center;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #fff;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease-in-out;
        }
        .container:hover {
            transform: translateY(-5px);
        }
        h1 {
            margin-bottom: 20px;
        }
        input[type="file"] {
            margin-bottom: 10px;
        }
        input[type="text"] {
            margin-bottom: 20px;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        button[type="submit"] {
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            margin-right: 10px; /* Add margin-right for spacing */
        }
        button[type="submit"]:hover {
            background-color: #0056b3;
        }
        .redirect-button { /* Style for the redirect button */
            padding: 10px 20px;
            background-color: #28a745; /* Green color */
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .redirect-button:hover {
            background-color: #218838; /* Darker green on hover */
        }
        .upload-message {
            margin-top: 20px;
            color: #28a745;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Professional File Upload</h1>
        <form id="uploadForm" action="/upload" method="post" enctype="multipart/form-data">
            <input type="text" name="fileName" placeholder="Enter file name"> <!-- Thêm input cho người dùng nhập tên file -->
            <input type="file" name="file" id="fileInput">
            <button type="submit">Upload</button>
        </form>
        <!-- Add the redirect button -->
        <button class="redirect-button" onclick="window.location.href='/file-list'">View Uploaded Files</button>
        <!-- Upload message -->
        <div class="upload-message" id="uploadMessage"></div>
    </div>

    <script>
        // Hiệu ứng cho input file khi hover
        const fileInput = document.getElementById('fileInput');
        fileInput.addEventListener('mouseover', function() {
            this.style.opacity = '0.8';
        });
        fileInput.addEventListener('mouseout', function() {
            this.style.opacity = '1';
        });

        // Hiệu ứng cho nút upload khi hover
        const uploadButton = document.querySelector('button[type="submit"]');
        uploadButton.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#0056b3';
        });
        uploadButton.addEventListener('mouseout', function() {
            this.style.backgroundColor = '#007bff';
        });

        // Show upload message
        const uploadForm = document.getElementById('uploadForm');
        uploadForm.addEventListener('submit', function(event) {
            const fileName = document.querySelector('input[name="fileName"]').value;
            const uploadMessage = document.getElementById('uploadMessage');
            uploadMessage.textContent = `Your file has been saved with the name: ${fileName}`;
        });
    </script>
</body>
</html>
