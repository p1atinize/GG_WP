import {Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany} from 'typeorm';
import { Ad } from '../../ads/entities/ad.entity';
import {ApiProperty, ApiTags} from '@nestjs/swagger';

@Entity('categories')
export class Category {
    @ApiProperty({
        minimum: 1,
    })
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Ad, (ad) => ad.category)
    ads: Ad[];

    @ApiProperty()
    @Column()
    name: string;
}
