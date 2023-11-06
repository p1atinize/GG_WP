import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Category } from "../../categories/entities/category.entity";

@Entity('ads')
export class Ad {
    @ApiProperty({
        minimum: 1,
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @ApiProperty()
    @Column()
    description: string;

    @ManyToOne(() => Category, (category) => category.id)
    category: Category;
}
