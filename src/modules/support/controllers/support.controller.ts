import { Controller, Post, Get, Delete, Body, Query, Param } from '@nestjs/common';
import { SupportService } from '../services/support.service';
import { CreateSupportRequestDto, SendMessageDto, MarkMessagesAsReadDto, GetChatListParams } from '../interfaces/support.interface';

@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post('create')
  async createSupportRequest(@Body() dto: CreateSupportRequestDto) {
    return this.supportService.createSupportRequest(dto);
  }

  @Post('message')
  async sendMessage(@Body() dto: SendMessageDto) {
    return this.supportService.sendMessage(dto);
  }

  @Post('mark-read')
  async markMessagesAsRead(@Body() dto: MarkMessagesAsReadDto) {
    return this.supportService.markMessagesAsRead(dto);
  }

  @Get('unread-count/:supportRequest')
  async getUnreadCount(@Param('supportRequest') supportRequest: string) {
    return this.supportService.getUnreadCount(supportRequest);
  }

  @Get('messages/:supportRequest')
  async getMessages(@Param('supportRequest') supportRequest: string) {
    return this.supportService.getMessages(supportRequest);
  }

  @Get('chats')
  async findSupportRequests(@Query() query: GetChatListParams) {
    return this.supportService.findSupportRequests(query);
  }

  @Delete('close/:supportRequest')
  async closeRequest(@Param('supportRequest') supportRequest: string) {
    return this.supportService.closeRequest(supportRequest);
  }
}
