import { LocalizedError } from "./LocalizedError";

export type AugmentedLocalizedError<TYPE extends string = string> = LocalizedError &
    AugmentedLocalizedError.Augmentation<TYPE>;

export namespace AugmentedLocalizedError {
    export interface Augmentation<TYPE extends string> {
        details: {
            type: TYPE;
            advanced: string;
        };
    }
}
