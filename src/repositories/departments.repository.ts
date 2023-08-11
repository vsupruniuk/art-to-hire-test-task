import { db } from '../db/db';
import { DbTables } from '../types/enums/DbTables';
import { Departments } from '../types/enums/Departments';
import { IDepartment } from '../types/departments/IDepartment';

const getByName = async (name: Departments): Promise<IDepartment> => {
	return db(DbTables.DEPARTMENTS).select().where({ name }).first();
};

export const departmentsRepository = { getByName };
