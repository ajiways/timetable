import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("tokens")
export class TokenEntity extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @OneToOne(() => User)
   @JoinColumn()
   user: User;

   @Column({ nullable: false })
   refreshToken: string;
}
