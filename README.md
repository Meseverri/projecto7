### README

# Book App API

This API allows users to manage books, reviews, and user information. It includes schemas for Users, Books, and Reviews.

## Features

- User registration and authentication
- CRUD operations for books and reviews
- Rating system for books
- Admin

## Schemas

### User Schema

### User Schema

- **userName**: String, required
- **password**: String, required
- **name**: String, required
- **bookReviews**: Array of ObjectIDs (references to Review)
- **bookPublished**: Array of ObjectIDs (references to Book)
- **role**: String, default is "user", enum: ["user", "author", "admin"]
- **deleted**: Boolean, default is false

### Book Schema

- **authorId**: ObjectID (reference to User), required
- **title**: String, required
- **genres**: Array of strings, optional
- **description**: String, optional
- **reviewsId**: Array of ObjectIDs (references to Review)
- **createdAt**: Date, default is the current date and time (automatically managed by Mongoose)
- **updatedAt**: Date, default is the current date and time (automatically managed by Mongoose)


### Review Schema

- **userId**: ObjectID (reference to User), required
- **body**: String, optional
- **rating**: Number, required, minimum value is 1, maximum value is 6
- **bookId**: ObjectID (reference to Book), required
- **createdAt**: Date, default is the current date and time (automatically managed by Mongoose)
- **updatedAt**: Date, default is the current date and time (automatically managed by Mongoose)

## API Endpoints

### Users

- POST /users/register: Create a new user
- POST /users/login: Login a user
- GET /users/:id: Get user information
- PUT /users/:id: Update user information
- DELETE /users/:id: Delete a user

### Books

- POST /books/:authorId : Add a new book
- GET /books/:bookId : Get book details 
- GET /books/: Get all book
- PUT /books/:bookId/:authoId : Update book information
- DELETE /books/:id : Soft delete a book

### Reviews

- POST /reviews: Add a new review
- GET /reviews/:id: Get review details
- PUT /reviews/:id: Update review information
- DELETE /reviews/:id: Soft delete a review


## Usage

Make API requests to the server using a tool like Postman or cURL.

---

### MD4 Documentation

# Book App API Documentation

## User Schema

- **userName**: This is the unique identifier for the user. It is a required field.
- **password**: This is the password for the user account. It is a required field.
- **bookReviews**: This field contains an array of ObjectIDs that reference the reviews made by the user on books.
- **bookPublished**: This field contains an array of ObjectIDs that reference the books published by the user.
- **role**: This is the role of the user. It is a string with a default value of "user" and can be one of the following values: "user", "author", or "admin".

## Book Schema

- **authorId**: This field references the User ID of the book's author. It is a required field.
- **title**: This is the title of the book. It is a required field.
- **genres**: This field contains an array of strings that represent the genres of the book. It is an optional field.
- **description**: This is a description of the book. It is an optional field.
- **reviewsId**: This field contains an array of ObjectIDs that reference the reviews for the book.
- **createdAt**: This field contains the date and time when the book was created. It is managed automatically by Mongoose.
- **updatedAt**: This field contains the date and time when the book was last updated. It is managed automatically by Mongoose.

## Review Schema

- **userId**: ObjectID (reference to User), required
- **body**: String, optional
- **rating**: Number, required, minimum value is 1, maximum value is 6
- **bookId**: ObjectID (reference to Book), required
- **createdAt**: Date, default is the current date and time (automatically managed by Mongoose)
- **updatedAt**: Date, default is the current date and time (automatically managed by Mongoose)

## API Endpoints

### Users

- `POST /users`: Create a new user
  - Request body: `{ "userName": "string", "password": "string", "name": "string" }`
- `GET /users/:id`: Get user information by ID
-`GET /users/:id/admin` : Update a role to admin 
  - request auth bearer Token from an existing admin
- `PUT /users/:id`: Update user information by ID
  - Request body: `{ "username": "string", "password": "string", "name": "string" }`
- `DELETE /users/:id`: Delete a user by ID

### Books

- `POST /books/:authorId`: Add a new book
  - Request body: `{"title": "string", "genres": ["string"], "description": "string" }`
- `GET /books`: Get all book details 
- `GET /books/:id`: Get book details by ID
- `PUT /books/:bookId/:authorId`: Update book information by ID and validating the author,*Note: the genere list will be replaced completly*
  - Request body: `{"title": "string", "genres": ["string"], "description": "string" }`
- `DELETE /books/:id`: Delete a book by ID

### Reviews

- `POST /reviews/:userId/:bookId`: Add a new review
  - Request body: `{ "body": "string", "rating": "number" }`
- `GET /reviews/:bookId`: Get reviews for a book details by bookID
- `GET /reviews`
- `PUT /reviews/:id`: Update review information by ID
  - Request body: `{ "userId": "ObjectID", "body": "string", "rating": "number", "bookId": "ObjectID" }`
- `DELETE /reviews/:id`: Soft delete a review by ID
