# Pretty-Good-Reads-Backend

**Project Description**<br />
The backend of a semi-clone of Good Reads, where you can search for books and record books you're currently reading, want to read, or have read. You can also rate books you've already read, and view ratings from other users.

**Link to Deployed API**<br />
Live version deployed to Heroku at: https://pretty-good-reads-dlacerte-pz.herokuapp.com

**Technologies Used**<br />
Express.js, Node.js, MongoDB, Mongoose, Google oAuth 2.0, Google Books API

**Link to Frontend Application**<br />
Frontend Live Application: https://pretty-good-reads.netlify.app<br />
Frontend GitHub: https://github.com/dmlacerte/pretty-good-reads-frontend

**Key Features**<br />
- An API that serves JSON data of application users, books, user lists of books, and user ratings. 
- Incorporates the 3rd party Google Books API to populate book searches and book model details.
- Uses Google oAuth 2.0 to authenticate users and set browser cookies for user authentication management. 

**Unsolved Problems**<br />
Due to cross-domain restrictions and chosen deployment applications (Netlify and Heroku) being on the public-suffix list, we were unable to deploy our original authentication method. We originally set HTTP cookies to maintain user authentication sessions, but due to domain restrictions were unable to set cookies and switched to local storage user session validation. Please see commented code within the frontend and backend files for evidence of HTTP cookie authorization method, which can be tested using localhost.

**Installation Instructions**<br />
1. Fork and clone down this repository.
2. Install required packages using `npm i`.
3. Obtain an API key from the Google Books API site. 
4. Assign the following env variables in an .env file at your root:
    - DEV_DB_URL: Your development database URL.
    - DB_URL: Your production database URL (if deploying).
    - REACT_APP_FRONT_END_DEV: Your frontend dev URL (localhost)
    - REACT_APP_FRONT_END_PROD: Your frontend prod URL (if deploying)
5. Test the app functionality by running `npx nodemon server.js` (if using Mac) to start the server. 

**Authors / Contributors**<br />
Phil Zeise & Deanna Lacerte

**Source Citations**<br />
- https://blog.prototypr.io/how-to-build-google-login-into-a-react-app-and-node-express-api-821d049ee670
