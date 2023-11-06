import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdsService } from './ads.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import {ApiBearerAuth, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Ad} from "./entities/ad.entity";
import {AuthGuard} from "@nestjs/passport";

@Controller('ads')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Ads')
@ApiResponse({ status: 401, description: 'Неавторизован' })
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Объявление успешно добавлено',
    type: Ad,
  })
  create(@Body() createAdDto: CreateAdDto) {
    return this.adsService.create(createAdDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Успех',
    type: Ad,
    isArray: true,
  })
  findAll() {
    return this.adsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Успех',
    type: Ad,
  })
  findOne(@Param('id') id: string) {
    return this.adsService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Объявление успешно обновлено',
    type: Ad,
  })
  update(@Param('id') id: string, @Body() updateAdDto: UpdateAdDto) {
    return this.adsService.update(+id, updateAdDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Объявление успешно удалено',
  })
  remove(@Param('id') id: string) {
    return this.adsService.remove(+id);
  }
}
