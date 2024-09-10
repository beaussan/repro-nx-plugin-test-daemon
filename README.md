# ReproNxPluginTestDaemon

This project runs like in a CI env, meaning that the daemon is not started.

Furthermore, there is a patch in nx to add a console.trace to the plugin worker. This helps with finding out what started the graph computation.

- `yarn install`
- run `yarn nx run my-plugin:test`
- see the output where the one with eslint generation is creating a graph every time


```
 PASS   my-plugin  my-plugin/src/generator.spec.ts (26.856 s)
  lib generator
    ✓ should generate 5 libs with skipEslint=false (25324 ms)
    ✓ should generate 5 libs with skipEslint=true (167 ms)
```

Looking at the output, we can see that nx/react is calling nx/eslint:lint-project that will create the graph:

```
        at async createProjectGraphAsync (/repro-nx-plugin-test-daemon/node_modules/nx/src/project-graph/project-graph.js:198:39)
        at async lintProjectGeneratorInternal (/repro-nx-plugin-test-daemon/node_modules/@nx/eslint/src/generators/lint-project/lint-project.js:76:23)
        at async addLinting (/repro-nx-plugin-test-daemon/node_modules/@nx/react/src/generators/library/lib/add-linting.js:11:26)
        at async libraryGeneratorInternal (/repro-nx-plugin-test-daemon/node_modules/@nx/react/src/generators/library/library.js:56:22)
        at async libraryGenerator (/repro-nx-plugin-test-daemon/node_modules/@nx/react/src/generators/library/library.js:24:12)

```
