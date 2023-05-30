# Blogging Site Mini Project

This is the Technetium repository for the backend cohort's blogging site mini project.

## Project Description

The project involves building a blogging site with authentication and authorization features. It consists of two phases, with each phase having specific requirements.


##   Deployed Link Glitch >> https://night-indecisive-run.glitch.me
##   Deployed Link Randen >> https://group-proj.onrender.com
change path to get other data
## Phase I

### Models

#### Author Model

- `fname` (mandatory)
- `lname` (mandatory)
- `title` (mandatory, enum[Mr, Mrs, Miss])
- `email` (mandatory, valid email, unique)
- `password` (mandatory)

#### Blogs Model

- `title` (mandatory)
- `body` (mandatory)
- `authorId` (mandatory, references author model)
- `tags` (array of strings)
- `category` (string, mandatory)
- `subcategory` (array of strings, e.g., technology-[web development, mobile development, AI, ML, etc.])
- `createdAt`
- `updatedAt`
- `deletedAt` (when the document is deleted)
- `isDeleted` (boolean, default: false)
- `publishedAt` (when the blog is published)
- `isPublished` (boolean, default: false)

### Author APIs

#### Create an author

Create an author document from the request body.

Endpoint: `BASE_URL/api/author`

- Method: `POST`
- Path: `/createAuthor`

#### Create a blog

Create a blog document from the request body and get `authorId` in the request body only.

Make sure the `authorId` is a valid `authorId` by checking if the author exists in the authors collection.

Endpoint: `BASE_URL/api/posts`

- Method: `POST`
- Path: `/createBlog`

#### Get all blogs

Returns all blogs in the collection that aren't deleted and are published.

Endpoint: `BASE_URL/api/posts`

- Method: `GET`
- Path: `/getBlogs`

#### Filter blogs list

Filter blogs list by applying filters. The query parameters can have any combination of the below filters:

- By author Id
- By category
- List of blogs that have a specific tag
- List of blogs that have a specific subcategory

Example of a query URL: `blogs?filtername=filtervalue&f2=fv2`

- Method: `GET`
- Path: `/getBlogs`

#### Update a blog

Updates a blog by changing its title, body, adding tags, and adding a subcategory.

Updates a blog by changing its publish status, i.e., adds `publishedAt` date and sets `isPublished` to `true`.

Check if the `blogId` exists (must have `isDeleted` false). If it doesn't, return an HTTP status 404.

Endpoint: `BASE_URL/api/posts`

- Method: `PUT`
- Path: `/blogs/:blogId`

#### Delete a blog

Check if the `blogId` exists (and is not deleted). If it does, mark it as deleted.

Endpoint: `BASE_URL/api/post`

- Method: `DELETE`
- Path: `/blogs/:blogId`

#### Delete blog documents by query parameters

Delete blog documents by category, authorId, tag name, subcategory name, unpublished.

Endpoint: `BASE_URL/api/post`

- Method: `DELETE`
- Path: `/blogs`

## Phase II

### Authentication and Authorization

#### Login

Allow an author to log in with their email and password. On a successful login attempt, return a JWT token containing the `authorId` in the response body.

Endpoint: `BASE_URL/api/author`

- Method: `POST`
- Path: `/login`

### Authentication

Add an authorization implementation for the JWT token that validates the token before every protected endpoint is called. If the validation fails, return a suitable error message with a corresponding HTTP status code.

Protected routes are: create a blog, edit a blog, get the list of blogs, delete a blog(s).

Set the token, once validated, in the request header `x-api-key`.

Use middleware for authentication purposes.

### Authorization

Make sure that only the owner of the blogs is able to edit or delete the blog.

In case of unauthorized access, return an appropriate error message.

## Testing (Self-evaluation During Development)

To test these APIs, create a new collection in Postman named "Project 1 Blogging".

Each API should have a new request in this collection, and each request should be correctly named (e.g., Create author, Create blog, Get blogs, etc.).

Each member of each team should have their tests in a running state.

## Technologies Used

- Express
- dotenv
- mongoose
- moment
- jsonwebtoken
- bcrypt
- nodemon

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up the environment variables in a `.env` file.
4. Run the server using `npm start` or `npm run dev` for development mode with nodemon.

Please note that this README file provides an overview of the project, its API endpoints, and important details. You may need to provide additional instructions and explanations depending on the specific requirements and implementation of your project.

Remember to update the placeholders (`BASE_URL`, `createAuthor`, `createBlog`, etc.) with the appropriate URLs and paths based on your project's actual implementation.
