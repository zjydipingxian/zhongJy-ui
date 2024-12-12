const { defineConfig } = require('cz-git');

module.exports = defineConfig({
  types: [
    { value: 'feat', name: 'feat:     新功能' },
    { value: 'fix', name: 'fix:      修复bug' },
    { value: 'docs', name: 'docs:     文档变更' },
    { value: 'style', name: 'style:    代码格式(不影响代码运行的变动)' },
    { value: 'refactor', name: 'refactor: 重构(既不是增加feature，也不是修复bug)' },
    { value: 'perf', name: 'perf:     性能优化' },
    { value: 'test', name: 'test:     增加测试' },
    { value: 'chore', name: 'chore:    构建过程或辅助工具的变动' },
    { value: 'revert', name: 'revert:   回退' },
    { value: 'build', name: 'build:    打包' },
    { value: 'ci', name: 'ci:       CI配置' },
  ],
  scopes: [
    ['components', '组件相关'],
    ['hooks', 'hook 相关'],
    ['utils', 'utils 相关'],
    ['theme', '样式相关'],
    ['deps', '项目依赖'],
    ['other', '其他修改'],
    ['custom', '以上都不是？我要自定义'],
  ].map(([value, description]) => {
    return {
      value,
      name: `${value.padEnd(30)} (${description})`,
    };
  }),
  messages: {
    type: '确保本次提交遵循 Angular 规范！\n选择你要提交的类型：',
    scope: '\n选择一个 scope（可选）：',
    customScope: '请输入自定义的 scope：',
    subject: '填写简短精炼的变更描述：\n',
    body: '填写更加详细的变更描述（可选）。使用 "|" 换行：\n',
    breaking: '列举非兼容性重大的变更（可选）：\n',
    footer: '列举出所有变更的 ISSUES CLOSED（可选）。 例如: #31, #34：\n',
    confirmCommit: '确认提交？',
  },
  allowBreakingChanges: ['feat', 'fix'],
  subjectLimit: 100,
  breaklineChar: '|',
});
