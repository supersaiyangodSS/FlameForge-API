# Changelog

## [Unreleased]

### FlameForge API

- New Features:
    - fetch all characters
    - fetch character by name
    - fetch characters by vision
    - fetch characters by rarity
    - fetch all artifacts
    - fetch all weapons
    - fetch weapons by rarity
    - fetch weapons by type
    - updated ui for documentation
    - increased number for request per 30 minutes from 500 to 1000
    - added changelog
    

### Dashboard

- New Features:
    - user registration
    - user authentication
    - admin and user privileges
    - characters data upload system
    - weapons data upload system
    - artifacts data upload system
    - dashboard usage guidelines and notes
    - dashboard members tab
    - user settings tab
    - delete user account feature
    - admin control tab
    - validation for character, weapon and artifact file
    - export button for characters, weapons and artifacts
    - added delete data button
    - added data edit functionality
    - added versetile page for data edit (characters, weapons and artifacts)
    - added all fields advance validation for characters, weapon and artifacts data edit page
    
## [v1.0.0] - 2024-01-12

### FlameForge API

- Initial release
- fetch random character
- fetch characters by region
- fetch characters by weapon type
- fetch artifacts by name
- fetch random artifact
- fetch weapon by name
- fetch random weapon
- api usage documentation
- character, weapon, artifacts images
- added character card images in response
- added character gacha images in response
- add infoSize option for additional data response
- updated UI for api documentation
- enhanced security headers
- added CSP for security
- added README doc
- added bug report doc
- added feature request doc
<br>

- Bug fix:
    - fixed array response for single character
    - fixed array response for single weapon
    
### Dashboard

- Initial release
- toggle register route option
- added image uploader
- image preview for uploaded image
- backend fixes for image uploader
- categorized image upload for characters, weapons and artifacts
- added instructions and warning for image uploader
- added total counts for characters, weapons and artifacts data
- revamped export buttons
- added search functionality for admin control data
- added modal for delete button
- elevated dashboard members tab to admin privilege
- added show/hide password button to register and login page
- added report form
<br>

- Bug fix:
    - updated ui for login page
    - fixed placeholder image for image uploader
    - fixed logout modal UI
    - fixed no character/weapon found for search results
    - fixed CSP for images and scripts