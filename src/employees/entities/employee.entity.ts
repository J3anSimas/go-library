import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";

@Entity('employees')
export class Employee {
    @PrimaryColumn()
    id: string
    @Column()
    name: string
    @Column()
    registration_code: string
    @Column()
    photo_url: string
    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User

    @Column()
    created_at: Date
    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'created_by' })
    created_by?: Employee
    @Column()
    updated_at: Date

}
