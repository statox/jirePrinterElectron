/*
 * Service to interact with localStorage
 */

angular.module('app').service("storageService", function() {
    var storageService = {};

    /*
     * Try to get the configuration from local storage and set
     * the dictionary to empty properties if we don't find anything
     */
    storageService.getJiraConfig = function() {
        var jiraConfig = angular.fromJson(localStorage.getItem("jiraConfig"));
        var gotJiraConfig = !(typeof jiraConfig === "undefined" || jiraConfig === null)

        if (!gotJiraConfig) {
            jiraConfig = {
                username: "",
                password: "",
                host: "",
                port: ""
            };
        }

        return {success: gotJiraConfig, data: jiraConfig};
    };

    /*
     * Takes the current configuration as parameter
     * If no configuration is recorded in local storage or the current configuration
     * differs from the one in storage, record the new one.
     */
    storageService.setJiraConfig = function(jiraConfigFromInput) {
        var jiraConfigFromStorage = angular.fromJson(localStorage.getItem("jiraConfig"));
        var gotJiraConfig = !(typeof jiraConfigFromStorage === "undefined" || jiraConfigFromStorage === null)
        var configHasChanged = false;

        if (gotJiraConfig) {
            configHasChanged = jiraConfigFromInput.host !== jiraConfigFromStorage.host
                                || jiraConfigFromInput.port !== jiraConfigFromStorage.port
                                || jiraConfigFromInput.username !== jiraConfigFromStorage.username
                                || jiraConfigFromInput.password !== jiraConfigFromStorage.password;
        }

        if (!gotJiraConfig || configHasChanged) {
            localStorage.setItem("jiraConfig", angular.toJson(jiraConfigFromInput));
        }
    };

    return storageService;
});
