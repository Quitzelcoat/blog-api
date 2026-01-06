# Blog API

A full-stack blogging platform that enables users to create, publish, and manage blog posts with a comment system. Built with Node.js and React, Blog API provides secure authentication, post management, and reader engagement through comments.

## Live Demo

[Add your deployed link here]

---

## Features

### Post Management

- **Create Posts**: Write and publish blog posts with title and content
- **Draft Posts**: Save posts as drafts before publishing
- **Edit Posts**: Update existing posts (title, content, and draft status)
- **Delete Posts**: Remove posts permanently
- **Read All Posts**: View all published posts in a feed
- **Read Individual Posts**: View full post with all comments

### Comment System

- **Add Comments**: Leave comments on published posts
- **View Comments**: See all comments on each post with author information
- **Delete Comments**: Remove your own comments
- **Nested Structure**: Comments linked to specific posts and authors

### User Features

- **User Authentication**: Secure sign-up and login
- **User Profiles**: Track post authors and comment creators
- **Author Identification**: See who created each post and comment
- **Authentication Status**: Only authenticated users can create/edit posts and comments

### Implemented Features (Completed)

✓ User registration and authentication
✓ Create new blog posts
✓ Edit existing posts
✓ Delete posts (by author)
✓ View all published posts
✓ View individual posts with full content
✓ Add comments to posts
✓ View all comments on a post
✓ Delete comments (by author)
✓ Draft post functionality
✓ Author identification on posts and comments

---

## Tech Stack

### Frontend

- **Framework**: React
- **Styling**: CSS3 with responsive design
- **State Management**: Context API
- **HTTP Client**: Axios
- **Routing**: React Router
- **Additional Libraries**: eslint, vite, jwt-decode,

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: [bcryptjs for password hashing / JWT tokens]
- **Validation**: express.js etc...

---

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- Database PostgreSQL
- npm or yarn
- Git

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/Quitzelcoat/blog-api
cd blog-api/backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend root directory:

```
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

4. Set up the database:

```bash
# For PostgreSQL with Prisma
npx prisma migrate dev --name init
```

5. Start the backend server:

```bash
npm start
```

The backend server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd ../frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the frontend root directory:

```
REACT_APP_API_URL=http://localhost:3000
```

4. Start the development server:

```bash
npm start
```

The frontend will run on `http://localhost:5173`

---

---

## How to Use

### Create an Account

1. Click "Sign Up" on the home page
2. Enter your username, email, and password
3. Click "Create Account"
4. You'll be automatically logged in

### Write a Blog Post

1. Log in to your account
2. Click "Create New Post" or "Write"
3. Enter the post title and content
4. Choose to save as draft or publish immediately
5. Click "Publish" or "Save as Draft"

### Edit a Post

1. Navigate to your post
2. Click the "Edit" button (visible only on your own posts)
3. Update the title, content, or draft status
4. Click "Save Changes"

### Delete a Post

1. Navigate to your post
2. Click the "Delete" button (visible only on your own posts)
3. Confirm deletion
4. The post will be permanently removed

### View All Posts

1. Go to the "Blog" or "Posts" page
2. Browse all published posts from all authors
3. Click on any post to read the full content and comments

### Add a Comment

1. Open any blog post
2. Scroll to the comments section
3. Enter your comment in the text field
4. Click "Post Comment"
5. Your comment will appear with your username and timestamp

### Delete a Comment

1. Find your comment on the post
2. Click the "Delete" option (visible only on your own comments)
3. Confirm deletion
4. The comment will be removed

### Manage Drafts

1. Click "My Drafts" or go to your profile (if implemented)
2. View all your unpublished posts
3. Edit or delete drafts as needed
4. Publish drafts when ready

---

## Key Pages & Components

### Home Page

- Welcome section introducing the blog platform
- Latest published posts
- Featured posts (optional)
- Call-to-action for sign-up

### Posts Feed Page

- List of all published blog posts
- Post previews with title, author, and date
- Search and filter functionality (optional)
- Link to read full post

### Individual Post Page

- Full post content with title and body
- Author name and publication date
- Comments section showing all comments
- Comment form for logged-in users
- Edit/Delete buttons (visible only to post author)

### Create/Edit Post Page

- Title input field
- Rich text editor or textarea for content
- Draft/Publish toggle switch
- Save and Cancel buttons
- Auto-save functionality (optional)

### Login Page

- Email/Username and password fields
- "Forgot Password" link (optional)
- Sign-up link
- Error message display

### Signup Page

- Username, email, and password input fields
- Password confirmation field
- Terms and conditions checkbox (optional)
- Create Account button
- Login link

### User Profile Page

- User information display
- All posts by this author
- Number of posts and comments
- Edit profile button (for own profile)

---

## Authentication & Security

- **Password Encryption**: All passwords are hashed using bcryptjs
- **JWT Authentication**: Secure token-based authentication
- **Authorization**: Users can only edit/delete their own posts and comments
- **Input Validation**: Form validation on frontend and backend
- **CORS Protection**: Backend configured with appropriate CORS settings

---

---

## Future Enhancements

- [ ] Categories and tags for posts
- [ ] Search functionality for posts and comments
- [ ] User profiles with author information
- [ ] Post preview/excerpt on feed
- [ ] Likes/upvotes for posts and comments
- [ ] Nested comments (replies to comments)
- [ ] Rich text editor with formatting
- [ ] Post scheduling for future publication
- [ ] Social sharing buttons
- [ ] Reading time estimate
- [ ] Pagination for posts and comments
- [ ] Email notifications for new comments
- [ ] Post views counter
- [ ] Admin dashboard

---

## Learning Outcomes

This project demonstrates proficiency in:

- Full-stack web development
- User authentication and authorization
- RESTful API design and implementation
- CRUD operations (Create, Read, Update, Delete)
- Database design and relationships
- Frontend-backend integration
- Form handling and validation
- State management in React
- Password encryption and security best practices
- Version control with Git
- Component-based architecture

---

## Troubleshooting

### Database Connection Issues

**Database Connection Failed**

- Verify your `DATABASE_URL` in `.env` is correct
- Ensure your database service is running
- Check database credentials and access permissions

**Migration Errors**

- Ensure all migration files exist
- Run migrations in correct order
- Check database permissions

### Authentication Issues

**Login Not Working**

- Verify the username/email and password are correct
- Check that the user account exists in the database
- Ensure JWT_SECRET is set in `.env`

**Cannot Edit/Delete Posts**

- Verify you are logged in as the post author
- Check that your authentication token is valid
- Token may have expired; try logging out and back in

### API Issues

**Posts Not Loading**

- Verify the backend server is running
- Check network connection
- Verify `REACT_APP_API_URL` matches your backend URL

**Comments Not Appearing**

- Ensure you are logged in to post comments
- Verify the post ID is correct
- Check network tab in browser developer tools

### CORS Errors

- Update backend CORS configuration to include your frontend domain
- Ensure both frontend and backend URLs are correct
- Clear browser cache and cookies

---

## Credits

This project is built as a learning application to demonstrate full-stack development capabilities with modern technologies including React, Express.js, and Node.js.

---

## License

This project is open source and available under the MIT License.

---

## Contact & Portfolio

This project is part of my portfolio and demonstrates my full-stack development capabilities.

- **GitHub**: https://github.com/Quitzelcoat/blog-api
- **Portfolio**: [Your portfolio website]
- **Email**: haris76689@gmail.com

---

**Last Updated**: January 2026
