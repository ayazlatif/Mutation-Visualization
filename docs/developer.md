# Developer Documentation

## Design Decisions

MutViz is a dynamic React based application that can be easily ported to a hosted site. Users do not have to execute scripts locally to generate visualization content but can instead simply upload a formatted JSON file (conformed to a specific schema) that is not tied to a specific language or framework. Once the input data is uploaded, users are directed to an exploration page in which they can begin analyzing their mutants.<br><br>
Uploaded JSON mutation data is persisted in the state of the app component. That is, any time the state changes (such as another file is uploaded or a mutant is edited in-app), the changes are propagated throughout the website. Since mutants may or may not be productive and/or equivalent (sometimes this can only be determined after analyzing the mutant), we added switches for users to mark mutants as appropriate. These switches also update the app state appropriately (such as updating the summary page and table information). The user can save the (updated) mutation data at any time to a new file to store as a record for future uploads or as data to potentially feed back into a mutation analyzer to improve future test executions.<br><br>
We discussed several different designs for MutViz, including possibly displaying the entire source code and/or abstract syntax tree (with the applied mutations). However, we ultimately decided on the more simple, flexible approach described above so as to not overwhelm the user and provide only the most relevant information.

## Style

We tried following best coding practices while developing MutViz. The application is modularized into independent, reusable components, simplifying the application control flow and promoting extensibility. State information is cleanly passed between parent and child components via React "props" (or properties), and the application dynamically renders HTML elements based on persisted state changes. Application assets (or constant application data) as well as CSS style sheets are saved as separate documents to keep the application organized.

## Testing

During the development of MutViz, smaller component implementations often changed. However, the core design always adhered to the high-level specification. To accommodate this workflow, we employ some snapshot testing to verify that specific HTML components are rendered, but primarily rely on tests that mock dependencies and “spy” on the behavior being tested. That is, any component not under test is “mocked” out such that only the behavior of the component under test is evaluated. This verifies that the appropriate calls are made. To help guide us, we used the code converge tool generated by React.

The [TestSuite](../TestSuite/) folder contains test classes for each component, including a snapshot folder with HTML snapshots (for the snapshot tests). Tests for a given component can be added in the appropiate file following the testing pattern shown.

## Future Development

MutViz can be easily integrated with an existing mutation analyzer. However, we are still looking to improve its functionality. Possible improvements include:
- Hosting the tool online for even greater ease of use
- Leveraging a database either remotely or locally to persist mutation data rather than relying on JSON uploads (offloading the input processing to a server rather than the in the application)
- Providing a better visualization scheme for higher order mutants (namely, a better diff visualization for multi-line mutations)

## Available Scripts

In the project directory, you can run:

### `npm install`

This will install any necessary modules for the project and put them into the `node_modules` directory.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify