import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum roleType {
   ADMIN = "ADMIN",
   USER = "USER",
}

export enum roleDescription {
   ADMINDESC = "Администратор",
   USERDESC = "Пользователь",
}

@Entity("roles")
export class Role extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({
      type: "enum",
      enum: roleType,
      default: roleType.USER,
   })
   type: roleType;

   @Column({
      type: "enum",
      enum: roleDescription,
      default: roleDescription.USERDESC,
   })
   description: roleDescription;
}
