import { DynamicModule, Module } from '@nestjs/common';
import { EnvConfigService } from './env-config.service';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { join } from 'node:path';

@Module({
	providers: [EnvConfigService],
	exports: [EnvConfigService],
})
export class EnvConfigModule {
	static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
		const env = process.env.NODE_ENV ?? 'development';
		const envFile = `.env.${env}`;
		const envPath = join(__dirname, '..', '..', '..', '..', envFile);

		return {
			module: EnvConfigModule,
			imports: [
				ConfigModule.forRoot({
					...options,
					envFilePath: [envPath],
				}),
			],
			providers: [EnvConfigService],
			exports: [EnvConfigService, ConfigModule],
		};
	}
}
