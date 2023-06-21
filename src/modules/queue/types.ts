import { QueueOptions as BullMQOptions } from 'bullmq';

/**
 * Queue模块配置，配置多个队列
 */
export type QueueConfig = QueueOption[];

/**
 * 单个队列配置
 * 队列建立在哪个redis实例上
 * connection基于redis配置
 * redis属性为服务器的redis实例名称
 */
export type QueueOption = BullMQOptions & { redis?: string };
