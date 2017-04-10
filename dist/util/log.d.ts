export declare enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
}
export declare function setLogLevel(level: LogLevel): void;
export declare function debug(...messages: any[]): void;
export declare function info(...messages: any[]): void;
export declare function warn(...messages: any[]): void;
export declare function error(...messages: any[]): void;
