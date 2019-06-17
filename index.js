const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
var fs = require('fs');



const init = () => {
    console.log(
        chalk.red(
            "Angulajs Generator"
        )
    );
}

const askQuestions = () => {
    const questions = [
        {
            type: "list",
            name: "TYPE",
            message: "What you want to generate",
            choices: ["Project", "Module", "Service", "Directive", "Controller"],
        },
    ];
    return inquirer.prompt(questions);
};

const askProjectName = () => {
    const questions = [
        {
            name: "FILENAME",
            type: "input",
            message: "What is the name of Project:"
        }
    ];
    return inquirer.prompt(questions);
};

const createFolder = (filename) => {
    const filePath = shell.mkdir('-p', `${filename}`);
    return filePath;
};


const createFiles = (root, filename = 'app', extension = 'js') => {
    root && shell.cd(root);
    const filePath = `${process.cwd()}/${filename}.${extension}`;
    shell.touch(filePath);
    return filePath
}


const writeTofile = (filePath, Data) => {
    fs.appendFile(`${filePath}`, Data, function (err) {
        if (err) throw err;

    });
}


const success = (filepath) => {
    console.log(
        chalk.white.bgGreen.bold(`Project Generated`)
    );
};
const run = async () => {
    // show script introduction
    init();
    // initial qustion
    const answers = await askQuestions();
    console.log(answers)
    const { TYPE } = answers;
    switch (TYPE) {
        case 'Project':
            projectConfig();
            break;
        case 'Module':

            break;
        case 'Service':

            break;
        case 'Directive':

            break;
        case 'Controller':

            break;

        default:
            console.log("Please Select a type first")
            break;
    }

    // create the file
    // const filePath = createFolder(FILENAME);

    // createFiles(FILENAME);
    // show success message

    // success(filePath);
};

run();


const projectConfig = async () => {
    const answers = await askProjectName();
    const { FILENAME } = answers;
    // project folder
    await createFolder(FILENAME);
    // app.js
    let path = await createFiles(FILENAME);
    await writeTofile(path, appContents());
    // route config.js
    path = await createFiles(false, 'routeConfig');
    await writeTofile(path, routeContent())
    // home - folder
    await createFolder('HOME');
    //   home controller
    path = await createFiles('HOME', 'HomeController');
    await writeTofile(path, controllerDetaisl())
    //   home directive
    path = await createFiles(null,'homedetails');
    await writeTofile(path, directiveData())

    //   home service
    path = await createFiles(null, 'homedetailsService');
    await writeTofile(path, serviceData())
    //   home service
    path = await createFiles(null, 'homedetails', 'html');

}

const appContents = () => {
    return `(function() {
    'use strict';
    angular
        .module('moduleName', ['ngRoute'])
        .constant('CONSTANTS', {
            EVENTS: {
                // events goes here
            },
            TEMPLATE_URL: {
                //templates goes here
            },
            API: {
                //apis goes here
            },
        })

}())`
}

const routeContent = () => {
    return
    `(function() {
    'use strict';

    angular
        .module('') //module name here
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', 'CONSTANTS', '$httpProvider'];

    function config($routeProvider, CONSTANTS, $httpProvider) {

        $routeProvider
            .when('/HOME', {
                cache: true,
                controller: '', //controller name here
                templateUrl: CONSTANTS.TEMPLATE_URL, //finish ypur template name 

            })
            .otherwise('/HOME');

        var interceptor = ['$q', '$window', '$rootScope', '$timeout', '$location', function($q, $window, $rootScope, $timeout, $location) {
            return {
                request: function($config) {
                    return $config || $q.when($config);
                },
                response: function($config) {

                },
            };
        }];

        $httpProvider.interceptors.push(interceptor);

    }

    run.$inject = ['$rootScope', '$location', '$window', '$routeParams', '$timeout', 'Patient.Service.authService', 'CONSTANTS', '$cookies'];

    function run($rootScope, $location, $window, $routeParams, $timeout, authService, CONSTANTS, $cookies) {
        //run logic goes here

    }

})();`
}

const controllerDetaisl = () => {
    return `(function () {
    'use strict';

    angular.module("modulename").controller('controllername', controller);

    controller.$inject = ['CONSTANTS', '$scope', '$rootScope'];

    function controller(CONSTANTS, $scope, $rootScope) {
       
    };

})();`
}

const directiveData = () => {
    return `(function() {

    'use strict';

    angular
        .module("modulename")//fill correct module name
        .directive("directivename", directive);// change directive name


    directive.$inject = ['CONSTANTS', '$rootScope'];


    function directive(CONSTANTS, $rootScope) {
        var directive = {
            link: link,
            restrict: 'EA',
            templateUrl: CONSTANTS.TEMPLATE_URL // fill template path
        };

        return directive;

        function link(scope, element) {


           
           //contents goes here


        }
    }
}())`
}

const serviceData = () => {
    return `(function() {
    'use strict';

    angular
        .module('modulename') //fill modulename
        .factory('servicename', Service); //fill servicename

    Service.$inject = ['$http', '$rootScope'];

    function Service($http, $rootScope) {

        var service = {
            //declare functions here eg:=>
            // login:login
        };

        return service;


        // functions goes here eg=>
        // function login(data, cb) {

        // }

    }

})();`
}