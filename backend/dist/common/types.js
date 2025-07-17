"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatus = exports.Competencies = exports.TypeAgile = exports.PrivacyTeam = exports.StatusTeam = exports.StatusIdea = exports.StatusProject = exports.UserCommandStatus = exports.UserAccountStatus = exports.Role = void 0;
var Role;
(function (Role) {
    Role["admin"] = "admin";
    Role["user"] = "user";
    Role["customer"] = "customer";
    Role["expert"] = "expert";
    Role["directorate"] = "directorate";
})(Role || (exports.Role = Role = {}));
var UserAccountStatus;
(function (UserAccountStatus) {
    UserAccountStatus["active"] = "active";
    UserAccountStatus["pending"] = "pending";
    UserAccountStatus["inactive"] = "inactive";
})(UserAccountStatus || (exports.UserAccountStatus = UserAccountStatus = {}));
var UserCommandStatus;
(function (UserCommandStatus) {
    UserCommandStatus["inTeam"] = "In the team";
    UserCommandStatus["expelled"] = "Expelled";
    UserCommandStatus["team_deleted"] = "Team deleted";
})(UserCommandStatus || (exports.UserCommandStatus = UserCommandStatus = {}));
var StatusProject;
(function (StatusProject) {
    StatusProject["draft"] = "Draft";
    StatusProject["searchTeam"] = "Search for team";
    StatusProject["selectionTeam"] = "Team selection";
    StatusProject["teamFound"] = "Team found";
})(StatusProject || (exports.StatusProject = StatusProject = {}));
var StatusIdea;
(function (StatusIdea) {
    StatusIdea["draft"] = "Draft";
    StatusIdea["new"] = "New";
    StatusIdea["approved"] = "Approved";
    StatusIdea["endorsed"] = "Endorsed";
    StatusIdea["published"] = "Published";
    StatusIdea["implemented"] = "Implemented";
    StatusIdea["fordeletion"] = "Fordeletion";
})(StatusIdea || (exports.StatusIdea = StatusIdea = {}));
var StatusTeam;
(function (StatusTeam) {
    StatusTeam["searchProject"] = "\u041F\u043E\u0438\u0441\u043A \u043F\u0440\u043E\u0435\u043A\u0442\u0430";
    StatusTeam["inProgress"] = "\u0412 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435 \u0440\u0430\u0431\u043E\u0442\u044B";
    StatusTeam["joinProject"] = "\u041F\u043E\u0434\u0430\u043D\u0430 \u043D\u0430 \u043F\u0440\u043E\u0435\u043A\u0442";
    StatusTeam["delete"] = "\u041D\u0430 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0438";
})(StatusTeam || (exports.StatusTeam = StatusTeam = {}));
var PrivacyTeam;
(function (PrivacyTeam) {
    PrivacyTeam["open"] = "Open";
    PrivacyTeam["close"] = "Close";
})(PrivacyTeam || (exports.PrivacyTeam = PrivacyTeam = {}));
var TypeAgile;
(function (TypeAgile) {
    TypeAgile["backlog"] = "Backlog";
    TypeAgile["sprintBacklog"] = "Sprint backlog";
    TypeAgile["inProgress"] = "In progress";
    TypeAgile["completed"] = "Completed";
})(TypeAgile || (exports.TypeAgile = TypeAgile = {}));
exports.Competencies = {
    LANGUAGES: [
        'No',
        'PHP',
        'Blueprint',
        'GOLANG',
        'Rust',
        'Dart',
        'R',
        'Java',
        'JavaScript',
        'HTML',
        'CSS',
        'C++',
        'TypeScript',
        'Python',
        'Swift',
        'Kotlin',
        'C#',
        'Ruby',
        'Julia'
    ],
    FRAMEWORKS: [
        'React',
        'Vue',
        'Angular',
        'Spring Boot',
        'Flutter',
        'Django',
        'Flask',
        'Ruby on Rails',
        '.NET',
        'TensorFlow',
        'PyTorch',
        'Keras',
        'Pandas',
        'NumPy',
        'Node.js',
        'Express',
        'Next.js',
        'NestJS',
        'React Native',
        'Xamarin'
    ],
    DATABASES: [
        'PostgreSQL',
        'MySQL',
        'MongoDB',
        'SQLite',
        'Redis',
        'Firebase',
        'Elasticsearch',
        'SQL Server',
        'Oracle',
        'Cassandra'
    ],
    DEVOPS: [
        'Docker',
        'Kubernetes',
        'Git',
        'CI/CD',
        'Jenkins',
        'Ansible',
        'Terraform',
        'Prometheus',
        'Grafana',
        'AWS',
        'Azure',
        'GCP',
        'Nginx',
        'Apache'
    ],
    TESTING: [
        'Jest',
        'Mocha',
        'Cypress',
        'Selenium',
        'JUnit',
        'PyTest',
        'Cucumber',
        'Postman'
    ],
    DESIGN: [
        'Figma',
        'Sketch',
        'Adobe XD',
        'Photoshop',
        'Illustrator',
        'UI/UX Design',
        'Prototyping'
    ],
    MOBILE: [
        'Flutter',
        'React Native',
        'Swift',
        'Kotlin',
        'Ionic'
    ]
};
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["new"] = "new";
    TaskStatus["inProgress"] = "inProgress";
    TaskStatus["done"] = "done";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
//# sourceMappingURL=types.js.map