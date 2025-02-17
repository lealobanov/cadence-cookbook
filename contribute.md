# Cadence Cookbook

### What is the Cadence Cookbook?

The Cadence Cookbook is a collection of code examples, recipes, and tutorials designed to help developers learn and understand the Cadence programming language. Cadence is the smart contract programming language used on the Flow blockchain. Whether you are new to Flow or an experienced blockchain developer, the Cadence Cookbook serves as a valuable resource to explore various aspects of Cadence and its applications in building dApps on the Flow blockchain.

Each recipe in the Cadence Cookbook is a practical coding example that showcases a specific aspect of Cadence or use-case on Flow, including smart contract development, interaction, and best practices. By following these recipes, you can gain hands-on experience and learn how to leverage Cadence for your blockchain projects.

## Table of Contents

- [Contributing to the Cadence Cookbook](#contribution)
- [What is included in a Cookbook recipe?](#what-is-included-in-a-cookbook-recipe)
- [Supported Recipe Data](#recipe-data)
- [License](#license)

## Contributing to the Cadence Cookbook

Each recipe is added to the Cadence Cookbook as a Github submodule, which acts as a pointer to an independent repository containing the recipe code and associated explanations. To contribute to the Cadence Cookbook, you can create your own Github repository following the below recipe guidelines. Once ready, you can create a pull request to the main cadence-cookbook repository which adds a new sub-module to the src/data/recipes directory. The cadence-cookbook parent repository runs automated front-end and Cadence tests on all recipes during each release cycle to ensure code in the Cookbook is functional and up-to-date.

### Contribution Guide

Check out this video tutorial explaining the components of a sample Cookbook recipe repository, as well as what a contribution PR to the cadence-cookbook repository should look like: 

## What is included in a Cookbook recipe repository?

Each recipe repository is subdivided into 2 main sections, Cadence code files (.cdc) under the `/cadence` directory, and explanation files (.txt) under the `/explanations` directory.

The Cadence Cookbook supports Cadence code and explanations for the contract, transaction, and testing elements of each recipe.

Recipe metadata, such as title, author, and category labels, is stored in `index.js`. Each recipe also includes a link to a live, runnable example of the corresponding code in the [Flow Playground](https://play.flow.com).

```
recipe-name/
├── cadence/              # Cadence files for recipe examples
│   ├── contract.cdc          # Contract code
│   ├── transaction.cdc          # Transaction code
│   ├── tests.cdc          # Tests code
├── explanations/         # Explanation files for recipe examples
│   ├── contract.txt          # Contract code explanation
│    ├── transaction.txt          # Transaction code explanation
│    ├── tests.txt         # Tests code explanation
├── index.js        # Root file for storing recipe metadata
├── README.md             # This README file
└── LICENSE               # License information
```

## Supported Recipe Data

The below list outlines the data fields currently supported for recipes in the Cadence Cookbook. This list will be maintained and updated as new features and data types are supported in the coming months.

- `const recipe`: defines a unique identifier (slug) for the recipe
- `title`: indicates the title of the recipe
- `featuredText`(optional): a subheading for the recipe title
- `coverUrl` (optional): path to a featured cover image for the recipe
- `createdAt`: date on which recipe was added to the Cadence Cookbook
- `author`: contributor of the recipe
- `playgroundLink`: a link to Flow Playground containing the deployed recipe code
- `excerpt`: a brief description of the recipe contents
- `smartContractCode`: path to location of Cadence smart contract code example
- `smartContractExplanation`: path to location of smart contract code explanation
- `transactionCode`: path to location of Cadence transaction code example
- `transactionExplanation`: path to location of transaction code explanation
- `testsPath`: path to location of Cadence test cases code example
- `testsExplanationPath`: path to location of test cases code explanation
- `filters`: the filters object is used to perform filtering on recipes in the cookbook
    - `difficulty`: the difficulty filter supports one of ['beginner', 'intermediate', 'advanced']


This is an example of a sample index.js file for a recipe repository. For reference and as a starting point for your recipe, we recommend referring to a sample recipe respository maintained by Flow, such as: https://github.com/onflow/add-a-play-to-topshot-set.

```
// Pass the repo name
const recipe = "sample-recipe-name";

//Generate paths of each code file to render
const contractPath = `${recipe}/cadence/contract.cdc`;
const transactionPath = `${recipe}/cadence/transaction.cdc`;
const testsPath = `${recipe}/cadence/tests.cdc`;

//Generate paths of each explanation file to render
const smartContractExplanationPath = `${recipe}/explanations/contract.txt`;
const transactionExplanationPath = `${recipe}/explanations/transaction.txt`;
const testsExplanationPath = `${recipe}/explanations/tests.txt`;

export const sampleRecipe= {
  slug: recipe,
  title: "",
  featuredText: "",
  createdAt: Date(2022, 3, 1),
  author: "",
  playgroundLink: "",
  excerpt: "",
  smartContractCode: contractPath,
  smartContractExplanation: smartContractExplanationPath,
  transactionCode: transactionPath,
  transactionExplanation: transactionExplanationPath,
};
```

## License

This repository is licensed under the [MIT License](LICENSE).