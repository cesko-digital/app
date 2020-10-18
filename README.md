![cesko.digital](cesko-digital_logo.png)

# Website cesko.digital

## 🚀 Quick start

1.  **Requirements**

    This project requires Node v12+ and Yarn v1.22+.

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

## ⌨️ Commands

`yarn develop`: Start development version of the project.

`yarn lint`: Lint TypeScript files using tsconfig.json file.

`yarn test`: Run jest using jes.config.js file.

`yarn storybook`: Start component library documentation (Storybook)

`yarn start`: Alias for `yarn develop`.

`yarn build`: Build production version of the project.

`yarn serve`: Serve production build of the project on local machine.

`yarn clean`: Clean .cache and public directories. Useful after installing new packages.

`yarn format`: Format source code with Prettier. This should be done automatically in code editor.

`yarn type-check`: Transpile TypeScript files without emmiting output.


## 🛠 Tools

### Styling

We are using [Styled Components](https://styled-components.com/docs).

### MDX

For more information how to set up MDX inside Gatsby refer to [gatsby-plugin-mdx](https://www.gatsbyjs.org/packages/gatsby-plugin-mdx).
