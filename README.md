# Instagram 2.0

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  <img alt="Version" src="https://img.shields.io/badge/Instagram-Clone-brightgreen" />
</p>

### About The Build:

Instagram 2.0 is a clone of Instagram by Meta. It has an Eye-Catching UI and guarantess responsiveness of every page and component upto a minimun width of 375px.
<br />

Current Features :

<li>LogIn and SignUp with Validation</li>
<li>Following and Unfollowing Users</li>
<li>Posting Images</li>
<li>Comment Functionality</li>
<li>Adding Emojis in  Comments</li>
<li>Like Functionality on both Posts and Comments</li>
<li>Getting Suggestions to Follow Users</li>
<li>Profile Page with User data</li>
<li>Default Profile Image to every User on SignUp</li>
<li>SearchBar Modal with User Search Functionality</li>
<li>Responsive Popup Modals for: Likes, Followings, Followers, UserEdit Details </li>
<li>Updating Profile Deatils and Image</li>
<li>Photo Popup Modal in Profile Page</li>
<li>Delete Post functionality for the Owner</li>
<li>One to One Private Messaging functionality with Users in Following</li>
<li>Media(Image, Video), Audio Sending support in Private Messages</li>
<li>Voice Recording and Sending in Private Messages</li>
<li>Last Active Status of Users in Message</li>
<li>Protected Routes</li>
<li>Progress Bar on Route Change</li>
<br/>

## Vite + React.js + Tailwind CSS

Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects.

## How To Start :

### Install Vite and create React project:

Execute [`vite`](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npm init vite@latest
# or
yarn create vite
```

Then follow the prompts and make your choices.
Now execute the following commands:

```bash
cd my-project

npm install
```

### Install and setup Tailwind CSS:

To install [`tailwindcss`](https://tailwindcss.com/docs/installation/using-postcss) and its peer dependencies via `npm`, and create your `tailwind.config.js` file, execute the following commands:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

### Add Tailwind to your PostCSS configuration

Add `tailwindcss` and `autoprefixer` to your `postcss.config.js` file, or wherever PostCSS is configured in your project.

```bash
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

### Configure your Template paths

Add the paths to all of your template files in your `tailwind.config.js` file.

```bash
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Add the Tailwind directives to your CSS

Add the `@tailwind` directives for each of Tailwind’s layers to your main CSS `main.css` file.

```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Now finally run your Project:

Run your build process with `npm run dev`or whatever command is configured in your `package.json` file.

```bash
npm run dev
```

## Author

👤 **Divyam Agarwal**

- Website:
- Github: [@Divyam2600](https://github.com/Divyam2600)

## Show your support

Give a ⭐️ if this project helped you!
