<?php
include('header.php');
?>


<div class="mainContainer" ng-controller="contactController" ng-cloak>
    <div class="howto-playSec">    	
        <div class="howto-play-banner" style="background-image: url('assets/images/howtoplayBanner/cricketfantasy.jpg');">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="how text-white text-center">
                            <h1 class="text-uppercase" style="padding-top:65px"> How to Play Fantasy Cricket? </h1>
                            <p class="pt-2"> Your FSL11 quick assist to start your fantasy sports journey of becoming a champion </p>

                            
                            <form name="sendLinkForm" ng-submit="SendLink(sendLinkForm)" novalidate="" 
                                class="download_form news_letter_form">
                            <div class="mobileLink" style="padding-top:11px">
                                    <input id="mobileNumber" type="tel" class="" name="phoneNumber" ng-model="info.PhoneNumber" ng-required="true" placeholder="+91 | Mobile Number">
                                    <span ng-show="downloadFormSubmitted && sendLinkForm.phoneNumber.$error.required" class="form-error d-block text-danger">
                                        *Phone number is required.
                                    </span>
                                    <a class="send-link_dn ml-2" href="javascript:void(0)">
                                        <button>GET APP LINK</button>
                                    </a>
                                    <div id="AppLinkCaptchaEnabled" style="position: absolute; top: 20px; right: -70px;"></div>
                                    </br> 
                                </div>
                                </form>
                                 

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="introduction py-3 py-md-5">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 mt-lg-5">
                        <h4 class="text-uppercase" style="text-align:center"><img src="../../assets/img/fantasy-Cricket.png" alt="cricket" style="width:45px; margin-top:-12px"> Quick Tip </h4>
                        <p class="pt-2" style="text-align:justify"> Watch the FSL11 Introductory video to get brief about the playing pattern of the platform. To become a champion, the passion to master the skill is required. This page helps you get quick tips about everything from creating a team to winning a contest and puts you ahead in the game. Read and Learn more about how to become FSL11 champion. </p>
                    </div>
                    <div class="col-md-6 col-xs-12 text-center mt-4 mt-md-0">
                        <a class="howto-play_video_img" data-toggle="modal" data-target="#howto-play_video">
                            <img src="assets/img/howto-play_video_img.jpg" class="img-fluid" style="width:85%">
                            <div class="imgBox">
                                <img src="assets/img/howto-play_video_icon.png" class="img-fluid">
                                <span class="ripple"> </span>
                            </div>
                        </a>
                    </div>

                    <div class="modal howto-play_video" id="howto-play_video">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    <div class="videoBox">
                                        <iframe width="100%" height="280" src="https://www.youtube.com/embed/dzDnlvU1eTk?rel=0" frameborder="0" allow="autoplay"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="howto-play-details py-5">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <ul class="nav nav-tabs" role="tablist">
<!--                             <li class="nav-item">
                                <a class="nav-link active" href="#cricket" role="tab" data-toggle="tab">
                                    <p><span><img src="assets/img/cricket.png" width="27"></span></p> Cricket </a>
                            </li> -->
<!--                             <li class="nav-item">
                                <a class="nav-link" href="#football" role="tab" data-toggle="tab">
                                    <p><span><img src="assets/img/football.png" width="27"></span></p> Football </a>
                            </li> -->
                        </ul>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="row">
                    <div class="col-md-12 mt-3">
                        <div class="tab-content mt-4">
                            <div role="tabpanel" class="cricketSec tab-pane fade in active show" id="cricket">
                                <div class="step-1">
                                    <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-md-none">
                                        <img src="assets/img/step_1_img.png" alt="">
                                    </div>
                                    <div class="col-lg-8 offset-lg-4 col-md-9 offset-md-3 py-5 steps text-center">
                                        <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-none d-md-block">
                                            <img src="assets/img/step_1_img.png" alt="">
                                        </div>
                                         <div class="step-count">
                                            <h3>1</h3>
                                        </div>
                                        <div class="px-0 px-md-4 px-lg-5">
                                            <h3> Pick A Match </h3>
                                            <p class="pt-3"> Pick any of the upcoming matches from any of the current or upcoming cricket series of your choice. </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="step-2 stepmt-5">
                                    <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-md-none">
                                        <img src="assets/img/step_2_img.png" alt="">
                                    </div>
                                    <div class="col-lg-8 offset-lg-4 col-md-9 offset-md-3 py-5 steps text-center">
                                        <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-none d-md-block">
                                            <img src="assets/img/step_2_img.png" alt="">
                                        </div>
                                        <div class="step-count">
                                            <h3>2</h3>
                                        </div>
                                        <div class="px-0 px-md-4 px-lg-5">
                                            <h3> Make Your Team </h3>
                                            <p class="pt-3"> Use your sports keeda and showcase your skills to create your <strong>FSL11 team</strong> within a budget of <strong>100 credits</strong>. Choose the group of your favorite players and create your ideal team. You also have option to create multiple teams. </p>
                                            
                                            <div id="read_more" class="collapse">
                                                <div class="Select-match mt-4">
                                                    <h6 class="text-left"> Step 1: Select a Match </h6>
                                                    <div class="d-flex mt-3">
                                                        <div class="col-4 pl-0 step-images">
                                                            <img src="assets/img/select-match.png">
                                                        </div>
                                                        <div class="col-8 pl-0">
                                                            <p> Select any upcoming match from the list of ongoing and upcoming cricket series and click on the <strong>‘Create Team’</strong> button. </p>
                                                            <p class="pt-2"> Create your <strong>FSL11 team</strong> by picking 11 players as per the following combinations within a budget of <strong>100 credits</strong>. </p>
                                                            <div class="table mt-3">
                                                                <table class="table-striped">
                                                                    <thead>
                                                                        <tr>
                                                                            <th> Player Type </th>
                                                                            <th> Minimum </th>
                                                                            <th> Maximum </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <th class="text-center"> WK </th>
                                                                            <td> 1 </td>
                                                                            <td> 4 </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th class="text-center"> Bat </th>
                                                                            <td> 3 </td>
                                                                            <td> 3 </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th class="text-center"> AR </th>
                                                                            <td> 1 </td>
                                                                            <td> 4 </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th class="text-center"> Bowl </th>
                                                                            <td> 3 </td>
                                                                            <td> 3 </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="create-team mt-4">
                                                    <h6 class="text-left"> Step 2: Create Your Team </h6>
                                                    <div class="d-flex mt-3">
                                                        <div class="col-4 pl-0 step-images">
                                                            <img src="assets/img/create-your-team.jpg">
                                                        </div>
                                                        <div class="col-8 pl-0">
                                                            <p><strong>A.</strong> Select players for your <strong>FSL11 team</strong> from all 4 of the categories mentioned below: </p>
                                                            <div class="table mt-3">
                                                                <table class="table-striped">
                                                                    <tbody>
                                                                        <tr>
                                                                            <th> Wk </th>
                                                                            <td> Wicket-Keeper </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th> Bat </th>
                                                                            <td> Batsman </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th> AR </th>
                                                                            <td> All-Rounder </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th> Bowl </th>
                                                                            <td> Bowlers </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <p><strong>B.</strong> Check player perfomance stats by clicking on the player image. </p>
                                                            <p class="pt-1"><strong>C.</strong> Sort players as per their teams, credits or points. </p>
                                                            <p class="py-2"><strong>D.</strong> Keep an eye on: </p>
                                                            <ol class="ml-4 text-left">
                                                                <li><strong>1.</strong> Number of players added to your team. </li>
                                                                <li> <strong>2.</strong> Sort players as per their teams, credits or points. </li>
                                                                <li><strong>3.</strong> The deadline for team submission. Make sure you submit your team before the match deadline. </li>
                                                            </ol>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="select-captain mt-4">
                                                    <h6 class="text-left"> Step 3: Select your FSL11 team’s Captain & Vice Captain </h6>
                                                    <div class="d-flex mt-3">
                                                        <div class="col-4 pl-0 step-images">
                                                            <img src="assets/img/select-captain.jpg">
                                                        </div>
                                                        <div class="col-8 pl-0">
                                                            <p> After creating your <strong>FSL11 team</strong>, choose a Captain & Vice Captain for the team. </p>
                                                            <p class="pt-2"><strong>Captain -</strong> Gets <strong>2x points</strong> scored by him in the actual game </p>
                                                            <p class="pt-2"><strong>Vice Captain -</strong> Gets <strong>1.5x points</strong> scored by him in the actual game  </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="create-multi-teams mt-4">
                                                    <h6 class="text-left"> Step 4: Creating multiple teams </h6>
                                                    <div class="d-flex mt-3">
                                                        <div class="col-4 pl-0 step-images">
                                                            <img src="assets/img/create-multi-teams.jpg">
                                                        </div>
                                                        <div class="col-8 pl-0">
                                                            <p> You can create upto <strong>6 teams</strong> per match and choose to join a contests with any of the teams created! </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="read-more text-left mt-4">
                                                <a class="collapsed" data-toggle="collapse" data-target="#read_more"> </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="step-3 stepmt-5">
                                    <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-md-none">
                                        <img src="assets/img/step_3_img.png" alt="">
                                    </div>
                                    <div class="col-lg-8 offset-lg-4 col-md-9 offset-md-3 py-5 steps text-center">
                                        <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-none d-md-block">
                                            <img src="assets/img/step_3_img.png" alt="">
                                        </div>
                                        <div class="step-count">
                                            <h3>3</h3>
                                        </div>
                                        <div class="px-0 px-md-4 px-lg-5">
                                            <h3> Join A Contest </h3>
                                            <p class="pt-3"> Join any <strong>FSL11</strong> free or cash contest to win cash and grab the rights to showoff your rank in the ultimate skilled gaming contest on <strong>FSL11!</strong> You can also create your own private contest among your buddies and play. </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="step-4 stepmt-5">
                                    <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-md-none">
                                        <img src="assets/img/step_4_img.png" alt="">
                                    </div>
                                    <div class="col-lg-8 offset-lg-4 col-md-9 offset-md-3 py-5 steps text-center">
                                        <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-none d-md-block">
                                            <img src="assets/img/step_4_img.png" alt="">
                                        </div>
                                        <div class="step-count">
                                            <h3>4</h3>
                                        </div>
                                        <div class="px-0 px-md-4 px-lg-5">
                                            <h3> Manage Your Team </h3>
                                            <p class="pt-3"> You can make as many changes to your <strong>FSL11 teams</strong> as you like until the deadline of that match!</p>
                                            <p class="pt-2">You can also change your Captain or Vice Captain before the deadline of the match. Select the <strong>“Edit Team”</strong> button to make changes to your team. </p>
                                            <p class="pt-2"> Make sure you keep an eye on which of your players are playing the match and keep your team updated at all times. </p>
                                            <p class="pt-2"> You can make decision on players once playing11 is announced to make sure you have the perfect 11 in your team. </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="step-5 stepmt-5">
                                    <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-md-none">
                                        <img src="assets/img/step_5_img.png" alt="">
                                    </div>
                                    <div class="col-lg-8 offset-lg-4 col-md-9 offset-md-3 py-5 steps text-center">
                                        <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-none d-md-block">
                                            <img src="assets/img/step_5_img.png" alt="">
                                        </div>
                                        <div class="step-count">
                                            <h3>5</h3>
                                        </div>
                                        <div class="px-0 px-md-4 px-lg-5">
                                            <h3> Follow the Match </h3>
                                            <p class="pt-3"> Watch the real match in action and track your fantasy point scorecard to know your real time position or rank in the game. </p>

                                            <div id="read_more2" class="collapse">
                                                <div class="remember-points">
                                                    <h6 class="text-left mt-3">Points to remember:</h6>
                                                    <div class="">
                                                        <p class="pt-2"><strong>A.</strong> The cricketer you choose to be your Fantasy Cricket Team’s Captain will receive <strong>2</strong> times the points. </p>
                                                        <p class="pt-2"><strong>B.</strong> The Vice-Captain will receive <strong>1.5</strong> timesthe points for his performance. </p>
                                                        <p class="pt-2"><strong>C.</strong> Strike rate scoring is applicable only for strike rate below <strong>70 runs</strong> per <strong>100 balls</strong>. </p>
                                                        <p class="pt-2"><strong>D.</strong> In case of run-outs involving 3 or more players from the fielding side, points will be awarded only to the last 2 players involved in the run-out. </p>
                                                        <p class="pt-2"><strong>E.</strong> Substitutes on the field will not be awarded points for any contribution they make. However, 'Concussion Substitutes'. </p>
                                                        <p class="pt-1"> (if permitted as per the applicable rules and regulations of the tournament) will be awarded points for any contributions they make in a match where they make an appearance as a 'Concussion Substitute'. It is clarified that Concussion Substitutes will be awarded only two (2) points for making an appearance (other than the points awarded for their sporting contributions) in a match as opposed to the four (4) points which are awarded to a player who is named in the starting eleven of a particular match. </p>
                                                        <p class="pt-2"><strong>F.</strong> In case of any transfer of a real-life player in the intervening period between scheduled updates, such transfer shall not be reflected in the roster of players until the next scheduled update. Please note that while the transferred player will be available for selection in the transferred team's roster of players in a Contest during the intervening period, no points will be attributed to such transferred player in the course of such contest. </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="read-more text-left mt-4">
                                                <a class="collapsed" data-toggle="collapse" data-target="#read_more2"> </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="step-6 stepmt-5">
                                    <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-md-none">
                                        <img src="assets/img/step-6_img.png" alt="">
                                    </div>
                                    <div class="col-lg-8 offset-lg-4 col-md-9 offset-md-3 py-5 steps text-center">
                                        <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-none d-md-block">
                                            <img src="assets/img/step-6_img.png" alt="">
                                        </div>
                                        <div class="step-count">
                                            <h3>6</h3>
                                        </div>
                                        <div class="px-0 px-md-4 px-lg-5">
                                            <h3> Withdraw your Winnings </h3>
                                            <p class="pt-3"> Win the prizes for highest scoring line up & Withdraw your winnings from your<strong> FSL11</strong> verified account instantly. </p>
                                           <br/>
                                            <p> (One time verification is required.) </p>

                                            <div id="read_more3" class="collapse">
                                                <div class="winnings">
                                                    <div class="mt-3">
                                                        <p> You can view, withdraw or deposit money into your <strong>FSL11 account</strong> anytime by going to the <span class="d-md-none">My Account</span> <a class="d-none d-md-inline-block" href="{{(isLoggedIn)?'myAccount':'authenticate'}}" ng-click="goToLogin('login')">My Account</a> link. </p>
                                                        <p class="pt-2"> You will need to go through a One Time Account Verification process before you withdraw any money from your <strong>FSL11</strong> account. Don’t worry – this process wont take time and will not be repeated unless you change any of your details. </p>
                                                        <p class="pt-2"> Money in your <strong>FSL11</strong> account is divided into 3 categories: </p>
                                                        <p class="pt-2"> Unutilized: If you have deposited any amount but have not yet joined any league using this amount, it will be categorized as Unutilized in your <strong>FSL11</strong> account </p>
                                                        <p class="pt-2"> Winnings: The amount of money earned as <strong>“winnings”</strong> through any cash leagues joined. No processing fees will be deducted if you wish to withdraw any amount from your Winnings! </p>
                                                        <p class="pt-2"> Cash Bonus: It’s on us! This is a bonus amount given by <strong>FSL11</strong> to you. This amount cannot be withdrawn, however it can be used to join any public cash leagues and win more cash! This cash bonus comes with an expiry date so make full use of this freebie and get started! </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="read-more text-left mt-4">
                                                <a class="collapsed" data-toggle="collapse" data-target="#read_more3"> </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
<!-- 
                            <div role="tabpanel" class="tab-pane fade" id="football">
                                <h6 class="text-center"> Coming Soon </h6>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    
<?php include('footerHome.php'); ?>