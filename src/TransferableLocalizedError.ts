import { AugmentedLocalizedError } from "./AugmentedLocalizedError";
import { LocalizedErrorFactory } from "./LocalizedErrorFactory";

export type TransferableLocalizedError<TYPE extends string, CODE_TYPE extends string = string> = Error &
    AugmentedLocalizedError<TYPE> & {
        code: CODE_TYPE;
        details: TransferableLocalizedError.Details<TYPE>;
    };

export namespace TransferableLocalizedError {
    export interface Details<TYPE extends string> {
        type: TYPE;
        advanced: string;
    }

    export interface RemoteErrorAllowUntypedDetails<CODE_TYPE extends string> {
        details: any;
        code: CODE_TYPE;
    }

    export type NewableRemoteError<CODE_TYPE extends string, ERROR_TYPE extends Error> = new (
        code: CODE_TYPE,
        message: string,
        details: any,
    ) => ERROR_TYPE & RemoteErrorAllowUntypedDetails<CODE_TYPE>;

    export function make<TYPE extends string, ERROR_TYPE extends Error = Error, CODE_TYPE extends string = string>(
        errorConstructor: NewableRemoteError<CODE_TYPE, ERROR_TYPE>,
        params: {
            type: TYPE;
            code: CODE_TYPE;
            advanced: string;
            localizedMessage: { EN: string; [x: string]: string };
        },
    ): TransferableLocalizedError<TYPE, CODE_TYPE> & ERROR_TYPE {
        const transferableError = new errorConstructor(params.code, params.localizedMessage.EN, {
            type: params.type,
            advanced: params.advanced,
        });
        const produced = LocalizedErrorFactory.make(transferableError, params.localizedMessage);

        return produced;
    }
}
