import { expect } from "./_test/test_environment";
import { AugmentedLocalizedError } from "./AugmentedLocalizedError";

describe("AugmentedLocalizedError.make", () => {
    const augmentedErrorType = "some-type";
    type AugmentedErrorType = typeof augmentedErrorType;

    let advanced: string;
    let localizedMessage: { EN: string; [x: string]: string };
    let augmentedError: AugmentedLocalizedError<AugmentedErrorType>;

    beforeEach(() => {
        localizedMessage = {
            EN: `enmsg-${Math.random()}`,
            FR: `frmsg-${Math.random()}`,
        };
        advanced = `advanced-${Math.random()}`;
        augmentedError = AugmentedLocalizedError.make(new Error("msg"), {
            type: augmentedErrorType,
            advanced,
            localizedMessage,
        });
    });

    it("Appends all locales to error", () => {
        expect(augmentedError.details.localizedMessage).to.deep.equal(localizedMessage);
    });

    it("Appends type to error", () => {
        expect(augmentedError.details.type).to.equal(augmentedErrorType);
    });

    it("Appends advanced to error", () => {
        expect(augmentedError.details.advanced).to.equal(advanced);
    });
});
