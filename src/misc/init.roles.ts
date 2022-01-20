import { Role, roleDescription, roleType } from "../entities/role.entity";

export async function initRoles(): Promise<void> {
   const existingRoleAdmin = await Role.findOne({ type: roleType.ADMIN });
   const existingRoleUser = await Role.findOne({ type: roleType.USER });
   if (existingRoleAdmin && existingRoleUser) {
      return;
   }
   const adminRole = Role.create({ type: roleType.ADMIN, description: roleDescription.ADMINDESC });
   const userRole = Role.create({ type: roleType.USER, description: roleDescription.USERDESC });
   await adminRole.save();
   await userRole.save();
}
