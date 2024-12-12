import chalk from 'chalk';

console.log(chalk.blue('Building components...'));
console.log(chalk.green('✓ Build complete'));
console.log(chalk.yellow('⚠ Warnings...'));
console.log(chalk.red('✗ Build failed'));

console.log(chalk.blue('Type checking...'));
// 运行类型检查
try {
  // 你的构建逻辑
  console.log(chalk.green('✓ Type check passed'));
} catch (error) {
  console.log(chalk.red('✗ Type check failed'));
  process.exit(1);
}
