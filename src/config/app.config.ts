import { createAppConfig } from '@/modules/core/helpers/options';

/**
 * 应用配置
 */
export const app = createAppConfig((configure) => ({
    port: configure.env('APP_PORT', 4555),
    host: configure.env('APP_HOST'),
}));
