# Blog Spot
![image](https://github.com/user-attachments/assets/d0debe9f-5f07-43c8-84f7-b22091fa4191)
![image](https://github.com/user-attachments/assets/ada2a529-3628-4d56-bf69-b02c0ef2c30a)

Welcome to **Blog Spot**, a project designed to create a platform for sharing and reading blogs. This README provides an overview of the project, its structure, and how to get started.

## Features

- Create, edit, and delete blog posts.
- View and search for blogs by category or tags.
- User authentication and profile management.
- Responsive design for mobile and desktop.

## Technologies Used (MERN)

- **Frontend**: Next.js, React, TypeScript, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/blog-spot.git
   ```
2. Navigate to the project directory:
   ```bash
   cd blog-spot
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

## Usage

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:5000`.

## Folder Structure

```
blog_spot/
├── frontend/       # React frontend code
├── backend/        # Express backend code
├── models/         # Database models
├── routes/         # API routes
├── public/         # Static assets
└── README.md       # Project documentation
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, feel free to reach out at your-email@example.com.
