<?php 
    include('header.php');
?>

<!--Main container sec start-->
<div class="mainContainer" ng-controller="pointSystemController" ng-init="pointSystem()" ng-cloak >
    <div class="mt-5">
        <div class="top-header-title pt-4">
            <h1>Fantasy Cricket Point System</h1>
        </div>

        <div class="pointSystem">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                    <!-- tabular point system starts -->
                        <div class="transictionOption">
                            <ul class="nav nav-tabs">
                                <li class="nav-item">
                                    <a class="nav-link {{activeTab=='T20' ? 'active' : '' }}" data-toggle="tab" href="javascript:void(0)" ng-click="ChangeTab('T20'); ">T20</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link {{activeTab=='T10' ? 'active' : '' }}" data-toggle="tab" href="javascript:void(0)" ng-click="ChangeTab('T10'); ">T10</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link {{activeTab=='ODI' ? 'active' : '' }}" data-toggle="tab" href="javascript:void(0)" ng-click="ChangeTab('ODI'); ">ODI</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link {{activeTab=='TEST' ? 'active' : '' }}" data-toggle="tab" href="javascript:void(0)" ng-click="ChangeTab('TEST');">TEST</a>
                                </li>
                            </ul>

                            <div class="tab-content">
                                <div id="T20" class="tab-pane {{activeTab=='T20' ? 'active' : '' }}">
                                    <div class="">
                                        <h4>Batting</h4>
                                        <div class="pointHead">
                                            <ul>
                                                <li>Type Of points</li>
                                                <li>T20</li>
                                            </ul>
                                        </div>
                                        <div class="pointBody">
                                            <ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Batting' && point.PointsT20!='0.0' && (point.PointsScoringField == 'Runs' || point.PointsTypeGUID == 'Four' || point.PointsTypeGUID == 'Six')" >
                                                <li>{{point.PointsTypeDescprition}}</li>
                                                <li>{{point.PointsT20 | number }}</li>
                                            </ul>
                                        </div>

                                        <h4> Strike Rate </h4>
                                        <div class="pointHead">
                                            <ul>
                                                <li>Type Of points</li>
                                                <li>T20</li>
                                            </ul>
                                        </div>
                                        <div class="pointBody">
                                            <ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Batting' && point.PointsT20!='0.0' && point.PointsScoringField == 'StrikeRate' || point.PointsTypeGUID == 'MinimumBallsScoreStrikeRate'" >
                                                <li>{{point.PointsTypeDescprition}}</li>
                                                <li>{{point.PointsT20 | number }}</li>
                                            </ul>
                                        </div>

                                        <h4>Bowling</h4>
                                        <div class="pointHead">
                                            <ul>
                                                <li>Type Of points</li>
                                                <li>T20</li>
                                            </ul>
                                        </div>
                                        <div class="pointBody">
                                            <ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Bowling' && point.PointsT20!='0.0' && (point.PointsScoringField == 'Wickets') || (point.PointsScoringField == 'DotBall' || point.PointsScoringField == 'NoBall' || point.PointsScoringField == 'WideBall') && point.PointsT20!='0.0'" >
                                                <li>{{point.PointsTypeDescprition}}</li>
                                                <li>{{point.PointsT20 | number }}</li>
                                            </ul>    
                                        </div>

                                        <h4> Economy </h4>
                                        <div class="pointHead">
                                            <ul>
                                                <li>Type Of points</li>
                                                <li>T20</li>
                                            </ul>
                                        </div>
                                        <div class="pointBody">
                                            <ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Bowling' && point.PointsT20!='0.0' && point.PointsScoringField == 'Economy' || point.PointsTypeGUID == 'MinimumOverEconomyRate'" >
                                                <li>{{point.PointsTypeDescprition}}</li>
                                                <li>{{point.PointsT20 | number }}</li>
                                            </ul>    
                                        </div>


                                        <h4>Fielding</h4>
                                        <div class="pointHead">
                                            <ul>
                                                <li>Type Of points</li>
                                                <li>T20</li>
                                            </ul>
                                        </div>
                                        <div class="pointBody">
                                            <ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Fielding' && point.PointsT20!='0.0'" >
                                                <li>{{point.PointsTypeDescprition}}</li>
                                                <li>{{point.PointsT20 | number }}</li>
                                            </ul>    
                                        </div>
                                    </div>

                                    <div class="mt-3">
                                        <h4 class="text-left"> Note : </h4>

                                        <ul class="list_point">
                                            <li> The cricketer you choose to be your Fantasy <strong> Cricket Team’s Captain </strong> will receive <strong> {{CaptainPoint |number}} </strong> times the points </li>

                                            <li> The <strong> Vice-Captain </strong> will receive <strong> {{ViceCaptainPoint |number}} </strong> times the points for his performance. </li>

                                            <li> Starting bonus point <strong> {{Playing11Point | number}} 
                                              </strong> are assigned to any player on the basis of announcement of  playing <strong> 11. </strong></li>
                                        </ul>
                                    </div>
                                </div>

                                <div id="T10" class="tab-pane {{activeTab=='T10' ? 'active' : '' }}">
                                    <div class="">
                                        <h4>Batting</h4>
                                        <div class="pointHead">
                                            <ul>
                                                <li>Type Of points</li>
                                                <li>T10</li>
                                            </ul>
                                        </div>
                                        <div class="pointBody">
                                            <ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Batting' && point.PointsT10!='0.0' && (point.PointsScoringField == 'Runs' || point.PointsTypeGUID == 'Four' || point.PointsTypeGUID == 'Six')" >
                                                <li>{{point.PointsTypeDescprition}}</li>
                                                <li>{{point.PointsT10 | number }}</li>
                                            </ul>
                                        </div>

                                        <h4> Strike Rate </h4>
                                        <div class="pointHead">
                                            <ul>
                                                <li>Type Of points</li>
                                                <li>T10</li>
                                            </ul>
                                        </div>
                                        <div class="pointBody">
                                            <ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Batting' && point.PointsT10!='0.0' && point.PointsScoringField == 'StrikeRate' || point.PointsTypeGUID == 'MinimumBallsScoreStrikeRate'" >
                                                <li>{{point.PointsTypeDescprition}}</li>
                                                <li>{{point.PointsT10 | number }}</li>
                                            </ul>
                                        </div>

                                        <h4>Bowling</h4>
                                        <div class="pointHead">
                                            <ul>
                                                <li>Type Of points</li>
                                                <li>T10</li>
                                            </ul>
                                        </div>
                                        <div class="pointBody">
                                            <ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Bowling' && point.PointsT10!='0.0' && (point.PointsScoringField == 'Wickets') || (point.PointsScoringField == 'DotBall' || point.PointsScoringField == 'NoBall' || point.PointsScoringField == 'WideBall') && point.PointsT10!='0.0'" >
                                                <li>{{point.PointsTypeDescprition}}</li>
                                                <li>{{point.PointsT10 | number }}</li>
                                            </ul>    
                                        </div>

                                        <h4> Economy </h4>
                                        <div class="pointHead">
                                            <ul>
                                                <li>Type Of points</li>
                                                <li>T10</li>
                                            </ul>
                                        </div>
                                        <div class="pointBody">
                                            <ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Bowling' && point.PointsT10!='0.0' && point.PointsScoringField == 'Economy' || point.PointsTypeGUID == 'MinimumOverEconomyRate'" >
                                                <li>{{point.PointsTypeDescprition}}</li>
                                                <li>{{point.PointsT10 | number }}</li>
                                            </ul>    
                                        </div>


                                        <h4>Fielding</h4>
                                        <div class="pointHead">
                                            <ul>
                                                <li>Type Of points</li>
                                                <li>T10</li>
                                            </ul>
                                        </div>
                                        <div class="pointBody">
                                            <ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Fielding' && point.PointsT10!='0.0'" >
                                                <li>{{point.PointsTypeDescprition}}</li>
                                                <li>{{point.PointsT10 | number }}</li>
                                            </ul>    
                                        </div>
                                    </div>

                                    <div class="mt-3">
                                        <h4 class="text-left"> Note : </h4>

                                        <ul class="list_point">
                                            <li> The cricketer you choose to be your Fantasy <strong> Cricket Team’s Captain </strong> will receive <strong> {{CaptainPoint |number}} </strong> times the points </li>

                                            <li> The <strong> Vice-Captain </strong> will receive <strong> {{ViceCaptainPoint |number}} </strong> times the points for his performance. </li>

                                            <li> Starting bonus point <strong> {{Playing11Point | number}} 
                                              </strong> are assigned to any player on the basis of announcement of  playing <strong> 11. </strong></li>
                                        </ul>
                                    </div>
                                </div>

                                <div id="ODI" class="tab-pane {{activeTab=='ODI' ? 'active' : '' }}">
                                    <div class="">
                                        <h4>Batting</h4>
                                        <div class="pointHead">
                                            <ul>
                                                <li>Type Of points</li>
                                                <li>ODI</li>
                                            </ul>
                                        </div>
                                        <div class="pointBody">
                                            <ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Batting' && point.PointsODI!='0.0' && (point.PointsScoringField == 'Runs' || point.PointsTypeGUID == 'Four' || point.PointsTypeGUID == 'Six')" >
                                                <li>{{point.PointsTypeDescprition}}</li>
                                                <li>{{point.PointsODI | number }}</li>
                                            </ul>
                                        </div>

                                        <h4> Strike Rate </h4>
                                        <div class="pointHead">
                                            <ul>
                                                <li>Type Of points</li>
                                                <li>ODI</li>
                                            </ul>
                                        </div>
                                        <div class="pointBody">
                                            <ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Batting' && point.PointsODI!='0.0' && (point.PointsScoringField == 'StrikeRate' || point.PointsTypeGUID == 'MinimumBallsScoreStrikeRate')" >
                                                <li>{{point.PointsTypeDescprition}}</li>
                                                <li>{{point.PointsODI | number }}</li>
                                            </ul>
                                        </div>

                                        <h4>Bowling</h4>
                                        <div class="pointHead">
                                            <ul>
                                                <li>Type Of points</li>
                                                <li>ODI</li>
                                            </ul>
                                        </div>
                                        <div class="pointBody">
                                            <ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Bowling' && point.PointsODI!='0.0' && (point.PointsScoringField == 'Wickets') || (point.PointsScoringField == 'DotBall' || point.PointsScoringField == 'NoBall' || point.PointsScoringField == 'WideBall') && point.PointsODI!='0.0'" >
                                                <li>{{point.PointsTypeDescprition}}</li>
                                                <li>{{point.PointsODI | number }}</li>
                                            </ul>    
                                        </div>

                                        <h4> Economy </h4>
                                        <div class="pointHead">
                                            <ul>
                                                <li>Type Of points</li>
                                                <li>ODI</li>
                                            </ul>
                                        </div>
                                        <div class="pointBody">
                                            <ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Bowling' && point.PointsODI!='0.0' && (point.PointsScoringField == 'Economy' || point.PointsTypeGUID == 'MinimumOverEconomyRate')" >
                                                <li>{{(point.PointsTypeGUID == 'MinimumOverEconomyRate')?point.PointsTypeDescprition.replace('2','5'):point.PointsTypeDescprition}}</li>
                                                <li>{{point.PointsODI | number }}</li>
                                            </ul>    
                                        </div>

                                        <h4> Fielding </h4>
                                        <div class="pointHead">
                                            <ul>
                                                <li>Type Of points</li>
                                                <li>ODI</li>
                                            </ul>
                                        </div>
                                        <div class="pointBody">
                                            <ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Fielding' && point.PointsODI!='0.0'" >
                                                <li>{{point.PointsTypeDescprition}}</li>
                                                <li>{{point.PointsODI | number }}</li>
                                            </ul>    
                                        </div>
                                    </div>
                                    <div class="mt-3">

                                        <h4 class="text-left"> Note : </h4>

                                        <ul class="list_point">
                                            <li> The cricketer you choose to be your Fantasy <strong> Cricket Team’s Captain </strong> will receive <strong> {{CaptainPoint |number}} </strong> times the points </li>

                                            <li> The <strong> Vice-Captain </strong> will receive <strong> {{ViceCaptainPoint |number}} </strong> times the points for his performance. </li>

                                            <li> Starting bonus point <strong> {{Playing11Point | number}} 
                                              </strong> are assigned to any player on the basis of announcement of  playing <strong> 11. </strong></li>
                                        </ul>
                                    </div>
                                </div>

                                <div id="TEST" class="tab-pane {{activeTab=='TEST' ? 'active' : '' }}">
                                    <div class="">
                                        <h4>Batting</h4>
                                        <div class="pointHead">
                                            <ul>
                                                <li>Type Of points</li>
                                                <li>TEST</li>
                                            </ul>
                                        </div>
                                        <div class="pointBody">
                                            <ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Batting' && point.PointsTEST!='0.0' && (point.PointsScoringField == 'Runs' || point.PointsTypeGUID == 'Four' || point.PointsTypeGUID == 'Six')" >
                                                <li ng-if="point.PointsTypeGUID!='MinimumBallsScoreStrikeRate'">{{point.PointsTypeDescprition}}</li>
                                                <li ng-if="point.PointsTypeGUID!='MinimumBallsScoreStrikeRate'">{{point.PointsTEST | number }}</li>
                                            </ul>
                                        </div>

                                        <h4>Bowling</h4>
                                        <div class="pointHead">
                                            <ul>
                                                <li>Type Of points</li>
                                                <li>TEST</li>
                                            </ul>
                                        </div>
                                        <div class="pointBody">
                                            <ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Bowling' && point.PointsTEST!='0.0' && (point.PointsScoringField == 'Wickets') || (point.PointsScoringField == 'DotBall' || point.PointsScoringField == 'NoBall' || point.PointsScoringField == 'WideBall') && point.PointsTEST!='0.0'" >
                                                <li>{{point.PointsTypeDescprition}}</li>
                                                <li>{{point.PointsTEST | number }}</li>
                                            </ul>    
                                        </div>

                                        <h4>Fielding</h4>
                                        <div class="pointHead">
                                            <ul>
                                                <li>Type Of points</li>
                                                <li>TEST</li>
                                            </ul>
                                        </div>
                                        <div class="pointBody">
                                            <ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Fielding' && point.PointsTEST!='0.0'" >
                                                <li>{{point.PointsTypeDescprition}}</li>
                                                <li>{{point.PointsTEST | number }}</li>
                                            </ul>    
                                        </div>
                                    </div>
                                     <div class="mt-3">
                                        
                                        <h4 class="text-left"> Note : </h4>
                                        
                                        <ul class="list_point">
                                            <li> The cricketer you choose to be your Fantasy <strong> Cricket Team’s Captain </strong> will receive <strong> {{CaptainPoint |number}} </strong> times the points </li>

                                            <li> The <strong> Vice-Captain </strong> will receive <strong> {{ViceCaptainPoint |number}} </strong> times the points for his performance. </li>

                                            <li> Starting bonus point <strong> {{Playing11Point | number}} 
                                              </strong> are assigned to any player on the basis of announcement of  playing <strong> 11. </strong></li>

                                            <li> Strike Rate & Economic Rate Not applicable for Test matches </li>
                                            
                                        </ul>
                                    </div>
        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--Main container sec end-->
<?php include('innerFooter.php');?>