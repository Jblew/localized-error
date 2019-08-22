import { ChainedErrorFactory } from "typescript-chained-error";

import { LocalizedError } from "./LocalizedError";

export namespace LocalizedErrorFactory {
    export function make<T extends Error>(error: T, localizedMessage: { [x: string]: string }): LocalizedError & T {
        const localizedError: LocalizedError = {
            message: error.message,
            details: {
                localizedMessage,
            },
        };
        return ChainedErrorFactory.make(error, undefined, localizedError);
    }
}
