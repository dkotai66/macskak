import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { Macskak } from './macskak.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async Macskak() {
    const [rows] = await db.execute('SELECT * FROM macskak ORDER BY suly ASC');
    return {
      macskak: rows,
    };
  }

  @Get('macskak/new')
  @Render('felvetel')
  newPaintingForm() {
    return {};
  }

  @Post('macskak/new')
  @Redirect()
  async newPainting(@Body() macskak: Macskak) {
    const [result]: any = await db.execute(
      'INSERT INTO macskak (szem_szin, suly) VALUES (?, ?)',
      [macskak.szem_szin, macskak.suly],
    );
    return {
      url: '/',
    };
  }
}
