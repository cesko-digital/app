![cesko.digital](cesko-digital_logo.png)

# Website cesko.digital

## 🚀 Quick start

1.  **Clone website**

    Clone repository to `cesko-digital-web` folder:

    ```sh
    # Clone cesko-digital/web
    git clone cesko-digital-web https://github.com/cesko-digital/web.git
    ```

1.  **Open the source code and start editing!**

    Go to `cesko-digital-web` directory and open the project in your editor of choice:
    
    ```sh
    cd cesko-digital-web
    code .
    ```
    
    install required node packages and start developing with:

    ```sh
    yarn
    yarn start
    ```

    This invokes `gatsby develop` which is used to start up development version of the webiste running at `http://localhost:8000`.

    Note: You'll also see a second link: `http://localhost:8000/___graphql`. This is a tool you can use to experiment with querying your data.
    
## 📝 Netlify CMS

_Netlify CMS is an open source content management system for your Git workflow that enables you to provide editors with a friendly UI and intuitive workflows._ — [Netlify CMS Docs](https://www.netlifycms.org/docs/intro/)

Netlify CMS starts in parallel with Gatsby. You can access it at `http://localhost:8000/admin/`.

`/admin/` path can be changed by changing `publicPath` option in `gatsby-config.js`:

```js
...
{
  resolve: `gatsby-plugin-netlify-cms`,
  options: {
    modulePath: `${__dirname}/src/cms/cms.jsx`,
    enableIdentityWidget: false,
    publicPath: 'admin',
    htmlTitle: 'Admin cesko.digital',
  },
},
...
```

## ⌨️ Commands

`yarn develop`: Start development version of the project.

`yarn start`: Alias for `yarn develop`.

`yarn build`: Build production version of the project.

`yarn serve`: Serve production build of the project on local machine.

`yarn clean`: Clean .cache and public directories. Useful after installing new packages.

`yarn format`: Format source code with Prettier. This should be done automatically in code editor.

`yarn type-check`: Transpile TypeScript files without emmiting output.

`yarn lint`: Lint TypeScript files using tsconfig.json file.

`yarn test`: Run jest using jes.config.js file.

## 💅 Styling

We are using [Styled Components](https://styled-components.com/) and [Rebass](https://rebassjs.org/) for styling components and also for layout.

Rebass contains robust layout capabalities with flexbox or grid and also simple [theming](https://rebassjs.org/theming).

## 🛠 Linting

We use [TSLint](https://palantir.github.io/tslint/) to lint our code in combination with [Prettier](https://prettier.io/).

Setting up TSLint was inspired by [Maxime Heckel](https://blog.maximeheckel.com/posts/getting-started-with-typescript-on-gatsby-8544b47c1d27).

## MDX

For more information how to set up MDX inside Gatsby refer to [gatsby-plugin-mdx](https://www.gatsbyjs.org/packages/gatsby-plugin-mdx).

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── __mocks__
    ├── .vscode
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── jest-preprocess.js
    ├── jest.config.js
    ├── LICENSE
    ├── package.json
    ├── README.md
    ├── tsconfig.json
    ├── tslint.json
    └── yarn.lock

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

1.  **`/src`**: This directory contains all of the code related to what you see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

1.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

1.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

1.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

1.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

1.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

1.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

1.  **`LICENSE`**: This site is licensed under the BSD 3-Clause License.

1. **`yarn.lock`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly, but don't forget to push it to repository).**

1. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

1. **`README.md`**: A text file containing useful reference information about your project.