#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");
const chalk = require("chalk");
const ora = require("ora");
const prompts = require("prompts");

const ROOT_DIR = path.resolve(__dirname, "..");
const TEMPLATE_DIR = path.join(ROOT_DIR, "template");

program
  .name("rn-template-cli")
  .description(
    "CLI to create a new React Native project with the latest version but using this template files.",
  )
  .argument("<project-name>", "Name of the new React Native project")
  .action(async (projectName) => {
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
    const spinner = ora();

    try {
      // 2. Check if folder already exists
      if (fs.existsSync(projectPath)) {
        console.error(
          chalk.red(`\n❌ Error: Folder ${projectName} already exists!`),
        );
        process.exit(1);
      }

      // 3. Initialize fresh React Native project
      spinner.start(chalk.yellow("📦 Initializing latest React Native project..."));
      try {
        execSync(
          `npx @react-native-community/cli@latest init ${projectName} --skip-install --version latest`,
          { stdio: "ignore" },
        );
        spinner.succeed(chalk.green("Fresh project created."));
      } catch (error) {
        spinner.fail(chalk.red("Failed to initialize React Native project."));
        console.error(error.message);
        process.exit(1);
      }

      // 4. Layer template files
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

      // 5. Install dependencies
      spinner.start(chalk.yellow(`📥 Installing dependencies using ${pkgManager}...`));
      try {
        let installCmd;
        if (pkgManager === "yarn") {
          installCmd = "yarn";
        } else if (pkgManager === "bun") {
          installCmd = "bun install";
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

      // 6. Pod install for iOS
      if (process.platform === "darwin") {
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
      }

      console.log(
        chalk.green(
          `\n✨ Successfully created ${chalk.bold(projectName)} with the latest React Native version and your template! ✨`,
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
