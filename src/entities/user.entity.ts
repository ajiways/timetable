import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity("users")
export class User extends BaseEntity {
   @PrimaryGeneratedColumn()
   id!: number;

   @Column({
      nullable: false,
      length: 16,
   })
   username!: string;

   @Column({
      nullable: false,
      length: 256,
   })
   password!: string;

   @ManyToMany(() => Role, { eager: true })
   @JoinTable({
      name: "user_roles",
      joinColumn: {
         name: "user_id",
         referencedColumnName: "id",
      },
      inverseJoinColumn: {
         name: "role_id",
         referencedColumnName: "id",
      },
   })
   role: Role;
}
