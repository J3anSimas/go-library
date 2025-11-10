import { Column, Entity, PrimaryColumn } from "typeorm";
import { UserRole } from "./user-role.entity";

@Entity('users')
export class User {
    @PrimaryColumn()
    id: string;
    @Column()
    email: string;
    @Column()
    password_hash: string;
    @Column()
    is_verified: boolean;
    @Column()
    is_active: boolean;
    @Column()
    role: UserRole;
    @Column()
    created_at: Date;
    @Column()
    updated_at: Date;

}


