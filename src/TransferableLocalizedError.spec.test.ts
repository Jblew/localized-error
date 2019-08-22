import ChainedError from "typescript-chained-error";

import { expect } from "./_test/test_environment";
import { TransferableLocalizedError } from "./index";

describe("TransferableLocalizedError.make", () => {
    class NewableTransferableError extends ChainedError {
        public code: NewableTransferableErrorCode;
        public details: any;

        public constructor(errCode: NewableTransferableErrorCode, message: string, details: any) {
            super(message);
            this.code = errCode;
            this.details = details;
        }
    }

    type NewableTransferableErrorCode = "code-a" | "code-b";

    const transferableErrorType = "some-type";
    type TransferableErrorType = typeof transferableErrorType;

    let code: NewableTransferableErrorCode;
    let advanced: string;
    let localizedMessage: { EN: string; [x: string]: string };
    let transferableError: TransferableLocalizedError<TransferableErrorType, NewableTransferableErrorCode>;

    beforeEach(() => {
        localizedMessage = {
            EN: `enmsg-${Math.random()}`,
            FR: `frmsg-${Math.random()}`,
        };
        advanced = `advanced-${Math.random()}`;
        code = Math.random() > 0.5 ? "code-a" : "code-b";
        transferableError = TransferableLocalizedError.make(NewableTransferableError, {
            type: transferableErrorType,
            advanced,
            localizedMessage,
            code,
        });
    });

    it("Uses EN lang as default message", () => {
        expect(transferableError.message).to.be.equal(localizedMessage.EN);
    });

    it("Appends all locales to error", () => {
        expect(transferableError.details.localizedMessage).to.deep.equal(localizedMessage);
    });

    it("Appends code to error", () => {
        expect(transferableError.code).to.equal(code);
    });

    it("Appends type to error", () => {
        expect(transferableError.details.type).to.equal(transferableErrorType);
    });

    it("Appends advanced to error", () => {
        expect(transferableError.details.advanced).to.equal(advanced);
    });
});
