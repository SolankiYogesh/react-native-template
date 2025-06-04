const { execSync } = require('child_process')
const path = require('path')

module.exports = async () => {
  console.log('📦 Installing node modules with --force (-f)...')
  try {
    execSync('npm install -f', {
      stdio: 'inherit',
    })
    console.log('✅ Dependencies installed successfully.')
  } catch (err) {
    const projectName = path.basename(process.cwd())
    console.error('\n❌ Failed to install dependencies automatically.\n')
    console.error('💡 You can try installing them manually with:\n')
    console.error(`  cd ${projectName}`)
    console.error('  npm install -f\n')
    process.exit(1)
  }
}
