import manageTabs from './manage-tabs'
import manageTabGroups from './manage-tab-groups'
import createTabGroup from './create-tab-group'
import type { Command } from '@/cast/types'

export default [manageTabs, manageTabGroups, createTabGroup] satisfies Command[]
