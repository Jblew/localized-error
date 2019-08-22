
export interface LocalizedError {
    message: string;
    details: {
        localizedMessage: {
            [x: string]: string;
        },
    };
}
