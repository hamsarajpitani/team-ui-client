# opi-ui: Project Structure

This document explains the folder structure of the opi-ui project.

## src

The `src` folder contains the source code for the React application.

- **components** (folder): Contains reusable UI components for your application.
  Some Examples  include `Readmore`, `Stepper`, and `Table`.

- **data** (folder): Stores data used by your application.
  In this example, there's a `dummy.json` file containing sample data for a IPO.

- **features** (folder): Feature-specific folders group related components and logic.
  The example shows an `IPO` folder
 - **components** (folder): Likely contains components specific to the feature.
    In this case, there's a `TextContainer.jsx` file. Which is **Shared"" accross features sub folder

  - **detail** (folder): Potentially a section for detail page.
    - **components** (folder):  contain components used for detailed views.
    - **layout** (folder):  folder containing an `IPOContainer.jsx` an UI based reusebale component file.
  - **index.js** (file):  the entry point of component;

    -**listing** (folder): Could be a section for listing items in your application.
    Contains `api.js` and `ipoSlice.js` files, possibly for handling data fetching and logic related to IPO listings.

    -**api** (folder): contains API's related to IPO

    -**ipoSlice** (folder): contain IPO actions & reducers further broken reducer / action folder in large application


- **layout** (folder):  contains Global layout structure components for application.
  The example shows an `index.js` file can also contain Header Footer etc.

- **pages** (folder): contain entry point for specific pages in application.
   example a `Detail` and `Home` folder separate pages in  app.

- **routers** (folder): contains routing logic for application.
   example a `Router.js` file.

- **store** (folder):  contain your application's global store.
   example a `store.js` file.

- **utils** (folder):  contains utility functions used throughout the application.
   example a `helpers` and `hooks` folders.
  - `hooks` might contain React hooks used in your application.

- **index.css ** (folder):  likely contains global CSS styles for your application, including Tailwind CSS directives

# team-UI
# team-UI
# team-UI
# team-ui-client
