#!/usr/bin/env node

import { execSync } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

import chalk from "chalk";
import { program } from "commander";
import fs from "fs-extra";
import ora from "ora";
import prompts from "prompts";
import semver from "semver";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const TEMPLATE_DIR = path.join(ROOT_DIR, "template");

// Used only if npm can't be reached to resolve a version dynamically (see
// resolveRnVersion below) — keep this roughly current, but it's a safety net,
// not the source of truth.
const FALLBACK_RN_VERSION = "0.86.2";

function npmViewJson(spec) {
  const raw = execSync(`npm view ${spec} --json`, { encoding: "utf8" });
  return JSON.parse(raw);
}

// react-native-reanimated / react-native-worklets hard-block their own native
// builds against React Native versions outside the range they've been tested
// against, and that range consistently lags a few RN releases behind. Rather
// than hand-maintain a pinned RN version here, ask npm what the newest RN
// release is that the reanimated/worklets versions in template/package.json
// actually support, and use that. Falls back to FALLBACK_RN_VERSION if npm
// can't be reached (offline, registry hiccup, etc.).
function resolveRnVersion() {
  try {
    const templatePkg = fs.readJsonSync(path.join(TEMPLATE_DIR, "package.json"));
    const packagesToCheck = ["react-native-reanimated", "react-native-worklets"];

    const rnVersions = npmViewJson("react-native versions").filter(
      (v) => semver.valid(v) && !semver.prerelease(v),
    );

    let resolved = null;
    for (const pkgName of packagesToCheck) {
      const specifier = templatePkg.dependencies?.[pkgName];
      if (!specifier) continue;

      const peerRange = npmViewJson(`${pkgName}@${specifier} peerDependencies.react-native`);
      const maxForPkg = semver.maxSatisfying(rnVersions, peerRange);
      if (!maxForPkg) continue;

      resolved = resolved === null || semver.lt(maxForPkg, resolved) ? maxForPkg : resolved;
    }

    if (!resolved) throw new Error("Could not resolve a compatible React Native version.");
    return resolved;
  } catch (error) {
    console.log(
      chalk.yellow(
        `\n⚠️  Couldn't resolve the latest compatible React Native version from npm (${error.message}). Falling back to ${FALLBACK_RN_VERSION}.`,
      ),
    );
    return FALLBACK_RN_VERSION;
  }
}

program
  .name("rn-template-cli")
  .description(
    "CLI to create a new React Native project using this template's files, automatically resolving the newest React Native version the template's dependencies (reanimated/worklets) actually support.",
  )
  .argument("<project-name>", "Name of the new React Native project")
  .option(
    "--skip-pod-install",
    "Skip the iOS `pod install` step (and its confirmation prompt)",
  )
  .action(async (projectName, options) => {
    const projectPath = path.resolve(process.cwd(), projectName);

    console.log(
      chalk.cyan(
        `\n🚀 Creating a new React Native project: ${chalk.bold(projectName)}`,
      ),
    );

    // 1. Choose Package Manager
    const response = await prompts({
      type: "select",
      name: "packageManager",
      message: "Which package manager would you like to use?",
      choices: [
        { title: "npm", value: "npm" },
        { title: "yarn", value: "yarn" },
        { title: "pnpm", value: "pnpm" },
        { title: "bun", value: "bun" },
      ],
      initial: 0,
    });

    if (!response.packageManager) {
      console.log(chalk.red("Operation cancelled."));
      process.exit(0);
    }

    const pkgManager = response.packageManager;

    // 2. Whether to run `pod install` (iOS only; --skip-pod-install bypasses the prompt)
    let runPodInstall = false;
    if (process.platform === "darwin") {
      if (options.skipPodInstall) {
        runPodInstall = false;
      } else {
        const podResponse = await prompts({
          type: "confirm",
          name: "podInstall",
          message: "Run `pod install` for iOS now?",
          initial: true,
        });

        if (podResponse.podInstall === undefined) {
          console.log(chalk.red("Operation cancelled."));
          process.exit(0);
        }

        runPodInstall = podResponse.podInstall;
      }
    }

    const spinner = ora();

    try {
      // 3. Check if folder already exists
      if (fs.existsSync(projectPath)) {
        console.error(
          chalk.red(`\n❌ Error: Folder ${projectName} already exists!`),
        );
        process.exit(1);
      }

      // 4. Resolve the newest RN version the template's dependencies support
      spinner.start(chalk.yellow("🔎 Resolving compatible React Native version..."));
      const rnVersion = resolveRnVersion();
      spinner.succeed(chalk.green(`Using React Native ${rnVersion}.`));

      // 5. Initialize fresh React Native project
      spinner.start(chalk.yellow(`📦 Initializing React Native ${rnVersion} project...`));
      try {
        execSync(
          `npx @react-native-community/cli@latest init ${projectName} --skip-install --version ${rnVersion}`,
          { stdio: "ignore" },
        );
        spinner.succeed(chalk.green("Fresh project created."));
      } catch (error) {
        spinner.fail(chalk.red("Failed to initialize React Native project."));
        console.error(error.message);
        process.exit(1);
      }

      // 6. Layer template files
      spinner.start(chalk.yellow("📂 Layering template files..."));
      process.chdir(projectPath);

      const templatePkg = await fs.readJson(
        path.join(TEMPLATE_DIR, "package.json"),
      );
      const newPkg = await fs.readJson(path.join(projectPath, "package.json"));

      newPkg.dependencies = {
        ...newPkg.dependencies,
        ...templatePkg.dependencies,
      };

      newPkg.devDependencies = {
        ...newPkg.devDependencies,
        ...templatePkg.devDependencies,
      };

      newPkg.scripts = {
        ...newPkg.scripts,
        ...templatePkg.scripts,
      };

      await fs.writeJson(path.join(projectPath, "package.json"), newPkg, {
        spaces: 2,
      });

      const toCopy = [
        "src",
        "generator",
        ".husky",
        "App.tsx",
        "index.js",
        "babel.config.js",
        "react-native.config.js",
        "tsconfig.json",
        "eslint.config.mjs",
        ".prettierrc",
        ".prettierignore",
        "commitlint.config.js",
        "plopfile.js",
        ".gitignore",
        "Gemfile",
        ".yarnrc.yml",
      ];

      for (const item of toCopy) {
        const srcPath = path.join(TEMPLATE_DIR, item);
        const destPath = path.join(projectPath, item);

        if (fs.existsSync(srcPath)) {
          if (fs.lstatSync(srcPath).isDirectory()) {
            await fs.copy(srcPath, destPath);
          } else {
            await fs.copyFile(srcPath, destPath);
          }
        }
      }
      spinner.succeed(chalk.green("Template files layered successfully."));

      // 7. Install dependencies
      spinner.start(chalk.yellow(`📥 Installing dependencies using ${pkgManager}...`));
      try {
        let installCmd;
        if (pkgManager === "yarn") {
          installCmd = "yarn";
        } else if (pkgManager === "bun") {
          installCmd = "bun install";
        } else if (pkgManager === "npm") {
          // React Native ecosystem packages (e.g. react-native-reanimated) routinely
          // lag a release or two behind the latest RN version in their peerDependencies
          // range, which makes npm's strict ERESOLVE check fail on a fresh install.
          installCmd = "npm install --legacy-peer-deps";
        } else {
          installCmd = `${pkgManager} install`;
        }
        execSync(installCmd, { stdio: "ignore" });
        spinner.succeed(chalk.green(`Dependencies installed using ${pkgManager}.`));
      } catch (error) {
        spinner.fail(chalk.red(`Failed to install dependencies with ${pkgManager}.`));
        console.error(error.message);
        process.exit(1);
      }

      // 8. Pod install for iOS
      if (runPodInstall) {
        spinner.start(chalk.yellow("🍎 Running pod install..."));
        try {
          process.chdir(path.join(projectPath, "ios"));
          // Try bundle install if Gemfile exists, otherwise just pod install
          if (fs.existsSync("Gemfile")) {
            execSync("bundle install", { stdio: "ignore" });
            execSync("bundle exec pod install", { stdio: "ignore" });
          } else {
            execSync("pod install", { stdio: "ignore" });
          }
          spinner.succeed(chalk.green("Pods installed successfully."));
        } catch (error) {
          spinner.warn(chalk.yellow("Pod install failed or partially failed. You might need to run it manually."));
        }
        process.chdir(projectPath);
      } else if (process.platform === "darwin") {
        console.log(chalk.yellow("\n⚠️  Skipped `pod install`. Run it manually with `npm run pod` before building for iOS."));
      }

      console.log(
        chalk.green(
          `\n✨ Successfully created ${chalk.bold(projectName)} with React Native ${rnVersion} and your template! ✨`,
        ),
      );
      console.log(chalk.cyan(`\nTo get started:`));
      console.log(chalk.white(`   cd ${projectName}`));
      console.log(chalk.white(`   ${pkgManager === "npm" ? "npm start" : pkgManager + " start"}`));

    } catch (error) {
      spinner.stop();
      console.error(chalk.red("\n❌ An error occurred:"), error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
