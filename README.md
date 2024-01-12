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