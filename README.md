### README

# Book App API

This API allows users to manage books, reviews, and user information. It includes schemas for Users, Books, and Reviews.

## Features

- User registration and authentication
- CRUD operations for books and reviews
- Comments on reviews
- Rating system for books
- Soft deletion for books and reviews

## Schemas

### User Schema

- *username*: String, required
- *password*: String, required
- *name*: String, required
- *book_reviews*: Array of ObjectIDs (references to Review)
- *blog_reviews*: Array of ObjectIDs (references to Blog)
- *publish*: Array of ObjectIDs (references to Book)
- *deleted*: Boolean, default is false

### Book Schema

- *author_id*: ObjectID (reference to User), required
- *name*: String, required
- *number_of_pages*: Number, required
- *reviews*: Array of ObjectIDs (references to Review)
- *deleted*: Boolean, default is false

### Review Schema

- *timestamp*: Date, default is Date.now
- *user_id*: ObjectID (reference to User), required
- *book_id*: ObjectID (reference to Book), required
- *body*: String, required
- *comments*: Array of ObjectIDs (references to User)
- *rating*: Number, required
- *blog_id*: ObjectID (reference to Blog)
- *deleted*: Boolean, default is false

## API Endpoints

### Users

- POST /users: Create a new user
- GET /users/:id: Get user information
- PUT /users/:id: Update user information
- DELETE /users/:id: Soft delete a user

### Books

- POST /books: Add a new book
- GET /books/:id: Get book details
- PUT /books/:id: Update book information
- DELETE /books/:id: Soft delete a book

### Reviews

- POST /reviews: Add a new review
- GET /reviews/:id: Get review details
- PUT /reviews/:id: Update review information
- DELETE /reviews/:id: Soft delete a review

## Installation

1. Clone the repository
2. Install dependencies: npm install
3. Start the server: npm start

## Usage

Make API requests to the server using a tool like Postman or cURL.

---

### MD4 Documentation

# Book App API Documentation

## User Schema

- *username*: This is the unique identifier for the user. It is a required field.
- *password*: This is the password for the user account. It is a required field.
- *name*: This is the name of the user. It is a required field.
- *book_reviews*: This field contains an array of ObjectIDs that reference the reviews made by the user on books.
- *blog_reviews*: This field contains an array of ObjectIDs that reference the reviews made by the user on blogs.
- *publish*: This field contains an array of ObjectIDs that reference the books published by the user.
- *deleted*: This is a boolean field that indicates if the user has been soft deleted.

## Book Schema

- *author_id*: This field references the User ID of the book's author. It is a required field.
- *name*: This is the name of the book. It is a required field.
- *number_of_pages*: This is the total number of pages in the book. It is a required field.
- *reviews*: This field contains an array of ObjectIDs that reference the reviews for the book.
- *deleted*: This is a boolean field that indicates if the book has been soft deleted.

## Review Schema

- *timestamp*: This field contains the date and time when the review was created. The default value is the current date and time.
- *user_id*: This field references the User ID of the person who wrote the review. It is a required field.
- *book_id*: This field references the Book ID for which the review was written. It is a required field.
- *body*: This field contains the main content of the review. It is a required field.
- *comments*: This field contains an array of ObjectIDs that reference the users who commented on the review.
- *rating*: This field contains the rating given by the user. It is a required field.
- *blog_id*: This field references the Blog ID if the review is a blog review.
- *deleted*: This is a boolean field that indicates if the review has been soft deleted.

## API Endpoints

### Users

- POST /users: Create a new user
  - Request body: { "username": "string", "password": "string", "name": "string" }
- GET /users/:id: Get user information by ID
- PUT /users/:id: Update user information by ID
  - Request body: { "username": "string", "password": "string", "name": "string" }
- DELETE /users/:id: Soft delete a user by ID

### Books

- POST /books: Add a new book
  - Request body: { "author_id": "ObjectID", "name": "string", "number_of_pages": "number" }
- GET /books/:id: Get book details by ID
- PUT /books/:id: Update book information by ID
  - Request body: { "author_id": "ObjectID", "name": "string", "number_of_pages": "number" }
- DELETE /books/:id: Soft delete a book by ID

### Reviews

- POST /reviews: Add a new review
  - Request body: { "user_id": "ObjectID", "book_id": "ObjectID", "body": "string", "rating": "number", "blog_id": "ObjectID" }
- GET /reviews/:id: Get review details by ID
- PUT /reviews/:id: Update review information by ID
  - Request body: { "user_id": "ObjectID", "book_id": "ObjectID", "body": "string", "rating": "number", "blog_id": "ObjectID" }
- DELETE /reviews/:id: Soft delete a review by ID
