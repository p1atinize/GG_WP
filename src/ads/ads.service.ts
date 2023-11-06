import { Injectable } from '@nestjs/common';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import {Ad} from "./entities/ad.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class AdsService {
  constructor(
      @InjectRepository(Ad)
      private repository: Repository<Ad>,
  ) {}

  create(createAdDto: CreateAdDto) {
    return this.repository.save(createAdDto);
  }

  findAll() {
    return this.repository.find({
      relations: {
        category: true,
      }
    });
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: {
        id: id,
      },
      relations: {
        category: true,
      },
    });
  }

  update(id: number, updateAdDto: UpdateAdDto) {
    return this.repository.save({ ...updateAdDto, id });
  }

  async remove(id: number) {
    await this.repository.delete(id);
  }
}
