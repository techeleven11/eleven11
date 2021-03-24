<?php 
    include('header.php');
?>

<!--Main container sec start-->
<div class="mainContainer" ng-controller="pointSystemController" ng-init="pointSystem()" ng-cloak >
    <div class="mt-5">
        <div class="top-header-title pt-4">
            <h1>Point System</h1>
        </div>


<!---accordion wrapper start-->
        <div class="football_point_system_wrapper">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                        <div class="card">
                            <div class="card-header">
                                <ul class="nav nav-tabs card-header-tabs" id="outerTab" role="tablist">
                                    <li class="nav-item li_width">
                                        <a class="nav-link active" data-toggle="tab" href="#tabc" aria-controls="tabc" role="tab" aria-expanded="true">Cricket</a>
                                    </li>
                                    <li class="nav-item li_width1"></li>
                                    <li class="nav-item li_width">
                                        <a class="nav-link" data-toggle="tab" href="#tabb" aria-controls="tabb" role="tab">Football</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="card-body tab-content">
                                <div class="tab-pane active" id="tabc" role="tabpanel">
                                    <!--Content for Tab-1 and:-->
                                    <div class="card">
                                        <div class="card-header">
                                            <ul class="nav nav-tabs card-header-tabs" id="innerTab" role="tablist">
                                                <li class="nav-item">
                                                    <a class="nav-link active" data-toggle="tab" href="#tab1" aria-controls="tab1" role="tab" aria-expanded="true">T20</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link" data-toggle="tab" href="#tab2" aria-controls="tab2" role="tab">ODI</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link" data-toggle="tab" href="#tab3" aria-controls="tab3" role="tab">TEST</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link" data-toggle="tab" href="#tab4" aria-controls="tab4" role="tab">OTHER T20</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link" data-toggle="tab" href="#tab5" aria-controls="tab5" role="tab">T10</a>
                                                </li>
											</ul>
                                        </div>
                                        <div class="card-body tab-content football_point_system">
                                            <div class="tab-pane active" id="tab1" role="tabpanel">
                                            <!--Content for Nested Tab-1-->
                                                <div id="accordion" class="">
                                                    <div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse5" aria-expanded="true">
                                                                Base points<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse5" class="collapse show" data-parent="#accordion">
                                                            <div class="card-body">
																<div class="pointBody">
																	<ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Batting' && point.PointsT20!='0.0' && (point.PointsScoringField == 'Runs' || point.PointsTypeGUID == 'Four' || point.PointsTypeGUID == 'Six')" >
																		<li>{{point.PointsTypeDescprition}}</li>
																		<li>{{point.PointsT20 | number }}</li>
																	</ul>
																</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse6" aria-expanded="false">
                                                                strike rate<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse6" class="collapse" data-parent="#accordion">
                                                            <div class="card-body">
																<div class="pointBody">
																	<ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Batting' && point.PointsT20!='0.0' && point.PointsScoringField == 'StrikeRate' || point.PointsTypeGUID == 'MinimumBallsScoreStrikeRate'" >
																		<li>{{point.PointsTypeDescprition}}</li>
																		<li>{{point.PointsT20 | number }}</li>
																	</ul>
																</div>
															</div>
                                                        </div>
                                                    </div>
                                                    <div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse7" aria-expanded="false">
                                                                Bowling<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse7" class="collapse" data-parent="#accordion">
                                                            <div class="card-body">
                                                                <div class="pointBody">
																	<ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Bowling' && point.PointsT20!='0.0' && (point.PointsScoringField == 'Wickets') || (point.PointsScoringField == 'DotBall' || point.PointsScoringField == 'NoBall' || point.PointsScoringField == 'WideBall') && point.PointsT20!='0.0'" >
																		<li>{{point.PointsTypeDescprition}}</li>
																		<li>{{point.PointsT20 | number }}</li>
																	</ul>    
																</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse8" aria-expanded="false">
                                                                economy<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse8" class="collapse" data-parent="#accordion">
                                                            <div class="card-body">
                                                                <div class="pointBody">
																	<ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Bowling' && point.PointsT20!='0.0' && point.PointsScoringField == 'Economy' || point.PointsTypeGUID == 'MinimumOverEconomyRate'" >
																		<li>{{point.PointsTypeDescprition}}</li>
																		<li>{{point.PointsT20 | number }}</li>
																	</ul>    
																</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse9" aria-expanded="false">
                                                                Fielding<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse9" class="collapse" data-parent="#accordion">
                                                            <div class="card-body">
                                                               <div class="pointBody">
																	<ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Fielding' && point.PointsT20!='0.0'" >
																		<li>{{point.PointsTypeDescprition}}</li>
																		<li>{{point.PointsT20 | number }}</li>
																	</ul>    
																</div>
                                                            </div>
                                                        </div>
                                                    </div>
													<div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse110" aria-expanded="false">
                                                                Note<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse110" class="collapse" data-parent="#accordion">
                                                            <div class="card-body">
																<div class="mt-3">
																	<ul class="list_point">
																		<li> The cricketer you choose to be your Fantasy <strong> Cricket Team’s Captain </strong> will receive <strong class="ng-binding"> 2 </strong> times the points </li>

																		<li> The <strong> Vice-Captain </strong> will receive <strong class="ng-binding"> 1.5 </strong> times the points for his performance. </li>

																		<li> Starting bonus point <strong class="ng-binding"> 2 
																		  </strong> are assigned to any player on the basis of announcement of  playing <strong> 11. </strong></li>
																	</ul>
																</div>  
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="tab2" role="tabpanel">
                                            <!--Content for Nested Tab-2-->
                                                <div id="accordion">
                                                    <div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse10" aria-expanded="true">
                                                                Batting<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse10" class="collapse show" data-parent="#accordion">
                                                            <div class="card-body">
																<div class="pointBody">
																	 <div class="pointBody">
																		<ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Batting' && point.PointsODI!='0.0' && (point.PointsScoringField == 'Runs' || point.PointsTypeGUID == 'Four' || point.PointsTypeGUID == 'Six')" >
																			<li>{{point.PointsTypeDescprition}}</li>
																			<li>{{point.PointsODI | number }}</li>
																		</ul>
																	</div>
																</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse11" aria-expanded="false">
                                                                strike rate<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse11" class="collapse" data-parent="#accordion">
                                                            <div class="card-body">
                                                                <div class="pointBody">
																	<div class="pointBody">
																		<ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Batting' && point.PointsODI!='0.0' && (point.PointsScoringField == 'StrikeRate' || point.PointsTypeGUID == 'MinimumBallsScoreStrikeRate')" >
																			<li>{{point.PointsTypeDescprition}}</li>
																			<li>{{point.PointsODI | number }}</li>
																		</ul>
																	</div>

																</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse12" aria-expanded="false">
                                                                Bowling<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse12" class="collapse" data-parent="#accordion">
                                                            <div class="card-body">
																<div class="pointBody">
																	<ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Bowling' && point.PointsODI!='0.0' && (point.PointsScoringField == 'Wickets') || (point.PointsScoringField == 'DotBall' || point.PointsScoringField == 'NoBall' || point.PointsScoringField == 'WideBall') && point.PointsODI!='0.0'" >
																		<li>{{point.PointsTypeDescprition}}</li>
																		<li>{{point.PointsODI | number }}</li>
																	</ul>    
																</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse13" aria-expanded="false">
                                                                economy<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse13" class="collapse" data-parent="#accordion">
                                                            <div class="card-body">
                                                                <div class="pointBody">
																	<ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Bowling' && point.PointsODI!='0.0' && (point.PointsScoringField == 'Economy' || point.PointsTypeGUID == 'MinimumOverEconomyRate')" >
																		<li>{{(point.PointsTypeGUID == 'MinimumOverEconomyRate')?point.PointsTypeDescprition.replace('2','5'):point.PointsTypeDescprition}}</li>
																		<li>{{point.PointsODI | number }}</li>
																	</ul>    
																</div>
															</div>
                                                        </div>
                                                    </div>
                                                    <div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse14" aria-expanded="false">
                                                                Fielding<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse14" class="collapse" data-parent="#accordion">
                                                            <div class="card-body">
                                                                <div class="pointBody">
																	<ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Fielding' && point.PointsODI!='0.0'" >
																		<li>{{point.PointsTypeDescprition}}</li>
																		<li>{{point.PointsODI | number }}</li>
																	</ul>    
																</div>
                                                            </div>
                                                        </div>
                                                    </div>
													
													<div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse114" aria-expanded="false">
                                                                Note<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse114" class="collapse" data-parent="#accordion">
                                                            <div class="card-body">
																<div class="mt-3">
																	<ul class="list_point">
																		<li> The cricketer you choose to be your Fantasy <strong> Cricket Team’s Captain </strong> will receive <strong class="ng-binding"> 2 </strong> times the points </li>

																		<li> The <strong> Vice-Captain </strong> will receive <strong class="ng-binding"> 1.5 </strong> times the points for his performance. </li>

																		<li> Starting bonus point <strong class="ng-binding"> 2 
																		  </strong> are assigned to any player on the basis of announcement of  playing <strong> 11. </strong></li>
																	</ul>
																</div>  
                                                            </div>
                                                        </div>
                                                    </div>
													
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="tab3" role="tabpanel">
                                            <!--Content for Nested Tab-3-->
                                                <div id="accordion">
                                                    <div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse15" aria-expanded="true">
                                                                Batting<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse15" class="collapse show" data-parent="#accordion">
                                                            <div class="card-body">
                                                                <div class="pointBody">
																	<ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Batting' && point.PointsTEST!='0.0' && (point.PointsScoringField == 'Runs' || point.PointsTypeGUID == 'Four' || point.PointsTypeGUID == 'Six')" >
																		<li ng-if="point.PointsTypeGUID!='MinimumBallsScoreStrikeRate'">{{point.PointsTypeDescprition}}</li>
																		<li ng-if="point.PointsTypeGUID!='MinimumBallsScoreStrikeRate'">{{point.PointsTEST | number }}</li>
																	</ul>
																</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse16" aria-expanded="false">
                                                                Bowling<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse16" class="collapse" data-parent="#accordion">
                                                            <div class="card-body">
                                                               <div class="pointBody">
																	<ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Bowling' && point.PointsTEST!='0.0' && (point.PointsScoringField == 'Wickets') || (point.PointsScoringField == 'DotBall' || point.PointsScoringField == 'NoBall' || point.PointsScoringField == 'WideBall') && point.PointsTEST!='0.0'" >
																		<li>{{point.PointsTypeDescprition}}</li>
																		<li>{{point.PointsTEST | number }}</li>
																	</ul>    
																</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse17" aria-expanded="false">
                                                                Fielding<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse17" class="collapse" data-parent="#accordion">
                                                            <div class="card-body">
                                                                <div class="pointBody">
																	<ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Fielding' && point.PointsTEST!='0.0'" >
																		<li>{{point.PointsTypeDescprition}}</li>
																		<li>{{point.PointsTEST | number }}</li>
																	</ul>    
																</div>
                                                            </div>
                                                        </div>
                                                    </div> 
													<div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse118" aria-expanded="false">
                                                                Note<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse118" class="collapse" data-parent="#accordion">
                                                            <div class="card-body">
																<div class="mt-3">
																	<ul class="list_point">
																		<li> The cricketer you choose to be your Fantasy <strong> Cricket Team’s Captain </strong> will receive <strong class="ng-binding"> 2 </strong> times the points </li>

																		<li> The <strong> Vice-Captain </strong> will receive <strong class="ng-binding"> 1.5 </strong> times the points for his performance. </li>

																		<li> Starting bonus point <strong class="ng-binding"> 2 
																		  </strong> are assigned to any player on the basis of announcement of  playing <strong> 11. </strong></li>
																	</ul>
																</div>  
                                                            </div>
                                                        </div>
                                                    </div>													
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="tab4" role="tabpanel">
                                            <!--Content for Nested Tab-4-->
                                                <div id="accordion">
                                                    <div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse20" aria-expanded="true">
                                                                Base points<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse20" class="collapse show" data-parent="#accordion">
                                                            <div class="card-body">
                                                                <p>For every run scored<span class="float-right">1</span></p>
                                                                <p>For every 4 hit<span class="float-right">1</span></p>
                                                                <p>For every 6 hit<span class="float-right">2</span></p>
                                                                <p>For 50 runs<span class="float-right">8</span></p>
                                                                <p>For 100 runs<span class="float-right">16</span></p>
                                                                <p>Duck (EXCEPT BOWLER)<span class="float-right">-2</span></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse21" aria-expanded="false">
                                                                strike rate<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse21" class="collapse" data-parent="#accordion">
                                                            <div class="card-body">
                                                                <p>A player must score a minimum balls to be awarded <br/>the Strike Rate bonus (EXCEPT BOWLER)<span class="float-right">10</span></p>
                                                                <p>Strike rate 0 to 49.99<span class="float-right">-6</span></p>
                                                                <p>Strike rate 50 to 74.99<span class="float-right">-5</span></p>
                                                                <p>Strike rate 75.00 to 99.99<span class="float-right">-4</span></p>
                                                                <p>Strike rate 100 to 149.99<span class="float-right">5</span></p>
                                                                <p>Strike rate 150.00 to 199.99<span class="float-right">10</span></p>
                                                                <p>Strike rate 200.00 or more<span class="float-right">15</span></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse22" aria-expanded="false">
                                                                attack<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse22" class="collapse" data-parent="#accordion">
                                                            <div class="card-body">
                                                                <p>For every wicket taken<span class="float-right">20</span></p>
                                                                <p>For 3-wicket<span class="float-right">6</span></p>
                                                                <p>For 4-wicket<span class="float-right">8</span></p>
                                                                <p>For 5-wicket<span class="float-right">-16</span></p>
                                                                <p>For 6-wicket<span class="float-right">20</span></p>
                                                                <p>For 7 wickets<span class="float-right">30</span></p>
                                                                <p>Dot Ball<span class="float-right">1</span></p>
                                                                <p>No Ball<span class="float-right">-2</span></p>
                                                                <p>For 8 wickets or more<span class="float-right">40</span></p>
                                                                <p>Wide Ball<span class="float-right">-1</span></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse23" aria-expanded="false">
                                                                economy<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse23" class="collapse" data-parent="#accordion">
                                                            <div class="card-body">
                                                                <p>A player must bowl a minimum over to be awarded the Economy Rate bonus<span class="float-right">2</span></p>
                                                                <p>Economy rate 0 to 5.00<span class="float-right">4</span></p>
                                                                <p>Economy rate 10.01 to 12.00<span class="float-right">-6</span></p>
                                                                <p>Economy rate 12.01 or more<span class="float-right">-8</span></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse24" aria-expanded="false">
                                                                Fielding<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse24" class="collapse" data-parent="#accordion">
                                                            <div class="card-body">
                                                                <p>Catch<span class="float-right">8</span></p>
                                                                <p>Stumping<span class="float-right">6</span></p>
                                                                <p>Run-out<span class="float-right">6</span></p>
                                                            </div>
                                                        </div>
                                                    </div>
													<div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse125" aria-expanded="false">
                                                                Note<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse125" class="collapse" data-parent="#accordion">
                                                            <div class="card-body">
																<div class="mt-3">
																	<ul class="list_point">
																		<li> The cricketer you choose to be your Fantasy <strong> Cricket Team’s Captain </strong> will receive <strong class="ng-binding"> 2 </strong> times the points </li>

																		<li> The <strong> Vice-Captain </strong> will receive <strong class="ng-binding"> 1.5 </strong> times the points for his performance. </li>

																		<li> Starting bonus point <strong class="ng-binding"> 2 
																		  </strong> are assigned to any player on the basis of announcement of  playing <strong> 11. </strong></li>
																	</ul>
																</div>  
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="tab5" role="tabpanel">
                                            <!--Content for Nested Tab-5-->
                                                <div id="accordion">
                                                    <div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse25" aria-expanded="true">
                                                                Base points3<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse25" class="collapse show" data-parent="#accordion">
                                                            <div class="card-body">
                                                                <div class="pointBody">
																	<ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Batting' && point.PointsT10!='0.0' && (point.PointsScoringField == 'Runs' || point.PointsTypeGUID == 'Four' || point.PointsTypeGUID == 'Six')" >
																		<li>{{point.PointsTypeDescprition}}</li>
																		<li>{{point.PointsT10 | number }}</li>
																	</ul>
																</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse26" aria-expanded="false">
                                                                strike rate<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse26" class="collapse" data-parent="#accordion">
                                                            <div class="card-body">
                                                                <div class="pointBody">
																	<ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Batting' && point.PointsT10!='0.0' && point.PointsScoringField == 'StrikeRate' || point.PointsTypeGUID == 'MinimumBallsScoreStrikeRate'" >
																		<li>{{point.PointsTypeDescprition}}</li>
																		<li>{{point.PointsT10 | number }}</li>
																	</ul>
																</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse27" aria-expanded="false">
                                                                attack<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse27" class="collapse" data-parent="#accordion">
                                                            <div class="card-body">
                                                                <div class="pointBody">
																	<ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Bowling' && point.PointsT10!='0.0' && (point.PointsScoringField == 'Wickets') || (point.PointsScoringField == 'DotBall' || point.PointsScoringField == 'NoBall' || point.PointsScoringField == 'WideBall') && point.PointsT10!='0.0'" >
																		<li>{{point.PointsTypeDescprition}}</li>
																		<li>{{point.PointsT10 | number }}</li>
																	</ul>    
																</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse28" aria-expanded="false">
                                                                economy<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse28" class="collapse" data-parent="#accordion">
                                                            <div class="card-body">
                                                                 <div class="pointBody">
																	<ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Bowling' && point.PointsT10!='0.0' && point.PointsScoringField == 'Economy' || point.PointsTypeGUID == 'MinimumOverEconomyRate'" >
																		<li>{{point.PointsTypeDescprition}}</li>
																		<li>{{point.PointsT10 | number }}</li>
																	</ul>    
																</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse29" aria-expanded="false">
                                                                Fielding<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse29" class="collapse" data-parent="#accordion">
                                                            <div class="card-body">
                                                               <div class="pointBody">
																	<ul ng-repeat="point in points | orderBy:'Sort'" ng-if="point.PointsInningType == 'Fielding' && point.PointsT10!='0.0'" >
																		<li>{{point.PointsTypeDescprition}}</li>
																		<li>{{point.PointsT10 | number }}</li>
																	</ul>    
																</div>
                                                            </div>
                                                        </div>
                                                    </div>
													<div class="card">
                                                        <div class="card-header select_arrow">
                                                            <a class="card-link" data-toggle="collapse" href="#collapse129" aria-expanded="false">
                                                                Note<span class="arrow">&nbsp;</span>
                                                            </a>
                                                        </div>
                                                        <div id="collapse129" class="collapse" data-parent="#accordion">
                                                            <div class="card-body">
																<div class="mt-3">
																	<ul class="list_point">
																		<li> The cricketer you choose to be your Fantasy <strong> Cricket Team’s Captain </strong> will receive <strong class="ng-binding"> 2 </strong> times the points </li>

																		<li> The <strong> Vice-Captain </strong> will receive <strong class="ng-binding"> 1.5 </strong> times the points for his performance. </li>

																		<li> Starting bonus point <strong class="ng-binding"> 2 
																		  </strong> are assigned to any player on the basis of announcement of  playing <strong> 11. </strong></li>
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
                               
								
								
								
								
								
								
								 <div class="tab-pane" id="tabb" role="tabpane2">
                                    <!--Content for Tab-2-->
                                    <div class="card">
                                        <div class="card-body tab-content">
                                            <div class="tab-pane active" id="" role="tabpane2" aria-multiselectable="true">
                                                <div class="football_point_system">
                                                    <div id="accordion6">
                                                        <div class="card">
                                                            <div class="card-header select_arrow">
                                                                <a class="card-link" data-toggle="collapse" href="#collapse31" aria-expanded="true">
                                                                    playing time<span class="arrow">&nbsp;</span>
                                                                </a>
                                                            </div>
                                                            <div id="collapse31" class="collapse show" data-parent="#accordion6">
                                                                <div class="card-body">
                                                                     <div class="pointBody">
																		<ul ng-repeat="point in points | orderBy:'Sort'" ng-show="point.PointsType == 'Playing Time'" >
																			<li>{{point.PointsTypeDescprition}}</li>
																			<li>{{point.PointsValue | number }}</li>
																		</ul>
																	</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="card">
                                                            <div class="card-header select_arrow">
                                                                <a class="card-link" data-toggle="collapse" href="#collapse32" aria-expanded="false">
                                                                    attack<span class="arrow">&nbsp;</span>
                                                                </a>
                                                            </div>
                                                            <div id="collapse32" class="collapse" data-parent="#accordion6">
                                                                <div class="card-body">
                                                                    <div class="pointBody">
																		<ul ng-repeat="point in points | orderBy:'Sort'" ng-show="point.PointsType == 'Attack'" >
																			<li>{{point.PointsTypeDescprition}}</li>
																			<li>{{point.PointsValue | number }}</li>
																		</ul>
																	</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="card">
                                                            <div class="card-header select_arrow">
                                                                <a class="card-link" data-toggle="collapse" href="#collapse33" aria-expanded="false">
                                                                    Defense<span class="arrow">&nbsp;</span>
                                                                </a>
                                                            </div>
                                                            <div id="collapse33" class="collapse" data-parent="#accordion6">
                                                                <div class="card-body">
                                                                   <div class="pointBody">
																		<ul ng-repeat="point in points | orderBy:'Sort'" ng-show="point.PointsType == 'Defense'" >
																			<li>{{point.PointsTypeDescprition}}</li>
																			<li>{{point.PointsValue | number }}</li>
																		</ul>
																	</div>
                                                                </div>
                                                            </div>
                                                        </div>
														<div class="card">
                                                            <div class="card-header select_arrow">
                                                                <a class="card-link" data-toggle="collapse" href="#collapse34" aria-expanded="false">
                                                                    Cards & Other penalties<span class="arrow">&nbsp;</span>
                                                                </a>
                                                            </div>
                                                            <div id="collapse34" class="collapse" data-parent="#accordion6">
                                                                <div class="card-body">
                                                                   <div class="pointBody">
																		<ul ng-repeat="point in points | orderBy:'Sort'" ng-show="point.PointsType == 'Cards and Other Penalties'" >
																			<li>{{point.PointsTypeDescprition}}</li>
																			<li>{{point.PointsValue | number }}</li>
																		</ul>
																	</div>
                                                                </div>
                                                            </div>
                                                        </div>
														<div class="card">
                                                            <div class="card-header select_arrow">
                                                                <a class="card-link" data-toggle="collapse" href="#collapse35" aria-expanded="false">
                                                                   Notes<span class="arrow">&nbsp;</span>
                                                                </a>
                                                            </div>
                                                            <div id="collapse35" class="collapse" data-parent="#accordion6">
                                                                <div class="card-body">
                                                                   <div class="mt-3">
																	<ul class="list_point">
																		<li> The cricketer you choose to be your Fantasy <strong> Cricket Team’s Captain </strong> will receive <strong class="ng-binding"> 2 </strong> times the points </li>

																		<li> The <strong> Vice-Captain </strong> will receive <strong class="ng-binding"> 1.5 </strong> times the points for his performance. </li>

																		<li> Starting bonus point <strong class="ng-binding"> 2 
																		  </strong> are assigned to any player on the basis of announcement of  playing <strong> 11. </strong></li>
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
								
								
								
								
								
								
								
								
								
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </div>
</div>
<!--Main container sec end-->
<div loading class="loderBG flex-container" id="loderBG">
    <img src="<?= $path; ?>assets/img/loader.svg" alt="loader">
</div> 
<!--Footer sec end-->
</main>
<script type="text/javascript" src="<?= $path; ?>assets/js/lazysize.js" async></script>
<script type="text/javascript" src="<?= $path; ?>assets/js/jquery.min.js"></script>
<script type="text/javascript" src="<?= $path; ?>assets/js/popper.min.js"></script>
<?php if($PathName != ''){ ?>
<script type="text/javascript" src="<?= $path; ?>assets/js/bootstrap.min.js"></script>
<script type="text/javascript" src="<?= $path; ?>assets/js/polyfill.min.js"></script>
<?php }else{ ?>
    <script type="text/javascript" src="<?= $path; ?>assets/js/bootstrap.min.js"></script>
<?php } ?>
<!-- load angular -->
<script type="text/javascript" src="<?= $path; ?>assets/js/angular-modules/angular.min.js" ></script>
<!-- angular storage -->
<script type="text/javascript" src="<?= $path; ?>assets/js/angular-modules/ngStorage.min.js" ></script>
<?php if($PathName != ''){ ?>
    <script type="text/javascript" src="<?= $path; ?>assets/js/angular-cookies.min.js" ></script>
<!-- MAIN CONTROLLER -->
<script type="text/javascript" src="<?= $path; ?>assets/js/app.js?version=<?= VERSION ?>"></script>
<?php }else{ ?>
    <script type="text/javascript" src="<?= $path; ?>assets/js/app2.js?version=<?= VERSION ?>"></script>
<?php } ?>
<script src="https://www.google.com/recaptcha/api.js?render=explicit"></script>
<script type="text/javascript">

    var base_url = "<?php echo $base_url;?>";
    var UserGUID, UserTypeID, ParentCategoryGUID = '';
    app.constant('sportsCollection', {
        teamPlayerLimit: 11
    });
    app.constant('environment', {
        base_url: "<?php echo $base_url;?>",
        api_url: "<?php echo $api_url;?>",
        image_base_url: '<?php echo $base_url; ?><?= $path; ?>assets/img/',
        brand_name: 'FSL11'
    });
    <?php if($PathName != ''){ ?>
        app.config(function(socialProvider){
            socialProvider.setGoogleKey("911285713331-5epvisg4tpjoa41bopkfs1aip1gpjoaf.apps.googleusercontent.com");
            socialProvider.setFbKey({appId: "426400607971745", apiVersion: "v2.11"});
        });
    <?php } ?>
</script>

<!-- common service -->
<script type="text/javascript" src="<?= $path; ?>assets/js/services/database.fac.js?version=<?= VERSION ?>"></script>
<!-- common directive -->
<script type="text/javascript" src="<?= $path; ?>assets/js/directive/design-directive.lib.js?version=<?= VERSION ?>"></script>
<?php if($PathName != ''){ ?>
<!-- helper -->
<script type="text/javascript" src="<?= $path; ?>assets/js/helper/helper.js?version=<?= VERSION ?>"></script>
<!-- validations -->
<script type="text/javascript" src="<?= $path; ?>assets/js/directive/validation.lib.js?version=<?= VERSION ?>"></script>
<!-- social ligin library -->
<script type="text/javascript" src="<?= $path; ?>assets/js/angularjs-social-login/angularjs-social-login.js?version=<?= VERSION ?>" ></script>
<!-- file upload -->
<script async type="text/javascript" src="<?= $path; ?>assets/js/jquery.form.js"></script>
<!-- Angular animate js -->
<script type="text/javascript" src="<?= $path; ?>assets/js/angular-animate.min.js"></script>
<!-- settings controller -->
<script type="text/javascript" src="<?= $path; ?>assets/js/controllers/contactUs.js?version=<?= VERSION ?>"></script>
<?php } ?>
<!-- toaster message -->
<script type="text/javascript" src="<?= $path; ?>assets/js/toastr/toastr.min.js"></script>
<link rel="stylesheet" href="<?= $path; ?>assets/js/toastr/toastr.min.css">
<?php if($PathName != ''){?>
<!-- datepicker -->
<link href="<?= $path; ?>assets/js/angular-modules/angularjs-datepicker/src/css/angular-datepicker.css"  type="text/css" />
<script type="text/javascript" src="<?= $path; ?>assets/js/angular-modules/angularjs-datepicker/src/js/angular-datepicker.js"></script>
<!-- header controller -->
<script type="text/javascript" src="<?= $path; ?>assets/js/controllers/header.js?version=<?= VERSION ?>"></script>
<?php } if($PathName == 'authenticate'){ ?>
<!-- auth controller -->
<script type="text/javascript" src="<?= $path; ?>assets/js/controllers/auth.js?version=<?= VERSION ?>"></script>
<?php }else if($PathName == 'PointSystem' || $PathName == 'PointsSystem'){ ?>
<!-- point system controller -->
<script type="text/javascript" src="<?= $path; ?>assets/js/controllers/pointSystem.js?version=<?= VERSION ?>"></script>
<?php }else if($PathName == 'FootballPointSystem'){ ?>
<!-- point system controller -->
<script type="text/javascript" src="<?= $path; ?>assets/js/controllers/FootballpointSystem.js?version=<?= VERSION ?>" ></script>
<?php }else if($PathName == ''){?>
<!-- Home controller -->
<script type="text/javascript" src="<?= $path; ?>assets/js/controllers/home.js?version=<?= VERSION ?>"></script>
<?php } ?>
<?php if($PathName != ''){?>
<script type="text/javascript" src="<?= $path; ?>assets/js/angular-modules/ng-file-upload-master/dist/ng-file-upload.min.js"></script> 
<?php }?>
<link rel="stylesheet" href="<?= $path; ?>assets/js/bootstrap-select/bootstrap-select.min.css">

<script async type="text/javascript" src="<?= $path; ?>assets/js/bootstrap-select/bootstrap-select.min.js" ></script>
<?php if($PathName != ''){?>
<script type="text/javascript" src="<?= $path; ?>assets/js/angular-modules/ng-file-upload-master/dist/ng-file-upload-shim.min.js"></script>
<script type="text/javascript" src="<?= $path; ?>assets/js/jquery.mCustomScrollbar.concat.min.js"></script>
<?php } ?>
<script  type="text/javascript" src="<?= $path; ?>assets/js/slick.min.js"></script>
<script  type="text/javascript" src="<?= $path; ?>assets/js/jquery.hover-slider.js"></script>
<script  type="text/javascript" src="<?= $path; ?>assets/js/custom.js?version=<?= strtotime(date('Y-m-d H:i:s')); ?>"></script>
<!-- <link rel="stylesheet" href="auctionDraft/node_modules/angularjs-datetime-picker/angularjs-datetime-picker.css" /> -->
<?php if($PathName != ''){?>
<script type="text/javascript" src="<?= $path; ?>auctionDraft/node_modules/angularjs-datetime-picker/angularjs-datetime-picker.min.js"></script>
<?php }?>
<script type="text/javascript" src="<?= $path; ?>assets/js/moment.min.js"></script>
<!-- Verify mobile no. on login -->
    <div class="modal fade centerPopup modal_hideBack"  id="verifyMobileAfterSignin" popup-handler  data-backdrop="static" data-keyboard="false" >
        <div class="modal-dialog custom_popup small_popup">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" ng-click="closeVerifyMobilePopup()">×</button>
                    <h4 class="modal-title">Verify Mobile</h4>
                </div>
                <div class="modal-body clearfix comon_body ammount_popup">
                    <form class="form_commen" name="verifyOTP" ng-submit="(OTPStatus)?verifyMobileNumber(verifyOTP):verifySigninMobile(verifyOTP)" novalidate="">
                        <div class="form-group" ng-if="!OTPStatus">
                            <label>Enter Your Mobile No.</label>
                            <input type="text" placeholder="Mobile No." name="phone" ng-model="VerifyInfo.VerfiyPhoneNumber" class="form-control" numbers-only maxlength="10" ng-required="true">
                            <div ng-show="SendOTP && verifyOTP.phone.$error.required" class="text-danger form-error">
                                *Mobile no. is required.
                            </div>
                        </div>
                        <div class="form-group" ng-if="OTPStatus">
                            <label>Enter your OTP below sent to your Mobile no.</label>
                            <input placeholder="OTP" name="otp" ng-model="VerifyInfo.VerifyOTP" numbers-only class="form-control" type="text" ng-required="true">
                            <div ng-show="SendOTP && verifyOTP.otp.$error.required" class="text-danger form-error">
                                *OTP is required.
                            </div>
                        </div>
                        <!--Recaptcha Widget-->
                        <div id="SigninPhoneVerifyCaptchaEnabled" ng-if="!OTPStatus"></div>
                        <div class="button_right text-center">
                            <button class="btn btn-submit theme_bgclr" ng-if="OTPStatus">Verify</button>
                            <button class="btn btn-submit theme_bgclr" ng-if="!OTPStatus">Send OTP</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>
<style>
    .tooltip {
        pointer-events: none !important;
    }
</style>
</html>