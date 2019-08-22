export interface LocalizedError {
    message: string;
    details: {
        advanced?: string;
        localizedMessage: {
            [x: string]: string;
        };
    };
}
