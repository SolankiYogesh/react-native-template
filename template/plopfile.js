module.exports = function (plop) {
  // --COMMON COMPONENT GENERATOR--
  plop.setGenerator('common component', {
    description: 'Generate a common component (at src/components/)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "\x1b[33mWhat is this component's name?\x1b[0m"
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'generator/Component.tsx.hbs'
      },
      {
        path: 'src/components/index.ts',
        pattern: /(\/\/ PLOP COMPONENT IMPORTS)/g,
        template:
          "import {{pascalCase name}} from './{{pascalCase name}}/{{pascalCase name}}';\n$1",
        type: 'modify'
      },
      {
        path: 'src/components/index.ts',
        pattern: /(\/\/ PLOP COMPONENT EXPORTS)/g,
        template: ',\t{{pascalCase name}},\n$1',
        type: 'modify'
      }
    ]
  })

  // --SCREEN GENERATOR--
  plop.setGenerator('screen', {
    description: 'Generate a screen (at src/screens/)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "\x1b[33mWhat is this screens's name?\x1b[0m"
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/screens/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'generator/Screen.tsx.hbs'
      },
      {
        path: 'src/screens/index.ts',
        pattern: /(\/\/ PLOP SCREEN IMPORTS)/g,
        template:
          "import {{pascalCase name}} from './{{pascalCase name}}/{{pascalCase name}}';\n$1",
        type: 'modify'
      },
      {
        path: 'src/screens/index.ts',
        pattern: /(\/\/ PLOP SCREEN EXPORTS)/g,
        template: ',\t{{pascalCase name}},\n$1',
        type: 'modify'
      }
    ]
  })
}
