import { ErrorThrowLevel } from './errors';
export declare type Maybe<T> = T | null | undefined;
export declare type ServiceIdentifier = string | symbol;
export declare const regex: RegExp;
export declare const getRegexString: () => string;
export declare function isServiceIdentifier(id: any, throws?: boolean): id is ServiceIdentifier;
export interface IQueueConfig {
    errorLevel: ErrorThrowLevel | ErrorThrowLevel[];
}
export declare function isQueueConfig(config: any): config is IQueueConfig;
//# sourceMappingURL=utils.d.ts.map