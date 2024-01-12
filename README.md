# Solent Student Blog app

## Installation

### 1. Clone the repository:

`git clone https://github.com/krisztian-Z/react_firebase_blog.git`

### 2. Change into the project directory if not there:

`cd student-blog-app`

### 3. Install dependencies:
`npm install`
    
### 4. Start the development server:
`npm start`


### 5. Folder Structure

```
└─ .
   ├─ .firebase
   │  └─ hosting.YnVpbGQ.cache
   ├─ .firebaserc
   ├─ build
   │  ├─ asset-manifest.json
   │  ├─ favicon.ico
   │  ├─ images
   │  │  ├─ firebase.png
   │  │  ├─ java.jpg
   │  │  ├─ javaScript.png
   │  │  ├─ nodejs.png
   │  │  ├─ notFound.jpg
   │  │  ├─ python.png
   │  │  ├─ react.png
   │  │  └─ solent_logo.jpg
   │  ├─ index.html
   │  ├─ logo192.png
   │  ├─ logo512.png
   │  ├─ manifest.json
   │  ├─ robots.txt
   │  └─ static
   │     ├─ css
   │     │  ├─ main.368f6937.css
   │     │  └─ main.368f6937.css.map
   │     ├─ js
   │     │  ├─ 787.f99b1002.chunk.js
   │     │  ├─ 787.f99b1002.chunk.js.map
   │     │  ├─ main.fef1721c.js
   │     │  ├─ main.fef1721c.js.LICENSE.txt
   │     │  └─ main.fef1721c.js.map
   │     └─ media
   │        ├─ bootstrap-icons.64ed46b247405068ca60.woff2
   │        └─ bootstrap-icons.66b7720f4a230f1b0341.woff
   ├─ documentation.md
   ├─ firebase.json
   ├─ package-lock.json
   ├─ package.json
   ├─ public
   │  ├─ favicon.ico
   │  ├─ images
   │  │  ├─ firebase.png
   │  │  ├─ java.jpg
   │  │  ├─ javaScript.png
   │  │  ├─ nodejs.png
   │  │  ├─ notFound.jpg
   │  │  ├─ python.png
   │  │  ├─ react.png
   │  │  └─ solent_logo.jpg
   │  ├─ index.html
   │  ├─ logo192.png
   │  ├─ logo512.png
   │  ├─ manifest.json
   │  └─ robots.txt
   ├─ README.md
   └─ src
      ├─ App.css
      ├─ App.js
      ├─ App.test.js
      ├─ components
      │  ├─ BlogSection.js
      │  ├─ Card.js
      │  ├─ Category.js
      │  ├─ CommentBox.js
      │  ├─ Header.js
      │  ├─ LikeButton.js
      │  ├─ Popular.js
      │  ├─ RelatedBlog.js
      │  ├─ Scroll.js
      │  ├─ Search.js
      │  ├─ Spinner.js
      │  ├─ TagBlog.js
      │  ├─ Tags.js
      │  ├─ Trending.js
      │  └─ UserComments.js
      ├─ firebase.js
      ├─ index.css
      ├─ index.js
      ├─ logo.svg
      ├─ media-query.css
      ├─ pages
      │  ├─ About.css
      │  ├─ About.js
      │  ├─ AddEditBlog.js
      │  ├─ Auth.js
      │  ├─ CategoryBlog.js
      │  ├─ Detail.js
      │  ├─ Home.js
      │  └─ NotFound.js
      ├─ reportWebVitals.js
      ├─ setupTests.js
      ├─ style.scss
      └─ utility
         └─ index.js

```



## Tags
- to make them looks like tags, press enter after writing the tag!

## Github
- first i have created a new repository on GitHub
-` npm run build`
- `git init`
- `git add .`
- `git commit -m "build react firebase blog"`
<!-- my url https://github.com/krisztian-Z/react_firebase_blog.git -->
-  `git remote add origin https://github.com/krisztian-Z/react_firebase_blog.git` 
- `git push -u origin main`

## Deploy
- went to Firebase console and choosed Hosting --> Get Started 
- install `npm install -g firebase-tools`
- `firebase login`
- `firebase init`
- Select: (* ) Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
- Use an existing project
- and i choosed my project: solentstudentblog (SolentStudentBlog)
- ? What do you want to use as your public directory? (public) : build
-  Configure as a single-page app (rewrite all urls to /index.html)? (y/N) : y
- Set up automatic builds and deploys with GitHub? (y/N): y 
- File build/index.html already exists. Overwrite? (y/N) :n
- For which GitHub repository would you like to set up a GitHub workflow? (format: user/repository) : krisztian-Z/react_firebase_blog
- Set up the workflow to run a build script before every deploy? (y/N) : y
 What script should be run before every deploy? (npm ci && npm run build) : yes
 Set up automatic deployment to your site's live channel when a PR is merged? (Y/n) : y
 `firebase deploy`