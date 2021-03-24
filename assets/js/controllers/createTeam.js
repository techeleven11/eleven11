'use strict';

app.controller('createTeamController', ['$scope', '$rootScope', '$location', 'environment', '$localStorage', '$sessionStorage', 'appDB', 'toastr', '$http', '$timeout', function ($scope, $rootScope, $location, environment, $localStorage, $sessionStorage, appDB, toastr, $http, $timeout) {
    $scope.GamesType = $localStorage.GamesType;
    $scope.env = environment;
    $scope.data.pageSize = 15;
    $scope.data.pageNo = 1;
    $scope.coreLogic = Mobiweb.helpers;
    $rootScope.selectedPlayers = []; // selected players array
    $rootScope.Captain = ''; // selected Captain
    $rootScope.ViceCaptain = ''; // selected Vice Captain
    $rootScope.MatchGUID = getQueryStringValue('MatchGUID'); //Match GUID
    $rootScope.selectedCaptain = ''; //selected captain name
    $rootScope.selectedViceCaptain = ''; //selected vice captain name
    $scope.UserInvitationCode = getQueryStringValue('UserInvitationCode'); //UserInvitationCode
    $scope.totalCredits = parseFloat(100).toFixed(0);
    $scope.leftCredits = parseFloat(100).toFixed(1);

    if ($localStorage.hasOwnProperty('user_details') && $localStorage.isLoggedIn == true) {
        $scope.user_details = $localStorage.user_details;

        /*get url params*/
        if (!getQueryStringValue('MatchGUID')) {
            window.location.href = 'lobby';
        } else {

            /*Function to get mactch center details*/
            $scope.MatchesDetail = {};
            $scope.matchCenterDetails = function () {

                var $data = {};
                $data.MatchGUID = getQueryStringValue('MatchGUID'); //   Match GUID
                $rootScope.MatchGUID = getQueryStringValue('MatchGUID'); //   Match GUID
                $data.Params = 'MatchStartDateTimeUTC,SeriesName,MatchType,MatchNo,MatchStartDateTime,TeamNameLocal,TeamNameVisitor,TeamNameShortLocal,TeamNameShortVisitor,TeamFlagLocal,TeamFlagVisitor,TeamGUIDLocal,TeamGUIDVisitor,MatchLocation,SeriesGUID,Status';
                $data.Status = 'Pending';
                appDB
                    .callPostForm($rootScope.apiPrefix+'sports/getMatch', $data)
                    .then(
                        function successCallback(data) {
                            if ($scope.checkResponseCode(data)) {
                                $scope.MatchesDetail = data.Data;
                                $rootScope.CurrentSelectedMatchDetail = data.Data;
                                // $scope.MatchesDetail.Status='Running';
                                if ($scope.MatchesDetail.Status == 'Pending') {
                                    $scope.teamSize = 11;
                                } else if ($scope.MatchesDetail.Status == 'Running') {
                                    $scope.teamSize = 6;
                                }
                                $scope.teamA = {
                                    'team': $scope.MatchesDetail.TeamGUIDLocal,
                                    'teamName': $scope.MatchesDetail.TeamNameShortLocal,
                                    'count': 0
                                };
                                $scope.teamB = {
                                    'team': $scope.MatchesDetail.TeamGUIDVisitor,
                                    'teamName': $scope.MatchesDetail.TeamNameShortVisitor,
                                    'count': 0
                                };

                            }
                        },
                        function errorCallback(data) {
                            $scope.checkResponseCode(data);
                        });
            }
            /*
             Description : To get user created team list
             */
            $rootScope.userTeams = [];
            $scope.UsersTeamList = function () {
                var $data = {};
                $rootScope.userTeams = []; //user team list array
                $data.SessionKey = $localStorage.user_details.SessionKey; //user session key
                $data.MatchGUID = getQueryStringValue('MatchGUID'); //Match GUID
                $data.Params = 'UserTeamName';
                $data.PageNo = 0;
                $data.UserTeamType = ($scope.MatchesDetail.Status == 'Pending' ? 'Normal' : 'InPlay');
                $data.UserGUID = $localStorage.user_details.UserGUID;
                appDB
                    .callPostForm($rootScope.apiPrefix+'contest/getUserTeams', $data)
                    .then(
                        function successCallback(data) {
                            if ($scope.checkResponseCode(data)) {
                                if (data.Data.hasOwnProperty('Records')) {
                                    $rootScope.userTeams = data.Data;

                                } else {
                                    $rootScope.userTeams = [];

                                }
                                $scope.UserTeamsTotalCount = data.Data.TotalRecords;
                            } else {
                                $scope.data.noRecords = true;
                            }
                        },
                        function errorCallback(data) {
                            $scope.checkResponseCode(data);
                        });

            }

            if($scope.GamesType == 'Cricket'){
                $scope.activeTab = 'wk';
                setTimeout(function () {
                    $scope.teamStructure = {
                        "WicketKeeper": {
                            "min": ($scope.MatchesDetail.Status == 'Pending' ? 1 : 0),
                            "max": ($scope.MatchesDetail.Status == 'Pending' ? 4 : 1),
                            "occupied": 0,
                            "player": [],
                            "icon": "flaticon1-pair-of-gloves"
                        },
                        "Batsman": {
                            "min": ($scope.MatchesDetail.Status == 'Pending' ? 3 : 0),
                            "max": ($scope.MatchesDetail.Status == 'Pending' ? 6 : 6),
                            "occupied": 0,
                            "player": [],
                            "icon": "flaticon1-ball"
                        },
                        "Bowler": {
                            "min": ($scope.MatchesDetail.Status == 'Pending' ? 3 : 0),
                            "max": ($scope.MatchesDetail.Status == 'Pending' ? 6 : 6),
                            "occupied": 0,
                            "player": [],
                            "icon": "flaticon1-tennis-ball"
                        },
                        "AllRounder": {
                            "min": ($scope.MatchesDetail.Status == 'Pending' ? 1 : 0),
                            "max": ($scope.MatchesDetail.Status == 'Pending' ? 4 : 6),
                            "occupied": 0,
                            "player": [],
                            "icon": "flaticon1-ball"
                        },
                        "Extra": {
                            "min": 3,
                            "max": 3,
                            occupied: 0,
                            player: []
                        },
                        "ready": false
                    };

                    $scope.resetTeamStructure = function () {
                        $scope.teamStructure = {
                            "WicketKeeper": {
                                "min": ($scope.MatchesDetail.Status == 'Pending' ? 1 : 0),
                                "max": ($scope.MatchesDetail.Status == 'Pending' ? 4 : 1),
                                "occupied": 0,
                                "player": [],
                                "icon": "flaticon1-pair-of-gloves"
                            },
                            "Batsman": {
                                "min": ($scope.MatchesDetail.Status == 'Pending' ? 3 : 0),
                                "max": ($scope.MatchesDetail.Status == 'Pending' ? 6 : 6),
                                "occupied": 0,
                                "player": [],
                                "icon": "flaticon1-ball"
                            },
                            "Bowler": {
                                "min": ($scope.MatchesDetail.Status == 'Pending' ? 3 : 0),
                                "max": ($scope.MatchesDetail.Status == 'Pending' ? 6 : 6),
                                "occupied": 0,
                                "player": [],
                                "icon": "flaticon1-tennis-ball"
                            },
                            "AllRounder": {
                                "min": ($scope.MatchesDetail.Status == 'Pending' ? 1 : 0),
                                "max": ($scope.MatchesDetail.Status == 'Pending' ? 4 : 6),
                                "occupied": 0,
                                "player": [],
                                "icon": "flaticon1-ball"
                            },
                            "Extra": {
                                "min": 3,
                                "max": 3,
                                occupied: 0,
                                "player": []
                            },
                            "ready": false
                        };
                        $scope.teamCount = 0;
                        $scope.totalCredits = parseFloat(100).toFixed(0);
                        $scope.leftCredits = parseFloat(100).toFixed(1);
                        $scope.players.map(function (player) {
                            player.IsAdded = false;
                            player.PlayerPosition = "Player";
                            player.Disabled = false;
                            player.HighCreditDiabled = false;
                            return player;
                        });
                        $scope.teamA = {
                            'team': $scope.MatchesDetail.TeamGUIDLocal,
                            'teamName': $scope.MatchesDetail.TeamNameShortLocal,
                            'count': 0
                        };
                        $scope.teamB = {
                            'team': $scope.MatchesDetail.TeamGUIDVisitor,
                            'teamName': $scope.MatchesDetail.TeamNameShortVisitor,
                            'count': 0
                        };
                        $rootScope.selectedPlayers = [];
                        $rootScope.Captain = '';
                        $rootScope.ViceCaptain = '';
                        $('.selectpickerCaptain').selectpicker('destroy');
                        $('.selectpickerViceCapatin').selectpicker('destroy');
                    }
                }, 1000);
            }

            if($scope.GamesType == 'Football'){
                $scope.activeTab = 'gk';
                setTimeout(function () {
                    $scope.teamStructure = {
                        "Goalkeeper": {
                            "min": ($scope.MatchesDetail.Status == 'Pending' ? 1 : 0),
                            "max": ($scope.MatchesDetail.Status == 'Pending' ? 1 : 1),
                            "occupied": 0,
                            "player": [],
                            "icon": "flaticon1-pair-of-gloves"
                        },
                        "Defender": {
                            "min": ($scope.MatchesDetail.Status == 'Pending' ? 3 : 0),
                            "max": ($scope.MatchesDetail.Status == 'Pending' ? 5 : 6),
                            "occupied": 0,
                            "player": [],
                            "icon": "flaticon1-ball"
                        },
                        "Midfielder": {
                            "min": ($scope.MatchesDetail.Status == 'Pending' ? 3 : 0),
                            "max": ($scope.MatchesDetail.Status == 'Pending' ? 5 : 6),
                            "occupied": 0,
                            "player": [],
                            "icon": "flaticon1-tennis-ball"
                        },
                        "Striker": {
                            "min": ($scope.MatchesDetail.Status == 'Pending' ? 1 : 0),
                            "max": ($scope.MatchesDetail.Status == 'Pending' ? 3 : 6),
                            "occupied": 0,
                            "player": [],
                            "icon": "flaticon1-ball"
                        },
                        "Extra": {
                            "min": 3,
                            "max": 3,
                            occupied: 0,
                            player: []
                        },
                        "ready": false
                    };

                    $scope.resetTeamStructure = function () {
                        $scope.teamStructure = {
                            "Goalkeeper": {
                                "min": ($scope.MatchesDetail.Status == 'Pending' ? 1 : 0),
                                "max": ($scope.MatchesDetail.Status == 'Pending' ? 1 : 1),
                                "occupied": 0,
                                "player": [],
                                "icon": "flaticon1-pair-of-gloves"
                            },
                            "Defender": {
                                "min": ($scope.MatchesDetail.Status == 'Pending' ? 3 : 0),
                                "max": ($scope.MatchesDetail.Status == 'Pending' ? 5 : 5),
                                "occupied": 0,
                                "player": [],
                                "icon": "flaticon1-ball"
                            },
                            "Midfielder": {
                                "min": ($scope.MatchesDetail.Status == 'Pending' ? 3 : 0),
                                "max": ($scope.MatchesDetail.Status == 'Pending' ? 5 : 6),
                                "occupied": 0,
                                "player": [],
                                "icon": "flaticon1-tennis-ball"
                            },
                            "Striker": {
                                "min": ($scope.MatchesDetail.Status == 'Pending' ? 1 : 0),
                                "max": ($scope.MatchesDetail.Status == 'Pending' ? 3 : 6),
                                "occupied": 0,
                                "player": [],
                                "icon": "flaticon1-ball"
                            },
                            "Extra": {
                                "min": 3,
                                "max": 3,
                                occupied: 0,
                                "player": []
                            },
                            "ready": false
                        };
                        $scope.teamCount = 0;
                        $scope.totalCredits = parseFloat(100).toFixed(0);
                        $scope.leftCredits = parseFloat(100).toFixed(1);
                        $scope.players.map(function (player) {
                            player.IsAdded = false;
                            player.PlayerPosition = "Player";
                            player.Disabled = false;
                            player.HighCreditDiabled = false;
                            return player;
                        });
                        $scope.teamA = {
                            'team': $scope.MatchesDetail.TeamGUIDLocal,
                            'teamName': $scope.MatchesDetail.TeamNameShortLocal,
                            'count': 0
                        };
                        $scope.teamB = {
                            'team': $scope.MatchesDetail.TeamGUIDVisitor,
                            'teamName': $scope.MatchesDetail.TeamNameShortVisitor,
                            'count': 0
                        };
                        $rootScope.selectedPlayers = [];
                        $rootScope.Captain = '';
                        $rootScope.ViceCaptain = '';
                        $('.selectpickerCaptain').selectpicker('destroy');
                        $('.selectpickerViceCapatin').selectpicker('destroy');
                    }
                }, 1000);
            }
            

            $scope.teamCount = 0; //default team count
            delete $rootScope.Captain;
            delete $rootScope.ViceCaptain;
            $scope.gotoTab = function (tab) {
                $scope.activeTab = tab;
            }

            /*
             Description : To get Team players
             */
            $scope.MatchPlayers = function () {
                $scope.players = [];
                $scope.allPlayers = [];
                var $data = {};
                $data.MatchGUID = getQueryStringValue('MatchGUID'); //   Match GUID
                $data.SessionKey = $localStorage.user_details.SessionKey;
                $data.Params = 'PlayerID,PlayerRole,PlayerPic,PlayerCountry,PlayerBornPlace,PlayerBattingStyle,PlayerBowlingStyle,MatchType,MatchNo,MatchDateTime,SeriesName,TeamGUID,PlayerBattingStats,PlayerBowlingStats,IsPlaying,PointsData,PlayerSalary,TeamNameShort,PlayerSalaryCredit,TotalPointCredits,PlayerSelectedPercent,PlayerFieldingStats,PlayerStats';
                $data.OrderBy = 'PlayerSalary';
                $data.Sequence = 'DESC';
                $data.PlayerSalary = 'Yes';
                $data.IsActive = 'Yes';
                appDB
                    .callPostForm($rootScope.apiPrefix+'sports/getPlayers', $data)
                    .then(
                        function successCallback(data) {
                            if ($scope.checkResponseCode(data)) {
                                $scope.allPlayers = data.Data.Records;
                                if (data.Data.TotalRecords > 0) {
                                    $scope.players = $scope.allPlayers;
                                    $scope.addresses = $scope.players.map(function (player) {
                                        player.IsAdded = false;
                                        player.PlayerPosition = "Player";
                                        player.Disabled = false;
                                        player.HighCreditDiabled = false;
                                        player.PointCredits = Number(player.PointCredits);
                                        player.PlayerSalary = Number(player.PlayerSalary);
                                        return player;
                                    });
                                }
                            }
                        },
                        function errorCallback(data) {
                            $scope.checkResponseCode(data);
                        });
            }

            /*
             Description : To add Player 
             */

            $scope.addRemovePlayer = function (PlayerGUID, isAdded, playerDetails) {
                if($scope.GamesType == 'Cricket'){
                    if (!isAdded) {
                        $scope.playerCount = $scope.teamSize - $scope.teamCount;
                        var batCount = 0;
                        var bowlCount = 0;
                        var allCount = 0;
                        var whikCount = 0;
                        var validationCount = 0;
                        var validationPlayer = 'WicketKeeper';
                        if ($scope.teamStructure['WicketKeeper'].occupied < $scope.teamStructure['WicketKeeper'].min && playerDetails.PlayerRole != 'WicketKeeper') {
                            whikCount = $scope.teamStructure['WicketKeeper'].min - $scope.teamStructure['WicketKeeper'].occupied;
                            if (whikCount > validationCount) {
                                validationCount = whikCount;
                                validationPlayer = 'WicketKeeper';
                            }
                        }
                        if ($scope.teamStructure['Batsman'].occupied < $scope.teamStructure['Batsman'].min && playerDetails.PlayerRole != 'Batsman') {
                            batCount = $scope.teamStructure['Batsman'].min - $scope.teamStructure['Batsman'].occupied;
                            if (batCount > validationCount) {
                                validationCount = batCount;
                                validationPlayer = 'Batsman';
                            }
                        }
                        if ($scope.teamStructure['Bowler'].occupied < $scope.teamStructure['Bowler'].min && playerDetails.PlayerRole != 'Bowler') {
                            bowlCount = $scope.teamStructure['Bowler'].min - $scope.teamStructure['Bowler'].occupied;
                            if (bowlCount > validationCount) {
                                validationCount = bowlCount;
                                validationPlayer = 'Bowler';
                            }
                        }
                        if ($scope.teamStructure['AllRounder'].occupied < $scope.teamStructure['AllRounder'].min && playerDetails.PlayerRole != 'AllRounder') {
                            allCount = $scope.teamStructure['AllRounder'].min - $scope.teamStructure['AllRounder'].occupied;
                            if (allCount > validationCount) {
                                validationCount = allCount;
                                validationPlayer = 'AllRounder';
                            }
                        }

                        if ($scope.playerCount <= (batCount + bowlCount + allCount + whikCount)) {
                            if (validationCount > 0) {
                                $scope.errorMessageShow('Please select atleast ' + $scope.teamStructure[validationPlayer].min + ' ' + validationPlayer + '.');
                                return false;
                            }
                        }
                        //to add player from team 
                        for (var i in $scope.players) {
                            if ($scope.players[i].PlayerGUID == PlayerGUID && playerDetails.TeamID == $scope.players[i].TeamID) {
                                if (isAdded == false) {
                                    if ($scope.teamStructure['Batsman'].occupied + $scope.teamStructure['WicketKeeper'].occupied + $scope.teamStructure['AllRounder'].occupied + $scope.teamStructure['Bowler'].occupied == $scope.teamSize) {
                                        $scope.errorMessageShow('You can not add more than ' + $scope.teamSize + ' players');
                                        return false;
                                    } else {
                                        if (playerDetails.PlayerRole == 'WicketKeeper') {
                                            if (parseFloat($scope.leftCredits) < parseFloat(playerDetails.PlayerSalaryCredit)) {
                                                $scope.errorMessageShow('Insufficient credit.');
                                            } else {
                                                if ($scope.teamStructure[playerDetails.PlayerRole].max > $scope.teamStructure[playerDetails.PlayerRole].occupied) {
                                                    if ($scope.teamA.count == 7 && playerDetails.TeamGUID == $scope.teamA.team) {
                                                        $scope.errorMessageShow('You can not select more than 7 players from same team.');
                                                        return false;
                                                    }
                                                    if ($scope.teamB.count == 7 && playerDetails.TeamGUID == $scope.teamB.team) {
                                                        $scope.errorMessageShow('You can not select more than 7 players from same team.');
                                                        return false;
                                                    }
                                                    $scope.teamStructure[playerDetails.PlayerRole].player.push({
                                                        'PlayerGUID': playerDetails.PlayerGUID,
                                                        'PlayerPosition': playerDetails.PlayerPosition,
                                                        'PlayerName': playerDetails.PlayerName,
                                                        'PlayerPic': playerDetails.PlayerPic,
                                                        'PlayerSalary': playerDetails.PlayerSalaryCredit,
                                                        'PlayerID': playerDetails.PlayerID,
                                                        'PlayerShortName': $scope.getPlayerShortName(playerDetails.PlayerName),
                                                        'SelectedPlayerTeam': ($scope.teamA.team == $scope.players[i].TeamGUID) ? 'A' : 'B'
                                                    });
                                                    $scope.teamStructure[playerDetails.PlayerRole].occupied++;
                                                    $scope.players[i].IsAdded = true;
                                                    $rootScope.selectedPlayers.push({
                                                        'PlayerGUID': playerDetails.PlayerGUID,
                                                        'PlayerName': playerDetails.PlayerName,
                                                        'PlayerPic': playerDetails.PlayerPic,
                                                        'PlayerPosition': playerDetails.PlayerPosition,
                                                        'PlayerSalary': Number(playerDetails.PlayerSalaryCredit),
                                                        'PlayerID': playerDetails.PlayerID,
                                                        'PlayerShortName': $scope.getPlayerShortName(playerDetails.PlayerName),
                                                        'TeamNameShort': $scope.players[i].TeamNameShort,
                                                        'IsAdded': true,
                                                        'PositionType': 'WK',
                                                        'PointCredits': Number($scope.players[i].PointCredits),
                                                        'PlayerSalaryCredit': Number($scope.players[i].PlayerSalaryCredit),
                                                        'PlayerRole': 'WicketKeeper',
                                                        'TeamGUID': $scope.players[i].TeamGUID
                                                    });

                                                    $scope.leftCredits = parseFloat($scope.leftCredits).toFixed(2) - parseFloat(playerDetails.PlayerSalaryCredit).toFixed(2);

                                                    if ($scope.teamA.team == $scope.players[i].TeamGUID && $scope.teamA.count < 7) {
                                                        $scope.teamA.count++;
                                                    }
                                                    if ($scope.teamB.team == $scope.players[i].TeamGUID && $scope.teamB.count < 7) {
                                                        $scope.teamB.count++;
                                                    }
                                                } else {
                                                    $scope.errorMessageShow('Max ' + $scope.teamStructure[playerDetails.PlayerRole].max + ' ' + playerDetails.PlayerRole + ' is allowed');
                                                }
                                            }
                                        }
                                        if (playerDetails.PlayerRole == 'Batsman') {
                                            if (parseFloat($scope.leftCredits) < parseFloat(playerDetails.PlayerSalaryCredit)) {
                                                $scope.errorMessageShow('Insufficient credit.');
                                            } else {
                                                if ($scope.teamStructure[playerDetails.PlayerRole].max > $scope.teamStructure[playerDetails.PlayerRole].occupied) {

                                                    if ($scope.teamA.count == 7 && playerDetails.TeamGUID == $scope.teamA.team) {
                                                        $scope.errorMessageShow('You can not select more than 7 players from same team.');
                                                        return false;
                                                    }
                                                    if ($scope.teamB.count == 7 && playerDetails.TeamGUID == $scope.teamB.team) {
                                                        $scope.errorMessageShow('You can not select more than 7 players from same team.');
                                                        return false;
                                                    }

                                                    $scope.teamStructure[playerDetails.PlayerRole].player.push({
                                                        'PlayerGUID': playerDetails.PlayerGUID,
                                                        'PlayerPosition': playerDetails.PlayerPosition,
                                                        'PlayerName': playerDetails.PlayerName,
                                                        'PlayerPic': playerDetails.PlayerPic,
                                                        'PlayerSalary': playerDetails.PlayerSalaryCredit,
                                                        'PlayerId': playerDetails.PlayerID,
                                                        'PlayerShortName': $scope.getPlayerShortName(playerDetails.PlayerName),
                                                        'SelectedPlayerTeam': ($scope.teamA.team == $scope.players[i].TeamGUID) ? 'A' : 'B'
                                                    });
                                                    $scope.teamStructure[playerDetails.PlayerRole].occupied++;
                                                    $scope.players[i].IsAdded = true;
                                                    $rootScope.selectedPlayers.push({
                                                        'PlayerGUID': playerDetails.PlayerGUID,
                                                        'PlayerName': playerDetails.PlayerName,
                                                        'PlayerPic': playerDetails.PlayerPic,
                                                        'PlayerPosition': playerDetails.PlayerPosition,
                                                        'PlayerSalary': Number(playerDetails.PlayerSalaryCredit),
                                                        'PlayerID': playerDetails.PlayerID,
                                                        'PlayerShortName': $scope.getPlayerShortName(playerDetails.PlayerName),
                                                        'TeamNameShort': $scope.players[i].TeamNameShort,
                                                        'IsAdded': true,
                                                        'PositionType': 'BAT',
                                                        'PointCredits': Number($scope.players[i].PointCredits),
                                                        'PlayerSalaryCredit': Number($scope.players[i].PlayerSalaryCredit),
                                                        'PlayerRole': 'Batsman',
                                                        'TeamGUID': $scope.players[i].TeamGUID
                                                    });
                                                    $scope.leftCredits = parseFloat($scope.leftCredits).toFixed(2) - parseFloat(playerDetails.PlayerSalaryCredit).toFixed(2);
                                                    if ($scope.teamA.team == $scope.players[i].TeamGUID && $scope.teamA.count < 7) {
                                                        $scope.teamA.count++;
                                                    }
                                                    if ($scope.teamB.team == $scope.players[i].TeamGUID && $scope.teamB.count < 7) {
                                                        $scope.teamB.count++;
                                                    }
                                                } else {
                                                    $scope.errorMessageShow('Max ' + $scope.teamStructure[playerDetails.PlayerRole].max + ' ' + playerDetails.PlayerRole + ' is allowed.');
                                                }
                                            }
                                        }
                                        if (playerDetails.PlayerRole == 'Bowler') {
                                            if (parseFloat($scope.leftCredits) < parseFloat(playerDetails.PlayerSalaryCredit)) {
                                                $scope.errorMessageShow('Insufficient credit.');
                                            } else {
                                                if ($scope.teamStructure[playerDetails.PlayerRole].max > $scope.teamStructure[playerDetails.PlayerRole].occupied) {
                                                    if ($scope.teamA.count == 7 && playerDetails.TeamGUID == $scope.teamA.team) {
                                                        $scope.errorMessageShow('You can not select more than 7 players from same team.');
                                                        return false;
                                                    }
                                                    if ($scope.teamB.count == 7 && playerDetails.TeamGUID == $scope.teamB.team) {
                                                        $scope.errorMessageShow('You can not select more than 7 players from same team.');
                                                        return false;
                                                    }
                                                    $scope.teamStructure[playerDetails.PlayerRole].player.push({
                                                        'PlayerGUID': playerDetails.PlayerGUID,
                                                        'PlayerPosition': playerDetails.PlayerPosition,
                                                        'PlayerName': playerDetails.PlayerName,
                                                        'PlayerPic': playerDetails.PlayerPic,
                                                        'PlayerSalary': playerDetails.PlayerSalaryCredit,
                                                        'PlayerID': playerDetails.PlayerID,
                                                        'PlayerShortName': $scope.getPlayerShortName(playerDetails.PlayerName),
                                                        'SelectedPlayerTeam': ($scope.teamA.team == $scope.players[i].TeamGUID) ? 'A' : 'B'
                                                    });
                                                    $scope.teamStructure[playerDetails.PlayerRole].occupied++;
                                                    $scope.players[i].IsAdded = true;
                                                    $rootScope.selectedPlayers.push({
                                                        'PlayerGUID': playerDetails.PlayerGUID,
                                                        'PlayerName': playerDetails.PlayerName,
                                                        'PlayerPic': playerDetails.PlayerPic,
                                                        'PlayerPosition': playerDetails.PlayerPosition,
                                                        'PlayerSalary': Number(playerDetails.PlayerSalaryCredit),
                                                        'PlayerID': playerDetails.PlayerID,
                                                        'PlayerShortName': $scope.getPlayerShortName(playerDetails.PlayerName),
                                                        'TeamNameShort': $scope.players[i].TeamNameShort,
                                                        'IsAdded': true,
                                                        'PositionType': 'BOWL',
                                                        'PointCredits': Number($scope.players[i].PointCredits),
                                                        'PlayerSalaryCredit': Number($scope.players[i].PlayerSalaryCredit),
                                                        'PlayerRole': 'Bowler',
                                                        'TeamGUID': $scope.players[i].TeamGUID
                                                    });
                                                    $scope.leftCredits = parseFloat($scope.leftCredits).toFixed(2) - parseFloat(playerDetails.PlayerSalaryCredit).toFixed(2);
                                                    if ($scope.teamA.team == $scope.players[i].TeamGUID && $scope.teamA.count < 7) {
                                                        $scope.teamA.count++;
                                                    }
                                                    if ($scope.teamB.team == $scope.players[i].TeamGUID && $scope.teamB.count < 7) {
                                                        $scope.teamB.count++;
                                                    }
                                                } else {
                                                    $scope.errorMessageShow('Max ' + $scope.teamStructure[playerDetails.PlayerRole].max + ' ' + playerDetails.PlayerRole + ' is allowed.');
                                                }
                                            }
                                        }
                                        if (playerDetails.PlayerRole == 'AllRounder') {
                                            if (parseFloat($scope.leftCredits) < parseFloat(playerDetails.PlayerSalaryCredit)) {
                                                $scope.errorMessageShow('Insufficient credit.');
                                            } else {
                                                if ($scope.teamStructure[playerDetails.PlayerRole].max > $scope.teamStructure[playerDetails.PlayerRole].occupied) {
                                                    if ($scope.teamA.count == 7 && playerDetails.TeamGUID == $scope.teamA.team) {
                                                        $scope.errorMessageShow('You can not select more than 7 players from same team.');
                                                        return false;
                                                    }
                                                    if ($scope.teamB.count == 7 && playerDetails.TeamGUID == $scope.teamB.team) {
                                                        $scope.errorMessageShow('You can not select more than 7 players from same team.');
                                                        return false;
                                                    }
                                                    $scope.teamStructure[playerDetails.PlayerRole].player.push({
                                                        'PlayerGUID': playerDetails.PlayerGUID,
                                                        'PlayerPosition': playerDetails.PlayerPosition,
                                                        'PlayerName': playerDetails.PlayerName,
                                                        'PlayerPic': playerDetails.PlayerPic,
                                                        'PlayerSalary': playerDetails.PlayerSalaryCredit,
                                                        'PlayerID': playerDetails.PlayerID,
                                                        'PlayerShortName': $scope.getPlayerShortName(playerDetails.PlayerName),
                                                        'SelectedPlayerTeam': ($scope.teamA.team == $scope.players[i].TeamGUID) ? 'A' : 'B'
                                                    });
                                                    $scope.teamStructure[playerDetails.PlayerRole].occupied++;
                                                    $scope.players[i].IsAdded = true;
                                                    $rootScope.selectedPlayers.push({
                                                        'PlayerGUID': playerDetails.PlayerGUID,
                                                        'PlayerName': playerDetails.PlayerName,
                                                        'PlayerPic': playerDetails.PlayerPic,
                                                        'PlayerPosition': playerDetails.PlayerPosition,
                                                        'PlayerSalary': Number(playerDetails.PlayerSalaryCredit),
                                                        'PlayerID': playerDetails.PlayerID,
                                                        'TeamNameShort': $scope.players[i].TeamNameShort,
                                                        'IsAdded': true,
                                                        'PositionType': 'ALL',
                                                        'PlayerShortName': $scope.getPlayerShortName(playerDetails.PlayerName),
                                                        'PointCredits': Number($scope.players[i].PointCredits),
                                                        'PlayerSalaryCredit': Number($scope.players[i].PlayerSalaryCredit),
                                                        'PlayerRole': 'AllRounder',
                                                        'TeamGUID': $scope.players[i].TeamGUID
                                                    });
                                                    $scope.leftCredits = parseFloat($scope.leftCredits).toFixed(2) - parseFloat(playerDetails.PlayerSalaryCredit).toFixed(2);
                                                    if ($scope.teamA.team == $scope.players[i].TeamGUID && $scope.teamA.count < 7) {
                                                        $scope.teamA.count++;
                                                    }
                                                    if ($scope.teamB.team == $scope.players[i].TeamGUID && $scope.teamB.count < 7) {
                                                        $scope.teamB.count++;
                                                    }
                                                } else {
                                                    $scope.errorMessageShow('Max ' + $scope.teamStructure[playerDetails.PlayerRole].max + ' ' + playerDetails.PlayerRole + ' is allowed.');
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        $scope.teamCount = $scope.teamStructure['AllRounder'].occupied + $scope.teamStructure['Bowler'].occupied + $scope.teamStructure['Batsman'].occupied + $scope.teamStructure['WicketKeeper'].occupied;

                    } else {
                        //to remove player from team
                        if (playerDetails.PlayerRole == 'WicketKeeper') {
                            if ($scope.teamStructure[playerDetails.PlayerRole].occupied > 0) {
                                for (let j = 0; j < $scope.teamStructure[playerDetails.PlayerRole].occupied; j++) {
                                    if ($scope.teamStructure[playerDetails.PlayerRole].player[j].PlayerGUID == playerDetails.PlayerGUID) {
                                        $scope.teamStructure[playerDetails.PlayerRole].player.splice(j, 1);
                                        if ($scope.teamA.team == playerDetails.TeamGUID && $scope.teamA.count <= 7) {
                                            $scope.teamA.count--;
                                        }
                                        if ($scope.teamB.team == playerDetails.TeamGUID && $scope.teamB.count <= 7) {
                                            $scope.teamB.count--;
                                        }
                                        $scope.leftCredits = (parseFloat($scope.leftCredits) + parseFloat(playerDetails.PlayerSalaryCredit)).toFixed(2);
                                        $scope.teamStructure[playerDetails.PlayerRole].occupied--;
                                        for (var i in $scope.players) {
                                            if ($scope.players[i].PlayerGUID == playerDetails.PlayerGUID) {
                                                $scope.players[i].IsAdded = false;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (playerDetails.PlayerRole == 'Batsman') {
                            if ($scope.teamStructure[playerDetails.PlayerRole].occupied > 0) {
                                for (let j = 0; j < $scope.teamStructure[playerDetails.PlayerRole].occupied; j++) {

                                    if ($scope.teamStructure[playerDetails.PlayerRole].player[j].PlayerGUID == playerDetails.PlayerGUID) {

                                        $scope.teamStructure[playerDetails.PlayerRole].player.splice(j, 1);
                                        if ($scope.teamA.team == playerDetails.TeamGUID && $scope.teamA.count <= 7) {
                                            $scope.teamA.count--;
                                        }
                                        if ($scope.teamB.team == playerDetails.TeamGUID && $scope.teamB.count <= 7) {
                                            $scope.teamB.count--;
                                        }
                                        $scope.leftCredits = (parseFloat($scope.leftCredits) + parseFloat(playerDetails.PlayerSalaryCredit)).toFixed(2);

                                        $scope.teamStructure[playerDetails.PlayerRole].occupied--;

                                        for (var i in $scope.players) {
                                            if ($scope.players[i].PlayerGUID == playerDetails.PlayerGUID) {
                                                $scope.players[i].IsAdded = false;
                                            }
                                        }

                                    }
                                }
                            }

                        }
                        if (playerDetails.PlayerRole == 'Bowler') {
                            if ($scope.teamStructure[playerDetails.PlayerRole].occupied > 0) {
                                for (let j = 0; j < $scope.teamStructure[playerDetails.PlayerRole].occupied; j++) {
                                    if ($scope.teamStructure[playerDetails.PlayerRole].player[j].PlayerGUID == playerDetails.PlayerGUID) {
                                        $scope.teamStructure[playerDetails.PlayerRole].player.splice(j, 1);
                                        if ($scope.teamA.team == playerDetails.TeamGUID && $scope.teamA.count <= 7) {
                                            $scope.teamA.count--;
                                        }
                                        if ($scope.teamB.team == playerDetails.TeamGUID && $scope.teamB.count <= 7) {
                                            $scope.teamB.count--;
                                        }
                                        $scope.leftCredits = (parseFloat($scope.leftCredits) + parseFloat(playerDetails.PlayerSalaryCredit)).toFixed(2);
                                        $scope.teamStructure[playerDetails.PlayerRole].occupied--;
                                        for (var i in $scope.players) {
                                            if ($scope.players[i].PlayerGUID == playerDetails.PlayerGUID) {
                                                $scope.players[i].IsAdded = false;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (playerDetails.PlayerRole == 'AllRounder') {
                            if ($scope.teamStructure[playerDetails.PlayerRole].occupied > 0) {
                                for (let j = 0; j < $scope.teamStructure[playerDetails.PlayerRole].occupied; j++) {
                                    if ($scope.teamStructure[playerDetails.PlayerRole].player[j].PlayerGUID == playerDetails.PlayerGUID) {

                                        $scope.teamStructure[playerDetails.PlayerRole].player.splice(j, 1);
                                        if ($scope.teamA.team == playerDetails.TeamGUID && $scope.teamA.count <= 7) {
                                            $scope.teamA.count--;
                                        }
                                        if ($scope.teamB.team == playerDetails.TeamGUID && $scope.teamB.count <= 7) {
                                            $scope.teamB.count--;
                                        }
                                        $scope.leftCredits = (parseFloat($scope.leftCredits) + parseFloat(playerDetails.PlayerSalaryCredit)).toFixed(2);
                                        $scope.teamStructure[playerDetails.PlayerRole].occupied--;
                                        for (var i in $scope.players) {
                                            if ($scope.players[i].PlayerGUID == playerDetails.PlayerGUID) {
                                                $scope.players[i].IsAdded = false;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        $scope.teamCount = $scope.teamStructure['AllRounder'].occupied + $scope.teamStructure['Bowler'].occupied + $scope.teamStructure['Batsman'].occupied + $scope.teamStructure['WicketKeeper'].occupied;
                        angular.forEach($rootScope.selectedPlayers, function (val, key) {
                            if (val.PlayerGUID == playerDetails.PlayerGUID) {
                                $rootScope.selectedPlayers.splice(key, 1);
                            }
                        });

                    }

                    for (var i in $scope.players) {
                        if ($scope.players[i].PlayerSalary > $scope.leftCredits) {
                            if (!$scope.players[i].IsAdded && !$scope.players[i].Disabled) {
                                $scope.players[i].HighCreditDiabled = true;
                            }
                        } else {
                            if ($scope.players[i].HighCreditDiabled) {
                                $scope.players[i].HighCreditDiabled = false;
                            }
                        }
                    }
                    var remainPlayers = $scope.teamSize - $scope.teamCount;
                    var WK_remain = 0;
                    var BAT_remain = 0;
                    var BOWL_remain = 0;
                    var AR_remain = 0;
                    if ($scope.teamStructure['WicketKeeper'].occupied < $scope.teamStructure['WicketKeeper'].min) {
                        WK_remain = $scope.teamStructure['WicketKeeper'].min - $scope.teamStructure['WicketKeeper'].occupied;
                    }
                    if ($scope.teamStructure['Batsman'].occupied < $scope.teamStructure['Batsman'].min) {
                        BAT_remain = $scope.teamStructure['Batsman'].min - $scope.teamStructure['Batsman'].occupied;
                    }
                    if ($scope.teamStructure['Bowler'].occupied < $scope.teamStructure['Bowler'].min) {
                        BOWL_remain = $scope.teamStructure['Bowler'].min - $scope.teamStructure['Bowler'].occupied;
                    }
                    if ($scope.teamStructure['AllRounder'].occupied < $scope.teamStructure['AllRounder'].min) {
                        AR_remain = $scope.teamStructure['AllRounder'].min - $scope.teamStructure['AllRounder'].occupied;
                    }
                    if (remainPlayers <= (WK_remain + BAT_remain + BOWL_remain + AR_remain)) {
                        if (WK_remain == 0) {
                            $scope.teamStructure['WicketKeeper'].max = $scope.teamStructure['WicketKeeper'].occupied;
                        }
                        if (BAT_remain == 0) {
                            $scope.teamStructure['Batsman'].max = $scope.teamStructure['Batsman'].occupied;
                        }
                        if (BOWL_remain == 0) {
                            $scope.teamStructure['Bowler'].max = $scope.teamStructure['Bowler'].occupied;
                        }
                        if (AR_remain == 0) {
                            $scope.teamStructure['AllRounder'].max = $scope.teamStructure['AllRounder'].occupied;
                        }
                        for (var i in $scope.players) {
                            if ($scope.teamStructure['WicketKeeper'].occupied == $scope.teamStructure['WicketKeeper'].max) {
                                if ($scope.players[i].IsAdded == false && $scope.players[i].PlayerRole == 'WicketKeeper') {
                                    $scope.players[i].Disabled = true;
                                }
                            } else {
                                if ($scope.players[i].IsAdded == false && $scope.players[i].PlayerRole == 'WicketKeeper') {
                                    $scope.players[i].Disabled = false;
                                }
                            }
                            if ($scope.teamStructure['Batsman'].occupied == $scope.teamStructure['Batsman'].max) {
                                if ($scope.players[i].IsAdded == false && $scope.players[i].PlayerRole == 'Batsman') {
                                    $scope.players[i].Disabled = true;
                                }
                            } else {
                                if ($scope.players[i].IsAdded == false && $scope.players[i].PlayerRole == 'Batsman') {
                                    $scope.players[i].Disabled = false;
                                }
                            }
                            if ($scope.teamStructure['Bowler'].occupied == $scope.teamStructure['Bowler'].max) {
                                if ($scope.players[i].IsAdded == false && $scope.players[i].PlayerRole == 'Bowler') {
                                    $scope.players[i].Disabled = true;
                                }
                            } else {
                                if ($scope.players[i].IsAdded == false && $scope.players[i].PlayerRole == 'Bowler') {
                                    $scope.players[i].Disabled = false;
                                }
                            }
                            if ($scope.teamStructure['AllRounder'].occupied == $scope.teamStructure['AllRounder'].max) {
                                if ($scope.players[i].IsAdded == false && $scope.players[i].PlayerRole == 'AllRounder') {
                                    $scope.players[i].Disabled = true;
                                }
                            } else {
                                if ($scope.players[i].IsAdded == false && $scope.players[i].PlayerRole == 'AllRounder') {
                                    $scope.players[i].Disabled = false;
                                }
                            }
                        }
                    } else {
                        $scope.teamStructure['WicketKeeper'].max = 4;
                        $scope.teamStructure['Batsman'].max = 6;
                        $scope.teamStructure['Bowler'].max = 6;
                        $scope.teamStructure['AllRounder'].max = 4;
                        for (var i in $scope.players) {
                            if ($scope.teamStructure['WicketKeeper'].occupied != $scope.teamStructure['WicketKeeper'].max) {
                                if ($scope.players[i].IsAdded == false && $scope.players[i].PlayerRole == 'WicketKeeper') {
                                    $scope.players[i].Disabled = false;
                                }
                            }
                            if ($scope.teamStructure['Batsman'].occupied != $scope.teamStructure['Batsman'].max) {
                                if ($scope.players[i].IsAdded == false && $scope.players[i].PlayerRole == 'Batsman') {
                                    $scope.players[i].Disabled = false;
                                }
                            }
                            if ($scope.teamStructure['Bowler'].occupied != $scope.teamStructure['Bowler'].max) {
                                if ($scope.players[i].IsAdded == false && $scope.players[i].PlayerRole == 'Bowler') {
                                    $scope.players[i].Disabled = false;
                                }
                            }
                            if ($scope.teamStructure['AllRounder'].occupied != $scope.teamStructure['AllRounder'].max) {
                                if ($scope.players[i].IsAdded == false && $scope.players[i].PlayerRole == 'AllRounder') {
                                    $scope.players[i].Disabled = false;
                                }
                            }
                        }
                    }

                    if ($scope.teamCount == 11) {
                        $scope.openSaveteam();
                    }
                }

                if($scope.GamesType == 'Football'){

                    if (!isAdded) {

                        $scope.playerCount = $scope.teamSize - $scope.teamCount;
                        var batCount = 0;
                        var bowlCount = 0;
                        var allCount = 0;
                        var whikCount = 0;
                        var validationCount = 0;
                        var validationPlayer = 'Goalkeeper';
                        if ($scope.teamStructure['Goalkeeper'].occupied < $scope.teamStructure['Goalkeeper'].min && playerDetails.PlayerRole != 'Goalkeeper') {
                            whikCount = $scope.teamStructure['Goalkeeper'].min - $scope.teamStructure['Goalkeeper'].occupied;
                            if (whikCount > validationCount) {
                                validationCount = whikCount;
                                validationPlayer = 'Goalkeeper';
                            }
                        }
                        if ($scope.teamStructure['Defender'].occupied < $scope.teamStructure['Defender'].min && playerDetails.PlayerRole != 'Defender') {
                            batCount = $scope.teamStructure['Defender'].min - $scope.teamStructure['Defender'].occupied;
                            if (batCount > validationCount) {
                                validationCount = batCount;
                                validationPlayer = 'Defender';
                            }
                        }
                        if ($scope.teamStructure['Striker'].occupied < $scope.teamStructure['Striker'].min && playerDetails.PlayerRole != 'Striker') {
                            bowlCount = $scope.teamStructure['Striker'].min - $scope.teamStructure['Striker'].occupied;
                            if (bowlCount > validationCount) {
                                validationCount = bowlCount;
                                validationPlayer = 'Striker';
                            }
                        }
                        if ($scope.teamStructure['Midfielder'].occupied < $scope.teamStructure['Midfielder'].min && playerDetails.PlayerRole != 'Midfielder') {
                            allCount = $scope.teamStructure['Midfielder'].min - $scope.teamStructure['Midfielder'].occupied;
                            if (allCount > validationCount) {
                                validationCount = allCount;
                                validationPlayer = 'Midfielder';
                            }
                        }

                        if ($scope.playerCount <= (batCount + bowlCount + allCount + whikCount)) {
                            if (validationCount > 0) {
                                $scope.errorMessageShow('Please select atleast ' + $scope.teamStructure[validationPlayer].min + ' ' + validationPlayer + '.');
                                return false;
                            }
                        }
                        //to add player from team 
                        for (var i in $scope.players) {
                            if ($scope.players[i].PlayerGUID == PlayerGUID && playerDetails.TeamID == $scope.players[i].TeamID) {
                                if (isAdded == false) {
                                    if ($scope.teamStructure['Defender'].occupied + $scope.teamStructure['Goalkeeper'].occupied + $scope.teamStructure['Midfielder'].occupied + $scope.teamStructure['Striker'].occupied == $scope.teamSize) {
                                        $scope.errorMessageShow('You can not add more than ' + $scope.teamSize + ' players');
                                        return false;
                                    } else {
                                        if (playerDetails.PlayerRole == 'Goalkeeper') {
                                            if (parseFloat($scope.leftCredits) < parseFloat(playerDetails.PlayerSalaryCredit)) {
                                                $scope.errorMessageShow('Insufficient credit.');
                                            } else {
                                                if ($scope.teamStructure[playerDetails.PlayerRole].max > $scope.teamStructure[playerDetails.PlayerRole].occupied) {
                                                    if ($scope.teamA.count == 7 && playerDetails.TeamGUID == $scope.teamA.team) {
                                                        $scope.errorMessageShow('You can not select more than 7 players from same team.');
                                                        return false;
                                                    }
                                                    if ($scope.teamB.count == 7 && playerDetails.TeamGUID == $scope.teamB.team) {
                                                        $scope.errorMessageShow('You can not select more than 7 players from same team.');
                                                        return false;
                                                    }
                                                    $scope.teamStructure[playerDetails.PlayerRole].player.push({
                                                        'PlayerGUID': playerDetails.PlayerGUID,
                                                        'PlayerPosition': playerDetails.PlayerPosition,
                                                        'PlayerName': playerDetails.PlayerName,
                                                        'PlayerPic': playerDetails.PlayerPic,
                                                        'PlayerSalary': playerDetails.PlayerSalaryCredit,
                                                        'PlayerID': playerDetails.PlayerID,
                                                        'PlayerShortName': $scope.getPlayerShortName(playerDetails.PlayerName),
                                                        'SelectedPlayerTeam': ($scope.teamA.team == $scope.players[i].TeamGUID) ? 'A' : 'B'
                                                    });
                                                    $scope.teamStructure[playerDetails.PlayerRole].occupied++;
                                                    $scope.players[i].IsAdded = true;
                                                    $rootScope.selectedPlayers.push({
                                                        'PlayerGUID': playerDetails.PlayerGUID,
                                                        'PlayerName': playerDetails.PlayerName,
                                                        'PlayerPic': playerDetails.PlayerPic,
                                                        'PlayerPosition': playerDetails.PlayerPosition,
                                                        'PlayerSalary': Number(playerDetails.PlayerSalaryCredit),
                                                        'PlayerID': playerDetails.PlayerID,
                                                        'PlayerShortName': $scope.getPlayerShortName(playerDetails.PlayerName),
                                                        'TeamNameShort': $scope.players[i].TeamNameShort,
                                                        'IsAdded': true,
                                                        'PositionType': 'GK',
                                                        'PointCredits': Number($scope.players[i].PointCredits),
                                                        'PlayerSalaryCredit': Number($scope.players[i].PlayerSalaryCredit),
                                                        'PlayerRole': 'Goalkeeper',
                                                        'TeamGUID': $scope.players[i].TeamGUID
                                                    });

                                                    $scope.leftCredits = parseFloat($scope.leftCredits).toFixed(2) - parseFloat(playerDetails.PlayerSalaryCredit).toFixed(2);

                                                    if ($scope.teamA.team == $scope.players[i].TeamGUID && $scope.teamA.count < 7) {
                                                        $scope.teamA.count++;
                                                    }
                                                    if ($scope.teamB.team == $scope.players[i].TeamGUID && $scope.teamB.count < 7) {
                                                        $scope.teamB.count++;
                                                    }
                                                } else {
                                                    $scope.errorMessageShow('Max ' + $scope.teamStructure[playerDetails.PlayerRole].max + ' ' + playerDetails.PlayerRole + ' is allowed');
                                                }
                                            }
                                        }
                                        if (playerDetails.PlayerRole == 'Defender') {
                                            if (parseFloat($scope.leftCredits) < parseFloat(playerDetails.PlayerSalaryCredit)) {
                                                $scope.errorMessageShow('Insufficient credit.');
                                            } else {
                                                if ($scope.teamStructure[playerDetails.PlayerRole].max > $scope.teamStructure[playerDetails.PlayerRole].occupied) {

                                                    if ($scope.teamA.count == 7 && playerDetails.TeamGUID == $scope.teamA.team) {
                                                        $scope.errorMessageShow('You can not select more than 7 players from same team.');
                                                        return false;
                                                    }
                                                    if ($scope.teamB.count == 7 && playerDetails.TeamGUID == $scope.teamB.team) {
                                                        $scope.errorMessageShow('You can not select more than 7 players from same team.');
                                                        return false;
                                                    }

                                                    $scope.teamStructure[playerDetails.PlayerRole].player.push({
                                                        'PlayerGUID': playerDetails.PlayerGUID,
                                                        'PlayerPosition': playerDetails.PlayerPosition,
                                                        'PlayerName': playerDetails.PlayerName,
                                                        'PlayerPic': playerDetails.PlayerPic,
                                                        'PlayerSalary': playerDetails.PlayerSalaryCredit,
                                                        'PlayerId': playerDetails.PlayerID,
                                                        'PlayerShortName': $scope.getPlayerShortName(playerDetails.PlayerName),
                                                        'SelectedPlayerTeam': ($scope.teamA.team == $scope.players[i].TeamGUID) ? 'A' : 'B'
                                                    });
                                                    $scope.teamStructure[playerDetails.PlayerRole].occupied++;
                                                    $scope.players[i].IsAdded = true;
                                                    $rootScope.selectedPlayers.push({
                                                        'PlayerGUID': playerDetails.PlayerGUID,
                                                        'PlayerName': playerDetails.PlayerName,
                                                        'PlayerPic': playerDetails.PlayerPic,
                                                        'PlayerPosition': playerDetails.PlayerPosition,
                                                        'PlayerSalary': Number(playerDetails.PlayerSalaryCredit),
                                                        'PlayerID': playerDetails.PlayerID,
                                                        'PlayerShortName': $scope.getPlayerShortName(playerDetails.PlayerName),
                                                        'TeamNameShort': $scope.players[i].TeamNameShort,
                                                        'IsAdded': true,
                                                        'PositionType': 'DEF',
                                                        'PointCredits': Number($scope.players[i].PointCredits),
                                                        'PlayerSalaryCredit': Number($scope.players[i].PlayerSalaryCredit),
                                                        'PlayerRole': 'Defender',
                                                        'TeamGUID': $scope.players[i].TeamGUID
                                                    });
                                                    $scope.leftCredits = parseFloat($scope.leftCredits).toFixed(2) - parseFloat(playerDetails.PlayerSalaryCredit).toFixed(2);
                                                    if ($scope.teamA.team == $scope.players[i].TeamGUID && $scope.teamA.count < 7) {
                                                        $scope.teamA.count++;
                                                    }
                                                    if ($scope.teamB.team == $scope.players[i].TeamGUID && $scope.teamB.count < 7) {
                                                        $scope.teamB.count++;
                                                    }
                                                } else {
                                                    $scope.errorMessageShow('Max ' + $scope.teamStructure[playerDetails.PlayerRole].max + ' ' + playerDetails.PlayerRole + ' is allowed.');
                                                }
                                            }
                                        }
                                        if (playerDetails.PlayerRole == 'Striker') {
                                            if (parseFloat($scope.leftCredits) < parseFloat(playerDetails.PlayerSalaryCredit)) {
                                                $scope.errorMessageShow('Insufficient credit.');
                                            } else {
                                                if ($scope.teamStructure[playerDetails.PlayerRole].max > $scope.teamStructure[playerDetails.PlayerRole].occupied) {
                                                    if ($scope.teamA.count == 7 && playerDetails.TeamGUID == $scope.teamA.team) {
                                                        $scope.errorMessageShow('You can not select more than 7 players from same team.');
                                                        return false;
                                                    }
                                                    if ($scope.teamB.count == 7 && playerDetails.TeamGUID == $scope.teamB.team) {
                                                        $scope.errorMessageShow('You can not select more than 7 players from same team.');
                                                        return false;
                                                    }
                                                    $scope.teamStructure[playerDetails.PlayerRole].player.push({
                                                        'PlayerGUID': playerDetails.PlayerGUID,
                                                        'PlayerPosition': playerDetails.PlayerPosition,
                                                        'PlayerName': playerDetails.PlayerName,
                                                        'PlayerPic': playerDetails.PlayerPic,
                                                        'PlayerSalary': playerDetails.PlayerSalaryCredit,
                                                        'PlayerID': playerDetails.PlayerID,
                                                        'PlayerShortName': $scope.getPlayerShortName(playerDetails.PlayerName),
                                                        'SelectedPlayerTeam': ($scope.teamA.team == $scope.players[i].TeamGUID) ? 'A' : 'B'
                                                    });
                                                    $scope.teamStructure[playerDetails.PlayerRole].occupied++;
                                                    $scope.players[i].IsAdded = true;
                                                    $rootScope.selectedPlayers.push({
                                                        'PlayerGUID': playerDetails.PlayerGUID,
                                                        'PlayerName': playerDetails.PlayerName,
                                                        'PlayerPic': playerDetails.PlayerPic,
                                                        'PlayerPosition': playerDetails.PlayerPosition,
                                                        'PlayerSalary': Number(playerDetails.PlayerSalaryCredit),
                                                        'PlayerID': playerDetails.PlayerID,
                                                        'PlayerShortName': $scope.getPlayerShortName(playerDetails.PlayerName),
                                                        'TeamNameShort': $scope.players[i].TeamNameShort,
                                                        'IsAdded': true,
                                                        'PositionType': 'STR',
                                                        'PointCredits': Number($scope.players[i].PointCredits),
                                                        'PlayerSalaryCredit': Number($scope.players[i].PlayerSalaryCredit),
                                                        'PlayerRole': 'Striker',
                                                        'TeamGUID': $scope.players[i].TeamGUID
                                                    });
                                                    $scope.leftCredits = parseFloat($scope.leftCredits).toFixed(2) - parseFloat(playerDetails.PlayerSalaryCredit).toFixed(2);
                                                    if ($scope.teamA.team == $scope.players[i].TeamGUID && $scope.teamA.count < 7) {
                                                        $scope.teamA.count++;
                                                    }
                                                    if ($scope.teamB.team == $scope.players[i].TeamGUID && $scope.teamB.count < 7) {
                                                        $scope.teamB.count++;
                                                    }
                                                } else {
                                                    $scope.errorMessageShow('Max ' + $scope.teamStructure[playerDetails.PlayerRole].max + ' ' + playerDetails.PlayerRole + ' is allowed.');
                                                }
                                            }
                                        }
                                        if (playerDetails.PlayerRole == 'Midfielder') {
                                            if (parseFloat($scope.leftCredits) < parseFloat(playerDetails.PlayerSalaryCredit)) {
                                                $scope.errorMessageShow('Insufficient credit.');
                                            } else {
                                                if ($scope.teamStructure[playerDetails.PlayerRole].max > $scope.teamStructure[playerDetails.PlayerRole].occupied) {
                                                    if ($scope.teamA.count == 7 && playerDetails.TeamGUID == $scope.teamA.team) {
                                                        $scope.errorMessageShow('You can not select more than 7 players from same team.');
                                                        return false;
                                                    }
                                                    if ($scope.teamB.count == 7 && playerDetails.TeamGUID == $scope.teamB.team) {
                                                        $scope.errorMessageShow('You can not select more than 7 players from same team.');
                                                        return false;
                                                    }
                                                    $scope.teamStructure[playerDetails.PlayerRole].player.push({
                                                        'PlayerGUID': playerDetails.PlayerGUID,
                                                        'PlayerPosition': playerDetails.PlayerPosition,
                                                        'PlayerName': playerDetails.PlayerName,
                                                        'PlayerPic': playerDetails.PlayerPic,
                                                        'PlayerSalary': playerDetails.PlayerSalaryCredit,
                                                        'PlayerID': playerDetails.PlayerID,
                                                        'PlayerShortName': $scope.getPlayerShortName(playerDetails.PlayerName),
                                                        'SelectedPlayerTeam': ($scope.teamA.team == $scope.players[i].TeamGUID) ? 'A' : 'B'
                                                    });
                                                    $scope.teamStructure[playerDetails.PlayerRole].occupied++;
                                                    $scope.players[i].IsAdded = true;
                                                    $rootScope.selectedPlayers.push({
                                                        'PlayerGUID': playerDetails.PlayerGUID,
                                                        'PlayerName': playerDetails.PlayerName,
                                                        'PlayerPic': playerDetails.PlayerPic,
                                                        'PlayerPosition': playerDetails.PlayerPosition,
                                                        'PlayerSalary': Number(playerDetails.PlayerSalaryCredit),
                                                        'PlayerID': playerDetails.PlayerID,
                                                        'TeamNameShort': $scope.players[i].TeamNameShort,
                                                        'IsAdded': true,
                                                        'PositionType': 'MID',
                                                        'PlayerShortName': $scope.getPlayerShortName(playerDetails.PlayerName),
                                                        'PointCredits': Number($scope.players[i].PointCredits),
                                                        'PlayerSalaryCredit': Number($scope.players[i].PlayerSalaryCredit),
                                                        'PlayerRole': 'Midfielder',
                                                        'TeamGUID': $scope.players[i].TeamGUID
                                                    });
                                                    $scope.leftCredits = parseFloat($scope.leftCredits).toFixed(2) - parseFloat(playerDetails.PlayerSalaryCredit).toFixed(2);
                                                    if ($scope.teamA.team == $scope.players[i].TeamGUID && $scope.teamA.count < 7) {
                                                        $scope.teamA.count++;
                                                    }
                                                    if ($scope.teamB.team == $scope.players[i].TeamGUID && $scope.teamB.count < 7) {
                                                        $scope.teamB.count++;
                                                    }
                                                } else {
                                                    $scope.errorMessageShow('Max ' + $scope.teamStructure[playerDetails.PlayerRole].max + ' ' + playerDetails.PlayerRole + ' is allowed.');
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        $scope.teamCount = $scope.teamStructure['Midfielder'].occupied + $scope.teamStructure['Striker'].occupied + $scope.teamStructure['Defender'].occupied + $scope.teamStructure['Goalkeeper'].occupied;

                    } else {
                        //to remove player from team
                        if (playerDetails.PlayerRole == 'Goalkeeper') {
                            if ($scope.teamStructure[playerDetails.PlayerRole].occupied > 0) {
                                for (let j = 0; j < $scope.teamStructure[playerDetails.PlayerRole].occupied; j++) {
                                    if ($scope.teamStructure[playerDetails.PlayerRole].player[j].PlayerGUID == playerDetails.PlayerGUID) {
                                        $scope.teamStructure[playerDetails.PlayerRole].player.splice(j, 1);
                                        if ($scope.teamA.team == playerDetails.TeamGUID && $scope.teamA.count <= 7) {
                                            $scope.teamA.count--;
                                        }
                                        if ($scope.teamB.team == playerDetails.TeamGUID && $scope.teamB.count <= 7) {
                                            $scope.teamB.count--;
                                        }
                                        $scope.leftCredits = (parseFloat($scope.leftCredits) + parseFloat(playerDetails.PlayerSalaryCredit)).toFixed(2);
                                        $scope.teamStructure[playerDetails.PlayerRole].occupied--;
                                        for (var i in $scope.players) {
                                            if ($scope.players[i].PlayerGUID == playerDetails.PlayerGUID) {
                                                $scope.players[i].IsAdded = false;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (playerDetails.PlayerRole == 'Defender') {
                            if ($scope.teamStructure[playerDetails.PlayerRole].occupied > 0) {
                                for (let j = 0; j < $scope.teamStructure[playerDetails.PlayerRole].occupied; j++) {

                                    if ($scope.teamStructure[playerDetails.PlayerRole].player[j].PlayerGUID == playerDetails.PlayerGUID) {

                                        $scope.teamStructure[playerDetails.PlayerRole].player.splice(j, 1);
                                        if ($scope.teamA.team == playerDetails.TeamGUID && $scope.teamA.count <= 7) {
                                            $scope.teamA.count--;
                                        }
                                        if ($scope.teamB.team == playerDetails.TeamGUID && $scope.teamB.count <= 7) {
                                            $scope.teamB.count--;
                                        }
                                        $scope.leftCredits = (parseFloat($scope.leftCredits) + parseFloat(playerDetails.PlayerSalaryCredit)).toFixed(2);

                                        $scope.teamStructure[playerDetails.PlayerRole].occupied--;

                                        for (var i in $scope.players) {
                                            if ($scope.players[i].PlayerGUID == playerDetails.PlayerGUID) {
                                                $scope.players[i].IsAdded = false;
                                            }
                                        }

                                    }
                                }
                            }

                        }
                        if (playerDetails.PlayerRole == 'Striker') {
                            if ($scope.teamStructure[playerDetails.PlayerRole].occupied > 0) {
                                for (let j = 0; j < $scope.teamStructure[playerDetails.PlayerRole].occupied; j++) {
                                    if ($scope.teamStructure[playerDetails.PlayerRole].player[j].PlayerGUID == playerDetails.PlayerGUID) {
                                        $scope.teamStructure[playerDetails.PlayerRole].player.splice(j, 1);
                                        if ($scope.teamA.team == playerDetails.TeamGUID && $scope.teamA.count <= 7) {
                                            $scope.teamA.count--;
                                        }
                                        if ($scope.teamB.team == playerDetails.TeamGUID && $scope.teamB.count <= 7) {
                                            $scope.teamB.count--;
                                        }
                                        $scope.leftCredits = (parseFloat($scope.leftCredits) + parseFloat(playerDetails.PlayerSalaryCredit)).toFixed(2);
                                        $scope.teamStructure[playerDetails.PlayerRole].occupied--;
                                        for (var i in $scope.players) {
                                            if ($scope.players[i].PlayerGUID == playerDetails.PlayerGUID) {
                                                $scope.players[i].IsAdded = false;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (playerDetails.PlayerRole == 'Midfielder') {
                            if ($scope.teamStructure[playerDetails.PlayerRole].occupied > 0) {
                                for (let j = 0; j < $scope.teamStructure[playerDetails.PlayerRole].occupied; j++) {
                                    if ($scope.teamStructure[playerDetails.PlayerRole].player[j].PlayerGUID == playerDetails.PlayerGUID) {

                                        $scope.teamStructure[playerDetails.PlayerRole].player.splice(j, 1);
                                        if ($scope.teamA.team == playerDetails.TeamGUID && $scope.teamA.count <= 7) {
                                            $scope.teamA.count--;
                                        }
                                        if ($scope.teamB.team == playerDetails.TeamGUID && $scope.teamB.count <= 7) {
                                            $scope.teamB.count--;
                                        }
                                        $scope.leftCredits = (parseFloat($scope.leftCredits) + parseFloat(playerDetails.PlayerSalaryCredit)).toFixed(2);
                                        $scope.teamStructure[playerDetails.PlayerRole].occupied--;
                                        for (var i in $scope.players) {
                                            if ($scope.players[i].PlayerGUID == playerDetails.PlayerGUID) {
                                                $scope.players[i].IsAdded = false;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        $scope.teamCount = $scope.teamStructure['Midfielder'].occupied + $scope.teamStructure['Striker'].occupied + $scope.teamStructure['Defender'].occupied + $scope.teamStructure['Goalkeeper'].occupied;
                        angular.forEach($rootScope.selectedPlayers, function (val, key) {
                            if (val.PlayerGUID == playerDetails.PlayerGUID) {
                                $rootScope.selectedPlayers.splice(key, 1);
                            }
                        });

                    }

                    for (var i in $scope.players) {
                        if ($scope.players[i].PlayerSalary > $scope.leftCredits) {
                            if (!$scope.players[i].IsAdded && !$scope.players[i].Disabled) {
                                $scope.players[i].HighCreditDiabled = true;
                            }
                        } else {
                            if ($scope.players[i].HighCreditDiabled) {
                                $scope.players[i].HighCreditDiabled = false;
                            }
                        }
                    }
                    var remainPlayers = $scope.teamSize - $scope.teamCount;
                    var WK_remain = 0;
                    var BAT_remain = 0;
                    var BOWL_remain = 0;
                    var AR_remain = 0;

                    if ($scope.teamStructure['Goalkeeper'].occupied < $scope.teamStructure['Goalkeeper'].min) {
                        WK_remain = $scope.teamStructure['Goalkeeper'].min - $scope.teamStructure['Goalkeeper'].occupied;
                    }
                    if ($scope.teamStructure['Defender'].occupied < $scope.teamStructure['Defender'].min) {
                        BAT_remain = $scope.teamStructure['Defender'].min - $scope.teamStructure['Defender'].occupied;
                    }
                    if ($scope.teamStructure['Striker'].occupied < $scope.teamStructure['Striker'].min) {
                        BOWL_remain = $scope.teamStructure['Striker'].min - $scope.teamStructure['Striker'].occupied;
                    }
                    if ($scope.teamStructure['Midfielder'].occupied < $scope.teamStructure['Midfielder'].min) {
                        AR_remain = $scope.teamStructure['Midfielder'].min - $scope.teamStructure['Midfielder'].occupied;
                    }
                   
                    if ((remainPlayers <= (WK_remain + BAT_remain + BOWL_remain + AR_remain))) {
                        if (WK_remain == 0) {
                            $scope.teamStructure['Goalkeeper'].max = $scope.teamStructure['Goalkeeper'].occupied;
                        }
                        if (BAT_remain == 0) {
                            $scope.teamStructure['Defender'].max = $scope.teamStructure['Defender'].occupied;
                        }
                        if (BOWL_remain == 0) {
                            $scope.teamStructure['Striker'].max = $scope.teamStructure['Striker'].occupied;
                        }
                        if (AR_remain == 0) {
                            $scope.teamStructure['Midfielder'].max = $scope.teamStructure['Midfielder'].occupied;
                        }
                        for (var i in $scope.players) {
                            if ($scope.teamStructure['Goalkeeper'].occupied == $scope.teamStructure['Goalkeeper'].max) {
                                if ($scope.players[i].IsAdded == false && $scope.players[i].PlayerRole == 'Goalkeeper') {
                                    $scope.players[i].Disabled = true;
                                }
                            } else {
                                if ($scope.players[i].IsAdded == false && $scope.players[i].PlayerRole == 'Goalkeeper') {
                                    $scope.players[i].Disabled = false;
                                }
                            }
                            if ($scope.teamStructure['Defender'].occupied == $scope.teamStructure['Defender'].max) {
                                if ($scope.players[i].IsAdded == false && $scope.players[i].PlayerRole == 'Defender') {
                                    $scope.players[i].Disabled = true;
                                }
                            } else {
                                if ($scope.players[i].IsAdded == false && $scope.players[i].PlayerRole == 'Defender') {
                                    $scope.players[i].Disabled = false;
                                }
                            }

                            if ($scope.teamStructure['Striker'].occupied == $scope.teamStructure['Striker'].max) {
                                if ($scope.players[i].IsAdded == false && $scope.players[i].PlayerRole == 'Striker') {

                                    $scope.players[i].Disabled = true;
                                }
                            } else {
                                if ($scope.players[i].IsAdded == false && $scope.players[i].PlayerRole == 'Striker') {
                                    $scope.players[i].Disabled = false;
                                }
                            }
                            if ($scope.teamStructure['Midfielder'].occupied == $scope.teamStructure['Midfielder'].max) {
                                if ($scope.players[i].IsAdded == false && $scope.players[i].PlayerRole == 'Midfielder') {

                                    $scope.players[i].Disabled = true;
                                }
                            } else {
                                if ($scope.players[i].IsAdded == false && $scope.players[i].PlayerRole == 'Midfielder') {
                                    $scope.players[i].Disabled = false;
                                }
                            }
                        }
                    } else {
                        $scope.teamStructure['Goalkeeper'].max = 1;
                        $scope.teamStructure['Defender'].max = 5;
                        $scope.teamStructure['Striker'].max = 3;
                        $scope.teamStructure['Midfielder'].max = 5;
                        for (var i in $scope.players) {
                            if ($scope.teamStructure['Goalkeeper'].occupied != $scope.teamStructure['Goalkeeper'].max) {
                                if ($scope.players[i].IsAdded == false && $scope.players[i].PlayerRole == 'Goalkeeper') {
                                    $scope.players[i].Disabled = false;
                                }
                            }
                            if ($scope.teamStructure['Defender'].occupied != $scope.teamStructure['Defender'].max) {
                                if ($scope.players[i].IsAdded == false && $scope.players[i].PlayerRole == 'Defender') {
                                    $scope.players[i].Disabled = false;
                                }
                            }
                            if ($scope.teamStructure['Striker'].occupied != $scope.teamStructure['Striker'].max) {
                                if ($scope.players[i].IsAdded == false && $scope.players[i].PlayerRole == 'Striker') {
                                    $scope.players[i].Disabled = false;
                                }
                            }
                            if ($scope.teamStructure['Midfielder'].occupied != $scope.teamStructure['Midfielder'].max) {
                                if ($scope.players[i].IsAdded == false && $scope.players[i].PlayerRole == 'Midfielder') {
                                    $scope.players[i].Disabled = false;
                                }
                            }
                        }
                    }

                    if ($scope.teamCount == 11) {
                        $scope.openSaveteam();
                    }
                }
            }



        }

        /*
         Description : To Select captain
         */

        $rootScope.selectCaptain = function (PlayerGUID) {
            for (var i = 0; i < $rootScope.selectedPlayers.length; i++) {
                if ($rootScope.selectedPlayers[i].PlayerGUID == PlayerGUID) {

                    if ($rootScope.selectedPlayers[i].PlayerPosition != 'Captain') {
                        $rootScope.selectedPlayers[i].PlayerPosition = 'Captain';
                        $rootScope.selectedCaptain = $rootScope.selectedPlayers[i].PlayerName;

                        $rootScope.Captain = $rootScope.selectedPlayers[i].PlayerGUID;
                    }
                } else {
                    if ($rootScope.selectedPlayers[i].PlayerPosition != 'ViceCaptain') {
                        $rootScope.selectedPlayers[i].PlayerPosition = 'Player';
                    }
                }
            }
            $rootScope.selectedPlayers = $rootScope.selectedPlayers;
            $timeout(function () {
                $(".selectpickerCaptain").val($rootScope.Captain);
                $(".selectpickerCaptain").selectpicker('render');
                $(".selectpickerViceCapatin").selectpicker('render');
                $(".selectpickerCaptain").selectpicker('refresh');
                $(".selectpickerViceCapatin").selectpicker('refresh');
            }, 500);
        }

        /*
         Description : To Select vice captain
         */

        $rootScope.selectViceCaptain = function (PlayerGUID) {

            for (var i = 0; i < $rootScope.selectedPlayers.length; i++) {
                if ($rootScope.selectedPlayers[i].PlayerGUID == PlayerGUID) {

                    if ($rootScope.selectedPlayers[i].PlayerPosition != 'ViceCaptain') {
                        $rootScope.selectedPlayers[i].PlayerPosition = 'ViceCaptain';
                        $rootScope.selectedViceCaptain = $rootScope.selectedPlayers[i].PlayerName;

                        $rootScope.ViceCaptain = $rootScope.selectedPlayers[i].PlayerGUID;
                    }
                } else {
                    if ($rootScope.selectedPlayers[i].PlayerPosition != 'Captain') {
                        $rootScope.selectedPlayers[i].PlayerPosition = 'Player';
                    }
                }
            }
            $timeout(function () {

                $(".selectpickerViceCapatin").val($rootScope.ViceCaptain);
                $(".selectpickerCaptain").val($rootScope.Captain);
                $(".selectpickerCaptain").selectpicker('render');
                $(".selectpickerViceCapatin").selectpicker('render');
                $(".selectpickerCaptain").selectpicker('refresh');
                $(".selectpickerViceCapatin").selectpicker('refresh');
            }, 500);
        }

        /*
         Description : To join Contest after Team Create
         */

        $rootScope.JoinContest = function () {
            var $data = {};
            $data.ContestGUID = $rootScope.ContestGUID;
            $data.MatchGUID = $rootScope.MatchGUID;
            $data.UserTeamGUID = $rootScope.UserTeamGUID;
            $data.SessionKey = $localStorage.user_details.SessionKey;
            if ($scope.UserInvitationCode) {
                $data.UserInvitationCode = $scope.UserInvitationCode;
            }
            appDB
                .callPostForm($rootScope.apiPrefix+'contest/join', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.closePopup('joinLeaguePopup');
                            $scope.successMessageShow(data.Message);

                            setTimeout(function () {
                                window.location.href = base_url + 'lobby';
                                $localStorage.MatchGUID = getQueryStringValue('MatchGUID');
                            }, 1000);

                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });


        }

        $scope.openSaveteam = function () {
            if($scope.GamesType == 'Cricket'){
                if ($scope.teamStructure['WicketKeeper'].occupied < $scope.teamStructure['WicketKeeper'].min || $scope.teamStructure['Batsman'].occupied < $scope.teamStructure['Batsman'].min || $scope.teamStructure['Bowler'].occupied < $scope.teamStructure['Bowler'].min || $scope.teamStructure['AllRounder'].occupied < $scope.teamStructure['AllRounder'].min) {
                    $scope.errorMessageShow('Selection criteria not fullfilled please change your team according to selection crieria.');
                    return false;

                } else {
                    $timeout(function () {
                        $(".selectpickerViceCapatin").val($rootScope.ViceCaptain);
                        $(".selectpickerCaptain").val($rootScope.Captain);
                        $(".selectpickerCaptain").selectpicker('render');
                        $(".selectpickerViceCapatin").selectpicker('render');
                        $(".selectpickerCaptain").selectpicker('refresh');
                        $(".selectpickerViceCapatin").selectpicker('refresh');
                    }, 500);
                    $scope.openPopup('selectCaptainViceCaptainModal');

                }
            }

            if($scope.GamesType == 'Football'){
                if ($scope.teamStructure['Goalkeeper'].occupied < $scope.teamStructure['Goalkeeper'].min || $scope.teamStructure['Defender'].occupied < $scope.teamStructure['Defender'].min || $scope.teamStructure['Striker'].occupied < $scope.teamStructure['Striker'].min || $scope.teamStructure['Midfielder'].occupied < $scope.teamStructure['Midfielder'].min) {
                    $scope.errorMessageShow('Selection criteria not fullfilled please change your team according to selection crieria.');
                    return false;

                } else {
                    $timeout(function () {
                        $(".selectpickerViceCapatin").val($rootScope.ViceCaptain);
                        $(".selectpickerCaptain").val($rootScope.Captain);
                        $(".selectpickerCaptain").selectpicker('render');
                        $(".selectpickerViceCapatin").selectpicker('render');
                        $(".selectpickerCaptain").selectpicker('refresh');
                        $(".selectpickerViceCapatin").selectpicker('refresh');
                    }, 500);
                    $scope.openPopup('selectCaptainViceCaptainModal');

                }
            }
        }

        /*
         Description : To save user team 
         */
        $rootScope.SaveTeam = function () {
            var $data = {};

            $data.MatchGUID = getQueryStringValue('MatchGUID'); //   Match GUID
            $data.SessionKey = $localStorage.user_details.SessionKey; //   User session key
            $data.UserTeamPlayers = $rootScope.selectedPlayers; //   User selected players
            $data.UserTeamName = $scope.UserTeamName; //   User team name
            $data.UserTeamType = 'Normal'; //   User team name


            if (getQueryStringValue('Operation') && getQueryStringValue('Operation') == 'edit') {
                var $url = $rootScope.apiPrefix+'contest/editUserTeam';
                $data.UserTeamGUID = getQueryStringValue('UserTeamGUID');
            } else {
                var $url = $rootScope.apiPrefix+'contest/addUserTeam';
            }
            $http.post($scope.env.api_url + $url, $.param($data), contentType).then(function (response) {
                var response = response.data;
                if ($scope.checkResponseCode(response)) {

                    /* success case */
                    if (getQueryStringValue('League')) {
                        $rootScope.ContestGUID = getQueryStringValue('League');
                        $rootScope.MatchGUID = getQueryStringValue('MatchGUID');
                        $rootScope.UserTeamGUID = response.Data.UserTeamGUID;

                        $scope.closePopup('selectCaptainViceCaptainModal');
                        $scope.UsersTeamList();

                        $scope.successMessageShow(response.Message);
                        setTimeout(function () {
                            $scope.openPopup('joinLeaguePopup');
                            $('.selectpickerJoinLeague').selectpicker('render');
                        }, 1000);
                    } else {
                        $scope.successMessageShow(response.Message);
                        setTimeout(function () {
                            $localStorage.MatchGUID = getQueryStringValue('MatchGUID');
                            window.location.href = 'lobby';
                        }, 200);
                    }
                }
            });
        }

        /*Edit Team*/
        $scope.editTeam = function () {
            var $data = {};
            $data.MatchGUID = getQueryStringValue('MatchGUID');
            $data.UserTeamGUID = getQueryStringValue('UserTeamGUID');
            $data.SessionKey = $localStorage.user_details.SessionKey;
            $data.UserTeamType = 'Normal';
            $data.Params = "TeamNameShort,PlayerID,PlayerSalaryCredit,PlayerGUID,PlayerName,PlayerCountry,PlayerPosition,PlayerRole,UserTeamPlayers,PlayerSalary,TeamGUID";
            $data.UserGUID = $localStorage.user_details.UserGUID;
            appDB
                .callPostForm($rootScope.apiPrefix+'contest/getUserTeams', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.resetTeamStructure();
                            $rootScope.selectedPlayers = [];

                            angular.forEach(data.Data.UserTeamPlayers, function (value, key) {
                                value.PlayerSalaryCredit = value.PlayerSalary;
                                $scope.addRemovePlayer(value.PlayerGUID, false, value);
                                if (value.PlayerPosition == 'Captain') {
                                    $rootScope.Captain = value.PlayerGUID;
                                    $rootScope.selectCaptain(value.PlayerGUID);
                                }
                                if (value.PlayerPosition == 'ViceCaptain') {

                                    $rootScope.ViceCaptain = value.PlayerGUID;
                                    $rootScope.selectViceCaptain(value.PlayerGUID);
                                }
                            });
                            $rootScope.UserTeamName = data.Data.UserTeamName;
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });

        }

        /*Copy Team Team*/
        $scope.copyTeam = function () {
            var $data = {};
            $data.MatchGUID = getQueryStringValue('MatchGUID');
            $data.UserTeamGUID = getQueryStringValue('UserTeamGUID');
            $data.SessionKey = $localStorage.user_details.SessionKey;
            $data.UserTeamType = 'Normal';
            $data.Params = "PlayerID,PlayerSalaryCredit,PlayerGUID,PlayerName,PlayerCountry,PlayerPosition,PlayerRole,UserTeamPlayers,PlayerSalary,TeamGUID";
            $data.UserGUID = $localStorage.user_details.UserGUID;
            appDB
                .callPostForm($rootScope.apiPrefix+'contest/getUserTeams', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $scope.resetTeamStructure();
                            $rootScope.selectedPlayers = [];


                            angular.forEach(data.Data.UserTeamPlayers, function (value, key) {
                                value.PlayerSalaryCredit = value.PlayerSalary;
                                $scope.addRemovePlayer(value.PlayerGUID, false, value);
                            });

                            //$scope.openPopup('selectCaptainViceCaptainModal');

                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });

        }
        if (getQueryStringValue('UserTeamGUID') && getQueryStringValue('Operation') != 'edit') {
            setTimeout(function () {
                $scope.copyTeam();
            }, 2500);
        }
        if (getQueryStringValue('Operation') == 'edit') {
            setTimeout(function () {
                $scope.editTeam();
            }, 2500);
        }

        /*player info*/
        $scope.playersInfo = function (playerDetails) {
            document.getElementById("playersInfoModal").style.width = "100%";
            var details = {};
            for (var i in $scope.players) {
                if ($scope.players[i].PlayerGUID == playerDetails.PlayerGUID) {
                    details = $scope.players[i];
                }
            }
            $rootScope.playerDetails = details;
            $rootScope.PlayerBattingStats = [];
            $rootScope.PlayerBowlingStats = [];
            $rootScope.PlayerFieldingStats = [];
            angular.forEach(details.PlayerBattingStats, function (value, key) {
                value.type = key;
                $rootScope.PlayerBattingStats.push(value);
            });
            angular.forEach(details.PlayerBowlingStats, function (value, key) {
                value.type = key;
                $rootScope.PlayerBowlingStats.push(value);
            });
            angular.forEach(details.PlayerFieldingStats, function (value, key) {
                value.type = key;
                $rootScope.PlayerFieldingStats.push(value);
            });
            $rootScope.Batting = false;
            $rootScope.Bowlering = false;
            $rootScope.Fielding = false;
            if($rootScope.playerDetails.PlayerRole == 'Batsman'){
                $rootScope.Batting = true;
                $rootScope.Fielding = true;
            }else if($rootScope.playerDetails.PlayerRole == 'Bowler'){
                $rootScope.Bowlering = true;
                $rootScope.Fielding = true;
            }else if($rootScope.playerDetails.PlayerRole == 'AllRounder'){
                $rootScope.Batting = true;
                $rootScope.Bowlering = true;
                $rootScope.Fielding = true;
            }else{
                $rootScope.Batting = true;
                $rootScope.Fielding = true;
            }
        }
        $rootScope.closeNav = function () {
            document.getElementById("playersInfoModal").style.width = "0";
        }

        $rootScope.activePlayerTab = 'play';
        $rootScope.playerDetailsTab = function (tab) {
            $rootScope.activePlayerTab = tab;
        }
        $scope.propertyName = 'PlayerSalary';
        $scope.reverse = true;
        $scope.sortBy = function (propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        };
        $scope.SelectedPlayerPropertyName = 'PlayerSalary';
        $scope.SelectedPlayerReverse = true;
        $scope.sortWithBy = function (propertyName) {
            $scope.SelectedPlayerReverse = ($scope.SelectedPlayerPropertyName === propertyName) ? !$scope.SelectedPlayerReverse : false;
            $scope.SelectedPlayerPropertyName = propertyName;
        }


        $scope.activeView = 'PitchView';
        $scope.changeView = function (View) {
            $scope.activeView = View;
        }

        $scope.activeStepperCheck = function (number) {
            if ($rootScope.selectedPlayers.length == number || $rootScope.selectedPlayers.length > number) {
                return true;
            } else {
                return false;
            }

        }

        /**
         * Get contest info
         */

        $scope.getContest = function () {
            $rootScope.Contest = [];
            var $data = {};
            $data.MatchGUID = getQueryStringValue('MatchGUID'); // Selected MatchGUID
            $data.ContestGUID = getQueryStringValue('League'); // Selected ContestGUID
            $data.SessionKey = $localStorage.user_details.SessionKey; // User SessionKey
            $data.Params = 'MatchStartDateTimeUTC,Privacy,IsPaid,WinningAmount,ContestSize,EntryFee,NoOfWinners,EntryType,IsJoined,Status,ContestFormat,ContestType,CustomizeWinning,TotalJoined,UserInvitationCode,SeriesName,MatchType,MatchNo,MatchStartDateTime,TeamNameLocal,TeamNameVisitor,TeamNameShortLocal,TeamNameShortVisitor,TeamFlagLocal,TeamFlagVisitor,MatchLocation,SeriesGUID,Status,MatchScoreDetails,ShowJoinedContest';

            appDB
                .callPostForm($rootScope.apiPrefix+'contest/getContest', $data)
                .then(
                    function successCallback(data) {
                        if ($scope.checkResponseCode(data)) {
                            $rootScope.Contest = data.Data;
                        }
                    },
                    function errorCallback(data) {
                        $scope.checkResponseCode(data);
                    });
        }

        $scope.Back = function () {
            window.location.href = document.referrer;
        }

    } else {
        window.location.href = base_url;
    }
}]);