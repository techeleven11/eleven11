<?php
include('header.php');
?>

<div class="mainContainer" ng-controller="contactController" ng-cloak>
    <div class="howto-playSec auction-howto-playSec">     
        <div class="howto-play-banner" style="background-image: url('assets/images/howtoplayBanner/gullycricket.jpg');">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="how text-white text-center">
                            <!-- <h1 class="text-uppercase" style="padding-top:20px"> How to Play Gully Cricket? </h1> -->
                            <h1 style="padding-top:65px"> How to Play Fantasy Gully Cricket? </h1>
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
                <div class="row align-items-center">
                    <div class="col-lg-2 col-md-3">
                        <h4 class="text-uppercase quickTip"> Quick Tip </h4>
                    </div>
                    <div class="col-lg-10 col-md-9">
                        <p class="pt-1">Cricket is more than a game for Indians, its a part of their life. Almost every kid in the country grown up playing the gully cricket. They may not have good pitches and stadiums to play, but they make every street, roads, gardens, back yards, parks, beaches their playground. </p>

                         <p class="pt-1"> For creating the team in Gully Cricket Captains toss using even odd or flip a coin,and whoever wins gets chance to pick the team mate first. </p>

                         <p class="pt-1"> FSL11 is giving you an opportunity to relive the old game of Gully Cricket with the twist of Fantasy Game.</p>

                         <p class="pt-1"> You get to choose your player turn by turn,Our application will randomly toss for you and provide you numbers (1st or 2nd) which will eventually be your turn. </p>

                         <p class="pt-1"> Wait for your turn to pick your player. Once a player is picked can not be picked by opponent. At the end of Toss every gamer has its unique team combo which fight against each other. </p>

                         <p class="pt-1"> Playing gully fantasy cricket is simple, you just need to follow these steps:  </p>
                               

                    </div>
                </div>
            </div>
        </div>

        <div class="howto-play-details py-5">
            <div class="container">
                <div class="row">
                    <div class="col-12 text-center" style="margin-top:-50px">
                        <h2><img src="../../assets/img/fantasy-Cricket.png" alt="cricket" style="width:45px; margin-top:-13px"> How to play Gully Cricket in 6 simple steps </h2>
                    </div>
                </div>
            </div>


            <div class="container">
                <div class="row">
                    <div class="col-md-12 mt-3 mt-md-5">
                        <div class="tab-content mt-4">
                            <div role="tabpanel" class="cricketSec tab-pane fade in active show" id="cricket">
                                <div class="step-1">
                                    <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-md-none">
                                        <img src="assets/img/gullycricket/step1.png" alt="">
                                    </div>
                                    <div class="col-lg-8 offset-lg-4 col-md-9 offset-md-3 py-5 steps text-center">
                                        <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-none d-md-block">
                                            <img src="assets/img/gullycricket/step1.png" alt="">
                                        </div>
                                        <div class="step-count">
                                            <h3>1</h3>
                                        </div>
                                        <div class="px-0 px-md-4 px-lg-5">
                                            <h5> Pick A Match </h5>
                                            <p class="pt-3">Pick any of the upcoming matches: In the app, you will find many leagues to choose from. </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="step-2 stepmt-5">
                                    <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-md-none">
                                        <img src="assets/img/gullycricket/step2.png" alt="">
                                    </div>
                                    <div class="col-lg-8 offset-lg-4 col-md-9 offset-md-3 py-5 steps text-center">
                                        <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-none d-md-block">
                                            <img src="assets/img/gullycricket/step2.png" alt="">
                                        </div>
                                        <div class="step-count">
                                            <h3>2</h3>
                                        </div>
                                        <div class="px-0 px-md-4 px-lg-5">
                                            <h5> Pick Time to Battel </h5>
                                            <p class="pt-3"> Choose your time: You have to choose your players next. However, you don’t need to do it immediately. You just need to enter into a cash or practice contest and decide a time according to the availability of both when you can choose the players. </p>
                                            
<!--                                             <div id="read_more" class="collapse">
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
                                            </div> -->
                                        </div>
                                    </div>
                                </div>

                                <div class="step-3 stepmt-5">
                                    <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-md-none">
                                        <img src="assets/img/gullycricket/step3.png" alt="">
                                    </div>
                                    <div class="col-lg-8 offset-lg-4 col-md-9 offset-md-3 py-5 steps text-center">
                                        <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-none d-md-block">
                                            <img src="assets/img/gullycricket/step3.png" alt="">
                                        </div>
                                        <div class="step-count">
                                            <h3>3</h3>
                                        </div>
                                        <div class="px-0 px-md-4 px-lg-5">
                                            <h5> Build your Team </h5>
                                            <p class="pt-3">Choose your players: The fantasy gully cricket will toss for you and based on the number that you receive; your friend and you will get the opportunity to choose your players. But here you need to take care of a few conditions as you will have to pick players from 4 categories: Wicket-keeper, Batsman, All-rounder and Bowlers. Another thing to note is that the captain and the vice-captain mostly earn 2 and 1.5 times every other player respectively. Choosing them wisely is, hence, needed. </p>

                                            <p class="pt-1"> Wait for your turn to pick your favourite player. </p>

                                            <div id="read_more" class="collapse">

                                                <div class="create-team mt-4">
                                                   <!--  <h6 class="text-left"> Step 2: Create Your Team </h6> -->
                                                    <div class="d-flex mt-3">
         <!--                                                <div class="col-4 pl-0 step-images">
                                                            <img src="assets/img/create-your-team.jpg">
                                                        </div> -->
                                                        <div class="col-12 pl-0">
                                                            <p class="pt-1"> Pick players for your <strong> FSL11 </strong> team from all <strong> 4 </strong> of the categories mentioned below: </p>
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
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="Select-match mt-4">
                                                    <!-- <h6 class="text-left"> Step 1: Select a Match </h6> -->
                                                    <div class="d-flex mt-3">
      <!--                                                   <div class="col-4 pl-0 step-images">
                                                            <img src="assets/img/select-match.png">
                                                        </div> -->
                                                        <div class="col-12 pl-0">
                                                            <p> Create your <strong> FSL11 </strong> team by picking <strong> 11 players </strong> on your team on your turn as per the following combinations. </p>

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

                                                <div class="select-captain mt-4">
                                                  
                                          <!--               <div class="col-4 pl-0 step-images">
                                                            <img src="assets/img/select-captain.jpg">
                                                        </div> -->
                                                        <div class="col-12 pl-0">
                                                            <p> *Gully Cricket Toss Features to select your own team post toss* </p>

                                                            <p class="pt-1"><strong> Player Available :</strong> Total number of players still available for you to pick.</p>

                                                            <p class="pt-1"><strong> Player Picked :</strong> Total number of players you have currently picked on your team. </p>

                                                            <p class="pt-1"><strong> Round :</strong> This will current number of round happening between you and your opponent.</p>

                                                            <p class="pt-1"><strong> Time Left :</strong> Displays time left to make decision to pick a single player available for Toss.</p>

                                                            <p class="pt-1"><strong> Wait for your turn :</strong> Message is displayed on screen when its your opponent turn to pick.</p>

                                                            <p class="pt-1"> It's your turn : Message is displayed on screen when its your turn to pick.</p>
                                
                                                            <p class="pt-1"> Change Player: You can change player on screen to your favourite player when its your turn to pick the squad.</p>

                                                            <p class="pt-1"><strong> Others Sqaud :</strong> Click to view squads of your opponent during the Toss in Play.</p>

                                                            <p class="pt-1"><strong> Your Squad :</strong> Click to view your own squad during the Toss in Play. </p>

                                                        </div>
                                                    </div>
                                                </div>

                                            <div class="read-more text-left mt-4">
                                                <a class="collapsed" data-toggle="collapse" data-target="#read_more"> </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="step-4 stepmt-5">
                                    <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-md-none">
                                        <img src="assets/img/gullycricket/step4.png" alt="">
                                    </div>
                                    <div class="col-lg-8 offset-lg-4 col-md-9 offset-md-3 py-5 steps text-center">
                                        <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-none d-md-block">
                                            <img src="assets/img/gullycricket/step4.png" alt="">
                                        </div>
                                        <div class="step-count">
                                            <h3>4</h3>
                                        </div>
                                        <div class="px-0 px-md-4 px-lg-5">
                                            <h5> Submit your team </h5>
                                           
                                            <p class="pt-3">Don’t forget the deadline: Every match has a deadline for the submission of players. Don’t forget to submit your team before it.</p>

                                            <div id="read_more_submit" class="collapse">
                                                <div class="remember-points">
                                                    <h6 class="text-left mt-3">Points to remember:</h6>
                                                    <div class="">
                                                         <p class="pt-2"><strong> Step 1 :</strong> Create your own favourite squad of <strong> 11 </strong> players with criteria from Players picked by you and submit your team. </p>

                                                        <p class="pt-2"><strong> Step 2 :</strong> 
                                                            <strong>A.</strong> Select your FSL11 team’s Captain & Vice Captain </p>

                                                        <p class="pt-2"><strong> B.</strong> After creating your FSL11 team, choose a Captain & Vice Captain for the team. </p>

                                                        <p class="pt-2"><strong> C.</strong> Captain - Gets 2x points scored by him in the actual game </p>

                                                        <p class="pt-2"><strong> D.</strong> Vice Captain - Gets 1.5x points scored by him in the actual game</p>

                                                        <p class="pt-2"><strong> Step 3 :</strong> Submit your team before deadline </p>

                                                        <p class="pt-2"><strong> Step 4 :</strong> <strong> Edit Your Team : 
                                                        </strong> You can make as many changes to your FSL11 teams as you like until the deadline of that match! You can also change your Captain or Vice Captain before the deadline of the match. Select the  <strong>“Edit Team” </strong> button to make changes to your team. </p>

                                                        <p> Make sure you keep an eye on which of your players are playing the match and keep your team updated at all times. You can make decision on players once playing11 is announced to make sure you have the perfect 11 in your team. </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="read-more text-left mt-4">
                                                <a class="collapsed" data-toggle="collapse" data-target="#read_more_submit"> </a>
                                            </div>
                                           
                                        </div>
                                    </div>
                                </div>

                                <div class="step-5 stepmt-5">
                                    <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-md-none">
                                        <img src="assets/img/gullycricket/step5.png" alt="">
                                    </div>
                                    <div class="col-lg-8 offset-lg-4 col-md-9 offset-md-3 py-5 steps text-center">
                                        <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-none d-md-block">
                                            <img src="assets/img/gullycricket/step5.png" alt="">
                                        </div>
                                        <div class="step-count">
                                            <h3>5</h3>
                                        </div>
                                        <div class="px-0 px-md-4 px-lg-5">
                                            <h5> Let the battle begin </h5>
                                            <p class="pt-3">Sit back and enjoy: As the real-life match begins, keep your eyes glued to the television to see how your players are accumulating points for you.</p>

                                            <div id="read_more2" class="collapse">
                                                <div class="remember-points">
                                                    <h6 class="text-left mt-3">Points to remember:</h6>
                                                    <div class="">
                                                        <p class="pt-2"><strong>A.</strong> The cricketer you choose to be your Fantasy Cricket Team’s Captainwill receive <strong> 2 </strong> times the point </p>

                                                        <p class="pt-2"><strong>B.</strong> The Vice-Captain will receive <strong> 1.5 </strong> timesthe points for his performance </p>

                                                        <p class="pt-2"><strong>C.</strong> Strike rate scoring is applicable only for strike rate below <strong> 70 runs 
                                                        </strong> per <strong> 100 balls. </strong> </p>

                                                        <p class="pt-2"><strong>D.</strong> In case of run-outs involving 2 or more players from the fielding side, points will be awarded only to the last player involved in the run-out. </p>
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
                                            <h5> Withdraw your Winnings </h5>
                                            <p class="pt-3"> Get the money: You can easily withdraw the money you have earned from Gully cricket fantasy. </p>
                                            <p> (One time verification is required.) </p>
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
    
<?php include('footerHome.php'); ?>