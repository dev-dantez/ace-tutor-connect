# ACE Tutor Connect - Online Tutoring Marketplace

A web-based platform connecting students with qualified tutors across various subjects. Built with PHP, MySQL, JavaScript, and Bootstrap.

## Features

- Browse and search for tutors by subject, rating, and availability
- Tutor profiles with credentials, experience, and ratings
- Student dashboard for managing lessons and communications
- Secure booking and payment system
- Real-time availability calendar
- Review and rating system

## Tech Stack

- **Backend:** PHP 7.4+
- **Database:** MySQL 5.7+
- **Frontend:** HTML5, CSS3, JavaScript
- **CSS Framework:** Bootstrap 5
- **Additional:** jQuery, AJAX

## Setup Instructions

1. **Database Setup**
   ```sql
   mysql -u root -p < database/schema.sql
   ```

2. **Configuration**
   - Copy `includes/db_connect.php` to your web server
   - Update database credentials in `db_connect.php`:
     ```php
     $host = 'your_host';
     $dbname = 'tutor_marketplace';
     $username = 'your_username';
     $password = 'your_password';
     ```

3. **Web Server**
   - Configure your web server (Apache/Nginx) to serve the project
   - Ensure PHP is installed and configured
   - Set appropriate permissions for upload directories

## Project Structure

```
├── database/
│   └── schema.sql          # Database schema and initial data
├── includes/
│   └── db_connect.php      # Database connection configuration
├── assets/
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   └── img/               # Images and media
├── components/            # Reusable PHP components
├── pages/                 # Main page files
└── README.md             # Project documentation
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@acetutor.com or open an issue in the repository.