
<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/supersaiyangodSS/FlameForge-API.svg)](https://github.com/supersaiyangodSS/FlameForge-API/stargazers)&nbsp;&nbsp;&nbsp;&nbsp;
[![GitHub forks](https://img.shields.io/github/forks/supersaiyangodSS/FlameForge-API.svg)](https://github.com/supersaiyangodSS/FlameForge-API/network)&nbsp;&nbsp;&nbsp;&nbsp;
[![GitHub contributors](https://img.shields.io/github/contributors/supersaiyangodSS/FlameForge-API.svg)](https://github.com/supersaiyangodSS/FlameForge-API/graphs/contributors)&nbsp;&nbsp;&nbsp;&nbsp;
[![GitHub issues](https://img.shields.io/github/issues/supersaiyangodSS/FlameForge-API.svg)](https://github.com/supersaiyangodSS/FlameForge-API/issues)&nbsp;&nbsp;&nbsp;&nbsp;
[![GitHub license](https://img.shields.io/github/license/supersaiyangodSS/FlameForge-API.svg)](https://github.com/supersaiyangodSS/FlameForge-API/blob/main/LICENSE)


<img src="https://raw.githubusercontent.com/supersaiyangodSS/FlameForge-API/main/public/assets/images/ult.webp">

<h2 style="font-size: 32px;"> FlameForge API </h2>

<p>This is an unofficial Genshin Impact API that delivers comprehensive data on characters, weapons, and artifacts. Built with Node.js, Express, and MongoDB, this API provides developers with seamless access to essential Genshin Impact information. Explore character details, weapon stats, and artifact attributes, all within the framework of a robust and user-friendly API.</p>

[Report Bug](https://github.com/supersaiyangodSS/FlameForge-API/blob/main/docs/bug-report.md) · 
[Request Feature](https://github.com/supersaiyangodSS/FlameForge-API/blob/main/docs/feature-request.md)

</div>

## Table of Contents

1. [Features](#features)
    1. [API](#api)
    2. [Dashboard](#dashboard)
2. [Installation](#installation)
3. [Documentation](#documentation)
4. [Contributing](#contributing)
5. [License](#license)
6. [Contact](#contact)
7. [Acknowledgement](#acknowledgement)
8. [Demo and Screenshots](#demo-and-screenshots)
9. [Changelog](#changelog)

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

## Prerequisites
Before setting up and using the FlameForge API and Dashboard, ensure that you have the following prerequisites:

* Node.js and npm:
    - Install Node.js and npm on your machine. You can download them from nodejs.org.
<br>

* MongoDB:
    - Set up a MongoDB instance or use MongoDB Atlas. Obtain the connection URL for configuring the API.
<br>

* Git:
    - Install Git for version control. You can download it from git-scm.com.
<br>

* Cloudinary Account (Optional):
    - If you plan to use Cloudinary for image management, create a Cloudinary account and obtain the Cloudinary API credentials.

Now that you have the necessary prerequisites, you're ready to proceed with the installation and usage of the FlameForge API and Dashboard.

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
    - Execute the following command to install typescript and nodemon:
    (If you have already installed TypeScript and nodemon globally, you can skip the following command.)
    ```
    npm install typescript, nodemon -g
    ```
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

## Documentation

For comprehensive guidance on utilizing FlameForge API endpoints, including parameter details, response formats, and example payloads, please refer to our API Usage [Documentation](https://flameforge.glitch.me/dashboard).
<!-- add actual link -->

For information on installation, configuration, and initial setup of FlameForge API and Dashboard, please follow the instructions under the [Installation](#installation) section.

## Contributing

### Important Notice: Changes in File Structure

We have made updates to the file structure in the latest versions of the repository. As a result, the `.hbs` files are no longer included in the main codebase. If you require these files for the dashboard frontend, you can find them in the GitHub release section for version v1.0.0.

#### Instructions for Dashboard Frontend Compatibility:
Download the code for version v1.0.0 from the [GitHub releases](https://github.com/supersaiyangodSS/FlameForge-API/releases/tag/v1.0.0).
Locate the .hbs files in the v1.0.0 release and copy them.
Paste these files into the corresponding directories of any newer version you wish to use.

Note: Make sure to check the .gitignore file to understand where these .hbs files should be placed in the updated versions. This information is crucial to ensure the correct functioning of the dashboard frontend.

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the project, specifically from the development branch.
2. Clone your forked repository to your local machine.
3. Create a new branch for your feature (`git checkout -b feature/AmazingFeature`).
4. Implement your changes and commit them (`git commit -m "Add some AmazingFeature"`).
5. Push your changes to the branch (`git push origin feature/AmazingFeature`).
6. Open a pull request, ensuring that the base branch is set to the development branch.

## License
Distributed under the MIT License. See `LICENSE.txt` for more information.

## Contact

Vedant - vedantsapalkar99@gmail.com <br>
Project Link: https://github.com/supersaiyangodSS/FlameForge-API <br>
Main Link: https://flameforge.glitch.me/

## Acknowledgement

I would like to express my sincere appreciation to myself (Vedant), the sole creator and developer of FlameForge API. This project wouldn't have been possible without the dedication, hard work, and passion invested in every aspect, from conception to implementation.

Your contributions and feedback are invaluable, shaping the growth of this project. Here's to a thriving and collaborative future for FlameForge API.

Thank you for being a part of this journey.

-Vedant

## Demo and Screenshots 

![register](https://i.postimg.cc/qvrdTv9j/dashboard-register.png)
![login](https://i.postimg.cc/zGkYX1N5/dashboard-login.png)
![character](https://i.postimg.cc/W4KWs9dT/dashboard-characters.png)
![artifact](https://i.postimg.cc/MGX32kK9/dashboard-weapons.png)
![weapon](https://i.postimg.cc/MGX32kK9/dashboard-weapons.png)
![imgUploader](https://i.postimg.cc/KjtsqnvF/dashboard-image-uploader.png)
![adminControl](https://i.postimg.cc/sfW8gRP8/dashboard-admin-control.png)
![editCharacter](https://i.postimg.cc/dVwgfSyf/admin-control-edit-character.png)
![editWeapon](https://i.postimg.cc/3JgPnHdp/admin-control-edit-weapon.png)
![editArtifact](https://i.postimg.cc/v86Rxny0/admin-control-edit-artifacts.png)
![home](https://i.postimg.cc/4NT0KFB3/dashboard-home.png)
![people](https://i.postimg.cc/jdVpHjdt/dashboard-people.png)
![settings](https://i.postimg.cc/Px9BFXWb/dashboard-settings.png)
![report](https://i.postimg.cc/3JmHVvbk/report.png)
![documentation](https://i.postimg.cc/43NkYF4c/documentation.png)

## Changelog

You can find the detailed changelog [here](https://github.com/supersaiyangodSS/FlameForge-API/blob/main/changelog.md)