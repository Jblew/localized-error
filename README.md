# Localized error

[![npm](https://img.shields.io/npm/v/localized-error.svg?style=flat-square)](https://www.npmjs.com/package/localized-error) [![build](https://travis-ci.com/Jblew/localized-error.svg?branch=master)](https://travis-ci.com/Jblew/localized-error) [![Code coverage](https://img.shields.io/codecov/c/gh/jblew/localized-error?style=flat-square)](https://codecov.io/gh/jblew/localized-error) [![License](https://img.shields.io/github/license/jblew/localized-error.svg?style=flat-square)](https://github.com/jblew/localized-error/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)



### Highlights

- Server-side error localization
- Typescript typings
- Errors generated by factory, allow extending custom errors


### Installation

```bash
$ npm install --save localized-error
```

### Usage

Example usage with firebase HttpsError:

```typescript
import * as functions from "firebase-functions";
import { LocalizedError, LocalizedErrorFactory } from "localized-error";

export interface SystemError extends LocalizedError {
    details: {
        advanced: string;
        localizedMessage: {},
    };
}

export namespace SystemError {
    const localizedMessage = {
        EN: "Unexpected system error occured. Please contact the system administrator",
        PL: "Wystąpił błąd systemu. Proszę skontaktować się z administratorem",
    };

    export function make(error: Error): SystemError {
        const advanced = error.message;
        const unknownFirebaseError = new functions.https.HttpsError("unknown", localizedMessage.EN, { advanced });
        return LocalizedErrorFactory.make(unknownFirebaseError, localizedMessage) as SystemError;
    }
}

```








## Informations

### Need help?

- Feel free to email me at <jedrzej@lewandowski.doctor>



### Would like to help?

Warmly welcomed:

- Bug reports via issues
- Enhancement requests via via issues
- Pull requests
- Security reports to jedrzej@lewandowski.doctor

---

Made with ❤️ by [Jędrzej Lewandowski](https://jedrzej.lewandowski.doctor/)

