import { expect } from "./_test/test_environment";
import { LocalizedError, LocalizedErrorFactory } from "./index";

describe("LocalizedErrorFactory", () => {
    it("Copies default message", () => {
        const originalError = new Error("Msg");
        const localizedError: LocalizedError = LocalizedErrorFactory.make(originalError, {});
        expect(localizedError.message).to.be.equal(originalError.message);
    });

    it("Appends all locales to error", () => {
        const originalError = new Error("Msg");
        const localizedMessage = {
            en: "msg_en",
            pl: "msg_pl",
            fr: "msg_fr",
        };
        const localizedError: LocalizedError = LocalizedErrorFactory.make(originalError, localizedMessage);
        expect(localizedError.details.localizedMessage).to.deep.equal(localizedMessage);
    });
});
