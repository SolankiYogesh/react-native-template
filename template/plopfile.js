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
        templateFile: 'plop/plopTemplates/Component.tsx.hbs'
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
        templateFile: 'plop/plopTemplates/Screen.tsx.hbs'
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

  // --SCREEN SPECIFIC COMPONENT GENERATOR--
  plop.setGenerator('screen specific component', {
    description: 'Generate a screen specific component (at src/screens/screenName/components/)',
    prompts: [
      {
        type: 'input',
        name: 'screenName',
        message: '\x1b[33mWhat is the name of the screen you want to create component for?\x1b[0m'
      },
      {
        type: 'input',
        name: 'name',
        message: "\x1b[33mWhat is this component's name?\x1b[0m"
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/screens/{{pascalCase screenName}}/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop/plopTemplates/Component.tsx.hbs'
      }
    ]
  })
}
