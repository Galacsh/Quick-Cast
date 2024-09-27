import manageTabs from './manage-tabs'
import manageTabGroups from './manage-tab-groups'
import type { Command } from '@/cast/types'

export default [manageTabs, manageTabGroups] satisfies Command[]
