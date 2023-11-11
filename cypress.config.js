const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/**/*.cy.js',
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
