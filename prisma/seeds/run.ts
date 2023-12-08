import { PrismaClient } from '@prisma/client';

import { seedRoles } from './seed-roles';
import { seedPermissions } from './seed-permissions';
import { seedRolePermissions } from './seed-role-permissions';
import { seedUsers } from './seed-users';
import { seedTaskTypes } from './seed-task-types';
import { seedTaskStatuses } from './seed-task-statuses';
import { seedTasks } from './seed-tasks';
const chalk = require('chalk');

const prisma = new PrismaClient();

async function runSeeds() {
  try {
    await seedRoles();
    await seedPermissions();
    await seedRolePermissions();
    await seedUsers();
    await seedTaskTypes();
    await seedTaskStatuses();
    await seedTasks();
  } catch (error) {
    console.log(chalk.red(error));
  } finally {
    console.log(chalk.green('Successfully seed'));
    prisma.$disconnect();
  }
}

runSeeds();
