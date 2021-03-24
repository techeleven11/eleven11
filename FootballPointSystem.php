<?php 
    include('header.php');
?>

<!--Main container sec start-->
<div class="mainContainer" ng-controller="FootballpointSystemController" ng-init="pointSystem()" ng-cloak >
    <div class="mt-5">
        <div class="top-header-title pt-4">
            <h1>Fantasy Football Point System</h1>
        </div>

        <div class="pointSystem mt-3">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                    <!-- tabular point system starts -->
                        <div class="transictionOption">
                            <div class="">
                                <h4>Playing Time </h4>    
                                <div class="pointHead">
                                    <ul>
                                        <li>Type Of points</li>
                                        <li>Point</li>
                                    </ul>
                                </div>
                                <div class="pointBody">
                                    <ul ng-repeat="point in points | orderBy:'Sort'" ng-show="point.PointsType == 'Playing Time'" >
                                        <li>{{point.PointsTypeDescprition}}</li>
                                        <li>{{point.PointsValue | number }}</li>
                                    </ul>
                                </div>
                                <h4>Attack </h4>    
                                <div class="pointHead">
                                    <ul>
                                        <li>Type Of points</li>
                                        <li>Point</li>
                                    </ul>
                                </div>
                                <div class="pointBody">
                                    <ul ng-repeat="point in points | orderBy:'Sort'" ng-show="point.PointsType == 'Attack'" >
                                        <li>{{point.PointsTypeDescprition}}</li>
                                        <li>{{point.PointsValue | number }}</li>
                                    </ul>
                                </div>

                                <h4>Defense </h4>    
                                <div class="pointHead">
                                    <ul>
                                        <li>Type Of points</li>
                                        <li>Point</li>
                                    </ul>
                                </div>
                                <div class="pointBody">
                                    <ul ng-repeat="point in points | orderBy:'Sort'" ng-show="point.PointsType == 'Defense'" >
                                        <li>{{point.PointsTypeDescprition}}</li>
                                        <li>{{point.PointsValue | number }}</li>
                                    </ul>
                                </div>

                                <h4>Cards & Other penalties </h4>    
                                <div class="pointHead">
                                    <ul>
                                        <li>Type Of points</li>
                                        <li>Point</li>
                                    </ul>
                                </div>
                                <div class="pointBody">
                                    <ul ng-repeat="point in points | orderBy:'Sort'" ng-show="point.PointsType == 'Cards and Other Penalties'" >
                                        <li>{{point.PointsTypeDescprition}}</li>
                                        <li>{{point.PointsValue | number }}</li>
                                    </ul>
                                </div>

                                <div class="mt-3">
                                    <h4 class="text-left"> Note : </h4>

                                    <ul class="list_point">
                                        <li> The footballer you choose to be your Fantasy <strong> Football Team’s Captain </strong> will receive <strong> {{CaptainPoint |number}} </strong> times the points </li>

                                        <li> The <strong> Vice-Captain </strong> will receive <strong> {{ViceCaptainPoint |number}} </strong> times the points for his performance. </li>

                                        <li> Starting bonus point <strong> {{PlayingXIPoint | number}} </strong> are assigned to any player on the basis of announcement of  playing <strong> 11. </strong></li>

                                        <!-- <li> Man of the Match player will get <strong> {{ManOfMatchPoint |number}}</strong> point extra.</li> -->
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
<!--Main container sec end-->
<?php include('innerFooter.php');?>