"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatus = exports.UserAccountStatus = exports.Role = void 0;
var Role;
(function (Role) {
    Role["admin"] = "admin";
    Role["user"] = "user";
})(Role || (exports.Role = Role = {}));
var UserAccountStatus;
(function (UserAccountStatus) {
    UserAccountStatus["active"] = "active";
    UserAccountStatus["pending"] = "pending";
    UserAccountStatus["inactive"] = "inactive";
})(UserAccountStatus || (exports.UserAccountStatus = UserAccountStatus = {}));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["new"] = "new";
    TaskStatus["inProgress"] = "inProgress";
    TaskStatus["done"] = "done";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
//# sourceMappingURL=types.js.map