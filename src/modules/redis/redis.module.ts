import { ModuleBuilder } from '@/modules/core/decorators';

import { RedisService } from './services';
import { RedisConfig } from './types';

@ModuleBuilder(async (configure) => ({
    global: true,
    providers: [
        {
            provide: RedisService,
            useFactory: async () => {
                const options = await configure.get<RedisConfig>('redis');
                const service = new RedisService(options);
                // 创建redis连接
                await service.createClients();
                return service;
            },
        },
    ],
    exports: [RedisService],
}))
export class RedisModule {}
