import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { libraryGenerator as nxReactLibGenerator } from '@nx/react/src/generators/library/library';
import { Linter } from '@nx/eslint';

const numberOfLibs = 5;

describe('lib generator', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it(`should generate ${numberOfLibs} libs with skipEslint=false`, async () => {
    for (let i = 0; i < numberOfLibs; i++) {
      await nxReactLibGenerator(tree, {
        bundler: 'vite',
        // waiting on an answer for a better way from the nx team, since their getRelativeCwd is not a public api _yet_.
        compiler: 'babel',
        directory: `my-lib-${i}`,
        linter: Linter.EsLint,
        name: `my-lib-${i}`,
        projectNameAndRootFormat: 'as-provided',
        setParserOptionsProject: true,
        skipPackageJson: true,
        skipTsConfig: true,
        style: 'styled-components',
        unitTestRunner: 'vitest',
      });
      const config = readProjectConfiguration(tree, `my-lib-${i}`);
      expect(config).toBeDefined();
    }
  }, 90000);

  it(`should generate ${numberOfLibs} libs with skipEslint=true`, async () => {
    for (let i = 0; i < numberOfLibs; i++) {
      await nxReactLibGenerator(tree, {
        bundler: 'vite',
        // waiting on an answer for a better way from the nx team, since their getRelativeCwd is not a public api _yet_.
        compiler: 'babel',
        directory: `my-lib-${i}`,
        linter: Linter.None,
        name: `my-lib-${i}`,
        projectNameAndRootFormat: 'as-provided',
        setParserOptionsProject: true,
        skipPackageJson: true,
        skipTsConfig: true,
        style: 'styled-components',
        unitTestRunner: 'vitest',
      });
      const config = readProjectConfiguration(tree, `my-lib-${i}`);
      expect(config).toBeDefined();
    }
  }, 90000);
});
