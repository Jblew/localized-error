import { ChainedErrorFactory } from "typescript-chained-error";

import { LocalizedError } from "./LocalizedError";

export type AugmentedLocalizedError<TYPE extends string = string> = LocalizedError &
    AugmentedLocalizedError.Augmentation<TYPE>;

export namespace AugmentedLocalizedError {
    export interface Augmentation<TYPE extends string> {
        details: Details<TYPE>;
    }

    export interface Details<TYPE extends string> {
        type: TYPE;
        advanced: string;
    }

    export function make<TYPE extends string, ERROR_TYPE extends Error>(
        error: ERROR_TYPE,
        details: {
            type: TYPE;
            advanced: string;
            localizedMessage: { [x: string]: string };
        },
    ): AugmentedLocalizedError<TYPE> & ERROR_TYPE {
        const localizedError: AugmentedLocalizedError<TYPE> = {
            message: error.message,
            details,
        };
        return ChainedErrorFactory.make(error, undefined, localizedError);
    }
}
