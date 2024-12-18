#!/usr/bin/env node
import { program } from 'commander'
import { create, remove } from './commands'
program.command('create').description('请创建一个新组件').action(create)
program.command('delete').description('请删除一个组件').action(remove)

program.parse()
