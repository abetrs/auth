# Errors
A list of errors that can be invoked in my users api.
* MongoError [x]
  * Duplicate Username [x]
    * Type: MongoError
    * Code: 11000
    * Error Message: E11000 duplicate key error collection: admin.users index: username_1 dup key: { : \"abhaypradjha\" }
  * Duplicate Email [x]
    * Type: MongoError
    * Code: 11000
    * Error Message: E11000 duplicate key error collection: admin.users index: email_1 dup key: { : \"abhaypradjha@gmail.com\" }
* Validation Error []
  * RegExp Error []
    * Invalid Username []
      * Type: RegExp Error
      * Error Message: User validation failed: username: Path `username` is invalid (itsmine12).
    * Invalid Email []
      * Type: RegExp Error
      * Error Message: User validation failed: email: Path `email` is invalid (sad;lfasdkjlmailcom).
    * Invalid Password []
      * Type: RegExp Error.
      * Error Message: User validation failed: password: Path `password` is invalid (itsmine12).
  * Required Error []
    * Missing field []
      * Type: Required Error.
      * Error Message: User validation failed: email: Path `<whatever>` is required.