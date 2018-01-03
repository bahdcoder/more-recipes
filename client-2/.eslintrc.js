module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "env": {
        "es6": true,
        "browser": true
      },
      "rules": {
        "one-var": 0,
        "one-var-declaration-per-line": 0,
        "new-cap": 0,
        "consistent-return": 0,
        "no-param-reassign": 0,
        "comma-dangle": 0,
        "curly": ["error", "multi-line"],
        "linebreak-style": 0,
        "react/jsx-filename-extension": ["off"],
        "import/no-unresolved": [2, { "commonjs": true }],
        "class-methods-use-this": ["off"],
        "no-shadow": ["error", { "allow": ["req", "res", "err"] }],
        "valid-jsdoc": ["error", {
          "requireReturn": true,
          "requireReturnType": true,
          "requireParamDescription": false,
          "requireReturnDescription": true
        }],
        "require-jsdoc": ["error", {
            "require": {
                "FunctionDeclaration": true,
                "MethodDefinition": true,
                "ClassDeclaration": true
            }
        }],
        "jsx-a11y/anchor-is-valid": [ "error", {
            "components": [ "a" ],
            "aspects": [ "noHref", "invalidHref", "preferButton" ]
        }]
      },
      "globals": {
          "expect": true
      }
};