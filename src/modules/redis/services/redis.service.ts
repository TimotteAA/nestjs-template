import { Injectable } from '@nestjs/common';

import Redis, { Redis as RedisType } from 'ioredis';
import { isNil } from 'lodash';

import { RedisConfig } from '../types';
// import chalk from "chalk";

/**
 * redis服务，支持创建多个redis连接
 */
@Injectable()
export class RedisService {
    private options: RedisConfig;

    private clients: Map<string, RedisType> = new Map();

    /**
     * 外部传入的redis数组配置
     * @param options
     */
    constructor(options: RedisConfig) {
        this.options = options;
    }

    async createClients() {
        this.options.forEach(async (o) => {
            const client = new Redis(o.connectOptions);
            this.clients.set(o.name, client);
        });
    }

    getClients() {
        return this.clients;
    }

    /**
     * 获取redis链接
     * 不传获取默认链接
     * @param name
     */
    getClient(name?: string) {
        let key = 'default';
        if (!isNil(name)) key = name;
        if (!this.clients.has(key)) {
            throw new Error(`client ${key} does not exist`);
        }
        return this.clients.get(key);
    }
}
