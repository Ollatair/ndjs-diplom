import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import EventEmitter from 'eventemitter3'; 
import { Message, SupportRequest, CreateSupportRequestDto, SendMessageDto, MarkMessagesAsReadDto, GetChatListParams, ISupportRequestService, ISupportRequestClientService, ISupportRequestEmployeeService, ID } from '../interfaces/support.interface';

@Injectable()
export class SupportService implements ISupportRequestService, ISupportRequestClientService, ISupportRequestEmployeeService {
  private readonly eventEmitter = new EventEmitter();

  constructor(
    @InjectModel('SupportRequest') private supportRequestModel: Model<SupportRequest>,
  ) {}

  async findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]> {
    const query: any = { isActive: params.isActive };
    if (params.user) query.user = params.user;
    return this.supportRequestModel.find(query).exec();
  }

  async sendMessage(data: SendMessageDto): Promise<Message> {
    const supportRequest = await this.supportRequestModel.findById(data.supportRequest).exec();
    if (!supportRequest) throw new Error('Support request not found');

    const message: Message = {
      _id: new this.supportRequestModel().id, // Используйте новый ObjectId для сообщения
      ...data,
      sentAt: new Date(),
      readAt: null,
    };

    supportRequest.messages.push(message);
    await supportRequest.save();

    this.eventEmitter.emit('message', supportRequest, message);
    return message;
  }

  async getMessages(supportRequest: ID): Promise<Message[]> {
    const request = await this.supportRequestModel.findById(supportRequest).exec();
    if (!request) throw new Error('Support request not found');
    return request.messages;
  }

  async createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest> {
    const supportRequest = new this.supportRequestModel(data);
    return supportRequest.save();
  }

  async markMessagesAsRead(params: MarkMessagesAsReadDto): Promise<void> {
    const supportRequest = await this.supportRequestModel.findById(params.supportRequest).exec();
    if (!supportRequest) throw new Error('Support request not found');

    supportRequest.messages.forEach((message) => {
      if (message.author.toString() !== params.user.toString() && message.sentAt < params.createdBefore) {
        message.readAt = new Date();
      }
    });

    await supportRequest.save();
  }

  async getUnreadCount(supportRequest: ID): Promise<number> {
    const request = await this.supportRequestModel.findById(supportRequest).exec();
    if (!request) throw new Error('Support request not found');

    return request.messages.filter(message => !message.readAt).length;
  }

  async closeRequest(supportRequest: ID): Promise<void> {
    const request = await this.supportRequestModel.findById(supportRequest).exec();
    if (!request) throw new Error('Support request not found');
    request.isActive = false;
    await request.save();
  }

  subscribe(handler: (supportRequest: SupportRequest, message: Message) => void): () => void {
    this.eventEmitter.addListener('message', handler);
    return () => this.eventEmitter.removeListener('message', handler);
  }
}
