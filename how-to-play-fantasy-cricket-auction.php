<?php
include('header.php');
?>

<div class="mainContainer">
    <div class="howto-playSec auction-howto-playSec">     
        <div class="howto-play-banner" style="background-image: url('assets/images/howtoplayBanner/auction.jpg');">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="how text-white text-center">
                            <!-- <h1 class="text-uppercase"> How to Play Auction ? </h1> -->
                            <h1 style="padding-top:65px" > How to Play Fantasy Cricket Auction ? </h1>
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
                        <p class="pt-2"> Take up FSL11 Series Challange with a twist of fantasy auction. FSL11 is giving you feel of auction on every series that is being played.</p>
                        <p class="pt-1">Grab the opportunity to create your favourite team by bidding highest on your choice of players once bought will not be available for other players to pick on the squad.</p>
                        <p class="pt-1">The Fantasy cricket apps are bringing every aspect of cricket right into your room with the fantasy side to it. Now, cricket auction is the latest addition to it. You can experience the feel of the auction in the different series that are taking place now. </p>
                    </div>
                    <!-- <div class="col-md-6 col-xs-12 text-center mt-4 mt-md-0">
                        <a class="howto-play_video_img" data-toggle="modal" data-target="#howto-play_video">
                            <img src="assets/img/howto-play_video_img.jpg" class="img-fluid">
                            <div class="imgBox">
                                <img src="assets/img/howto-play_video_icon.png" class="img-fluid">
                                <span class="ripple"> </span>
                            </div>
                        </a>
                    </div> -->

                    <!-- <div class="modal howto-play_video" id="howto-play_video">
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
                    </div> -->
                </div>
            </div>
        </div>

        <div class="howto-play-details py-5">
            <div class="container">
                <div class="row">
                    <div class="col-12 text-center">
                        <h2><img src="../../assets/img/fantasy-Cricket.png" alt="cricket" style="width:45px; margin-top:-13px"> How to play Fantasy Cricket Auction in 6 simple steps</h2>
                        <!-- <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" href="#cricket" role="tab" data-toggle="tab">
                                    <p><span><img src="assets/img/cricket.png" width="27"></span></p> Cricket </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#football" role="tab" data-toggle="tab">
                                    <p><span><img src="assets/img/football.png" width="27"></span></p> Football </a>
                            </li>
                        </ul> -->
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
                                        <img src="assets/img/pick-a-series.png" alt="">
                                    </div>
                                    <div class="col-lg-8 offset-lg-4 col-md-9 offset-md-3 py-5 steps text-center">
                                        <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-none d-md-block">
                                            <img src="assets/img/pick-a-series.png" alt="">
                                        </div>
                                        <div class="step-count">
                                            <h3>1</h3>
                                        </div>
                                        <div class="px-0 px-md-4 px-lg-5">
                                            <h3> Pick a Series </h3>
                                            <p class="pt-3 text-center">Choose your series: First, you have to choose the series for which you want to bid and choose players.</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="step-2 stepmt-5">
                                    <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-md-none">
                                        <img src="assets/img/pick-time-to-battle.png" alt="">
                                    </div>
                                    <div class="col-lg-8 offset-lg-4 col-md-9 offset-md-3 py-5 steps text-center">
                                        <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-none d-md-block">
                                            <img src="assets/img/pick-time-to-battle.png" alt="">
                                        </div>
                                        <div class="step-count">
                                            <h3>2</h3>
                                        </div>
                                        <div class="px-0 px-md-4 px-lg-5">
                                            <h3>  Pick Time to Battel </h3>
                                            <p class="pt-3 text-center">Select your time: Based on your availability, select the time when you want to play the fantasy cricket auction. </p>
                                            
                                            <!-- <div id="read_more" class="collapse">
                                                <div class="Select-match mt-4">
                                                    <h6 class="text-left"> Step 1: Select a Match </h6>
                                                    <div class="d-flex mt-3">
                                                        <div class="col-4 pl-0 step-images">
                                                            <img src="assets/img/select-a-match.png">
                                                        </div>
                                                        <div class="col-8 pl-0">
                                                            
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
                                        <img src="assets/img/fight-for-your-guy.png" alt="">
                                    </div>
                                    <div class="col-lg-8 offset-lg-4 col-md-9 offset-md-3 py-5 steps text-center">
                                        <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-none d-md-block">
                                            <img src="assets/img/fight-for-your-guy.png" alt="">
                                        </div>
                                        <div class="step-count">
                                            <h3>3</h3>
                                        </div>
                                        <div class="px-0 px-md-4 px-lg-5">
                                            <h3> Fight for your Guy </h3>
                                            <p class="pt-3 text-center">Bid: Fight for your favorite player and get that guy on your team. Fantasy cricket auction gives you an assistant as well, that bids on your behalf when you are away. All you have to do is customize it beforehand. There is also an option to see how much money your competitors have left so that you can strategize properly. After the team is chosen, you need to select your captain and vice-captain and this is important because they earn you 2- and 1.5-times points that of a regular player. </p>

                                            <div id="fightFor_your_guy" class="collapse">
                                                <div class="auctionFeatures mt-3">
                                                    <div class="row">
                                                        <div class="col-md-4 col-sm-12 pr-0 text-left">
                                                            <strong>1. Auction Assistant :</strong>
                                                        </div>
                                                        <div class="col-md-8 offset-md-0 col-sm-11 offset-1 mt-1 mt-md-0">
                                                            <p> Do not miss your players, Create your wishlist before auction starts with your auction assistant.   Even if you are not available to play,your assistant will bid on your behalf in auction. </p>
                                                        </div>
                                                    </div>

                                                    <div class="row mt-3">
                                                        <div class="col-md-4 col-sm-12 pr-0 text-left">
                                                            <strong>2. Auction Screen :</strong>
                                                        </div>
                                                        <div class="col-md-8 offset-md-0 col-sm-11 offset-1 mt-1 mt-md-0">
                                                            <p class="pt-1"><strong>Raise Bid:</strong> This button helps you raise bid on current player </p>

                                                            <p class="pt-1"><strong>Hold:</strong> You can hold the timer based on your available time bank to make a decision to buy the current player for auction. </p>
                                                            <p class="pt-1"><strong>Resume :</strong> Once you have hold the time you can resume back to auction by pressing resume button. </p>
                                                            <p class="pt-1"><strong>Bid History:</strong> Displays the history of bid that has already made on this player by others. </p>
                                                            <p class="pt-1"><strong>Time Left:</strong> Displays time left to make decision to raise the bid for a single player available for auction. </p>
                                                            <p class="pt-1"><strong>Remaining Time Bank:</strong> Displays how much time bank your left with for whole auction. </p>
                                                        </div>
                                                    </div>

                                                    <div class="row mt-3">
                                                        <div class="col-md-4 col-sm-12 pr-0 text-left">
                                                            <strong>3. Auction Leader Board:</strong>
                                                        </div>
                                                        <div class="col-md-8 offset-md-0 col-sm-11 offset-1 mt-1 mt-md-0">
                                                            <p>Watch your Team score through out the series.Screen Displays your ranking and point updates every match. </p>
                                                            <p> Keep your winning streak on ! </p>
                                                        </div>
                                                    </div>

                                                    <div class="row mt-3">
                                                        <div class="col-md-4 col-sm-12 pr-0 text-left">
                                                            <strong>4. Auction Order :</strong>
                                                        </div>
                                                        <div class="col-md-8 offset-md-0 col-sm-11 offset-1 mt-1 mt-md-0">
                                                            <p>Order in which Players are coming for auction can be seen on this screen. </p>
                                                        </div>
                                                    </div>

                                                    <div class="row mt-3">
                                                        <div class="col-md-4 col-sm-12 pr-0 text-left">
                                                            <strong>5. Auction Budget:</strong>
                                                        </div>
                                                        <div class="col-md-8 offset-md-0 col-sm-11 offset-1 mt-1 mt-md-0">
                                                            <p>All your competitors available budget is displayed on this screen so you can plan your strategy to bid ahead in the game. </p>
                                                        </div>
                                                    </div>

                                                    <div class="row mt-3">
                                                        <div class="col-md-4 col-sm-12 pr-0 text-left">
                                                            <strong>6. Auction Squad :</strong>
                                                        </div>
                                                        <div class="col-md-8 offset-md-0 col-sm-11 offset-1 mt-1 mt-md-0">
                                                            <p>List of players bought by you during auction are displayed on this page along with credits in which they are bought. </p>
                                                            </div>
                                                        </div>

                                                        <div class="row mt-3">
                                                            <div class="col-md-4 col-sm-12 pr-0 text-left">
                                                                <strong>7. Auction Submit Team:</strong>
                                                            </div>
                                                            <div class="col-md-8 offset-md-0 col-sm-11 offset-1 mt-1 mt-md-0">
                                                                <p>Once auction is over submit your squad by picking your best 11 from players bought by you during auction. </p>
                                                                <p class="pt-1"> Choose a captain and Vice Captain from your Best 11 Squad & Submit the team to play the series. </p>
                                                                <p class="pt-1"> Captain gets 2x points and Vice Captain gets 1.5x points during the whole series. </p>
                                                            </div>
                                                        </div>
                                                </div>
                                            </div>
                                            <div class="read-more text-left mt-4">
                                                <a class="collapsed" data-toggle="collapse" data-target="#fightFor_your_guy"> </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="step-4 stepmt-5">
                                    <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-md-none">
                                        <img src="assets/img/build-your-team.png" alt="">
                                    </div>
                                    <div class="col-lg-8 offset-lg-4 col-md-9 offset-md-3 py-5 steps text-center">
                                        <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-none d-md-block">
                                            <img src="assets/img/build-your-team.png" alt="">
                                        </div>
                                        <div class="step-count">
                                            <h3>4</h3>
                                        </div>
                                        <div class="px-0 px-md-4 px-lg-5">
                                            <h3>  Build your Team </h3>
                                            <p class="pt-3 text-center">Select your team: From among the players you’ve just bought, choose your team of playing XI.</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="step-5 stepmt-5">
                                    <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-md-none">
                                        <img src="assets/img/let-the-battle.png"  alt="">
                                    </div>
                                    <div class="col-lg-8 offset-lg-4 col-md-9 offset-md-3 py-5 steps text-center">
                                        <div class="col-lg-7 col-md-5 pt-3 bg-yellow text-center d-none d-md-block">
                                            <img src="assets/img/let-the-battle.png"  alt="">
                                        </div>
                                        <div class="step-count">
                                            <h3>5</h3>
                                        </div>
                                        <div class="px-0 px-md-4 px-lg-5">
                                            <h3> Let the Battle begin </h3>
                                            <p class="pt-3 text-center">Sit back and enjoy: Enjoy the real game on television as your players keep accumulating points for you in fantasy cricket auction.</p>
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
                                            <p class="pt-3 text-center">Withdraw: You can easily withdraw your winnings. Just a one-time verification is needed. </p>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- <div role="tabpanel" class="tab-pane fade" id="football">Football</div> -->
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</div>
    
<?php include('footerHome.php'); ?>