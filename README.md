# FlameForge API

This is an unofficial Genshin Impact API that delivers comprehensive data on characters, weapons, and artifacts. Built with Node.js, Express, and MongoDB, this API provides developers with seamless access to essential Genshin Impact information. Explore character details, weapon stats, and artifact attributes, all within the framework of a robust and user-friendly API.

## Table of Contents

1. [Features](#features)
    1. [API](#api)
    2. [Dashboard](#dashboard)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Documentation](#documentation)
5. [Contributing](#contributing)
6. [License](#license)
7. [Acknowledgement](#acknowledgement)
8. [Demo and Screenshots](#demo-and-screenshots)

## Features

### API

#### Character Information:

* Retrieve detailed information about characters including images.

#### Weapon Information:

* Retrieve detailed information about weapons including stats, passive and images.

#### Artifact Information:

* Retrieve detailed information about artifacts including 2pc, 4pc effects and images.

### Dashboard

* User Authentication and Authorization
* Email verification

#### User:
- User limited features:
    - Upload Character info as JSON
    - Upload Weapon info as JSON
    - Upload Artifact info as JSON
    - Upload images to the server
    - User account deletion

#### Admin:

- All features available to Users, plus:
    - Export characters, weapons and artifacts as JSON
    - Edit characters, weapons and artifacts information
    - Delete characters, weapons and artifacts information
    - User information

## Installation

1. Clone Repository or Download Zip:
    - Clone this repository using git or download the zip file, If downloading, extract the contents after completion.
<br>
2. Rename Environment File:
    - Locate the file named `sample.env` and rename it to `.env`.
<br>
3. Edit the `.env` file and customize the following parameters:
    ```
    # Set your preferred port (default is 3000 if not provided)
    PORT=

    # Provide the URL for your MongoDB/Atlas database
    DB=

    # Secret string for session cookies (leave empty if not needed)
    SECRET=         

    # Your email ID for automated verification mails (optional, only required for email verification)
    SERVER_EMAIL=

    # Enter your email password for automated verification mails (leave empty if not needed)
    SERVER_EMAIL_SECRET=

    # Your own email address (optional, used for specific features like notifications)
    MY_EMAIL=

    # Cloudinary cloud name for image storage (optional, used for image upload features)
    CLOUDINARY_CLOUD_NAME=

    # Cloudinary API key for image storage (optional, used for image upload features)
    CLOUDINARY_API_KEY=

    # Cloudinary API secret for image storage (optional, used for image upload features)
    CLOUDINARY_API_SECRET=
    ```
<br>

4. Option Terminal:
    - Navigate to the root folder of the project in your terminal.
<br>

5. Install Dependencies:
    - Execute the following command to install all required modules:
    ```
    npm install
    ```
<br>

6. Transpile TypeScript Code:
    - Execute the following command to transpile all TypeScript code to JavaScript
    ```
    npm run make
    ```
<br>

7. Build Tailwind:
    - For tailwind development, you can run the optional command to build tailwind css
    ```
    npm run build
    ```
<br>

8. Start the Server:
    - Finally, start the server with the following command:
    ```
    npm run start
    ```

These installation steps, ensure a comprehensive setup of the application. If you have any questions or encounter issues, feel free to reach out for assistance.


## Usage

## Documentation

## Contributing

## License

## Acknowledgement

## Demo and Screenshots 
