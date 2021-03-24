<!DOCTYPE html>
<?php 

const VERSION = 4.4;
?>
<html lang="en" data-ng-app="FSL11" ng-cloak >
    <head>
        <title>Play Daily Fantasy Cricket League Online & Win Cash Daily-FSL11</title>
        <meta charset="utf-8">
        <meta name="description" content="Play fantasy cricket league online with india's most favourite sports platfarm FSL11 and Win Cash prize daily in our contest.Download the fantasy cricket app and get Rs. 100">
        <meta name="keywords" content="play fantasy cricket and win cash daily, play fantasy cricket and win real cash, play cricket and win cash prize daily, play fantasy cricket, play cricket and win cash prizes,fantasy cricket app, daily fantasy cricket app, Fantasy Cricket, Fantasy Cricket Website, Fantasy Cricket sports, Fantasy Cricket League,Fantasy Sports,Online Fantasy Games,Cricket Fantasy Team,Fantasy Gaming, Online Cricket,Cricket Betting Tips,Fantasy Cricket World Cup 2019, ICC Cricket World Cup Fantasy League">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Quicksand:300,400,500,700" rel="stylesheet">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.css">
        <link rel="icon" type="png/jpg" href="assets/img/fav1.png" alt="Fantasy Sports League-FSL11 Logo"> 
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
        <link href="assets/css/custom.css?version=<?= VERSION ?>" rel="stylesheet">
        <link href="assets/css/draftcustom.css?version=<?= VERSION ?>" rel="stylesheet">
        <link rel="stylesheet" href="index_file/custom.css?version=<?= VERSION ?>">
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-138966359-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-138966359-1');
        </script>
    </head>
    <body ng-controller="HomeController" ng-init="getMatches();getTestimonials();" ng-cloak>
   
    <div class="bg_Img">
        <nav class="navbar navbar-expand-lg  site_header">
            <div class="container d-block">
                <div class="row align-items-center">
                    <div class="col-sm-4 col-5">
                        <a href="index" class="site-logo navbar-brand"><img src="index_file/images/logo.png" alt="Fantasy Sports League-FSL11 Logo" width="150"></a>
                    </div>
                    <!-- <div class="col-sm-8 col-7">
                        <ul class="nav justify-content-end login_menu d-flex"> -->
                            <!-- <li class="nav-item"><a class="nav-link" href="index">Login </a></li>
                            <li class="nav-item"><a class="nav-link" href="index">Signup</a></li> -->
                            <!-- <li class="nav-item"><a class="nav-link" href="authenticate?type=login"><button type="button" class="btn text-white px-4"> Login </button></a></li>
                            <li class="nav-item"><a class="nav-link" href="authenticate?type=signup"><button type="button" class="btn text-white px-4"> Sign Up </button></a></li>
                        </ul>
                    </div> -->
                </div>
            </div>
        </nav>
        <section class="home_banner">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-8">
                        <div class="banner_content">
                            <div class="swiper-container banner__slider">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide">
                                        <h1 class="mb-2 mb-sm-4 ">INDIA’S MOST FAVOURITE <br> FANTASY SPORTS GAME PLATFORM!</h1>
                                        <p> FSL11 is more than just a Fantasy Sport. It’s the best way to watch the games, create your teams, win real cash, and bring the action right into your living room. </p>
                                        <!-- <a href="#download_app" onclick="window.open('#download_app','_self')" class="btn btnPrimary mb-4"> Get The App </a> -->
                                        <!-- <a href="download-app" class="btn btnPrimary mb-4"> Get The App </a> -->
                                    </div>
                                </div>
                                <!-- Add Pagination -->
                                <div class="swiper-pagination"></div>
                            </div>              
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-4 d-flex justify-content-end mt-3 mt-md-0">
                        <ul class="nav login_menu d-block">
                            <li class="nav-item">
                                <a class="nav-link d-flex justify-content-center" href="authenticate?type=login">
                                    <button type="button" class="btn text-white px-4"> Login </button>
                                </a>
                            </li>
                            <h5 class="text-white text-center">|</h5>
                            <li class="nav-item d-flex justify-content-center">
                                <a class="nav-link" href="authenticate?type=signup">
                                    <button type="button" class="btn text-white px-4"> Sign Up </button>
                                </a>
                            </li>
                            <h5 class="text-white text-center">|</h5>
                            <li class="nav-item d-flex justify-content-center">
                                <a class="nav-link" href="javascript:;">
                                    <button type="button" class="btn text-white px-4"> Blog </button>
                                </a>
                            </li>
                            <h5 class="text-white text-center">|</h5>
                            <li class="nav-item d-flex justify-content-center">
                                <a class="nav-link" href="download-app">
                                <button type="button" class="btn text-white px4"> Get The App </button>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <main class="hero">
        <section class="py-4 lovedByUsers">
            <div class="container">
                <div class="row ">
                    <div class="col-lg-6 col-md-6 mt-4 mt-lg-5">
                        <div class="row align-items-center">
                            <div class="col-sm-6 cont1">
                                <div class="company_info_item mb-3 d-block p-3">
                                    <img src="index_file/images/user.svg" alt="Play with your friends and win cash prize" width="25" class="pb-3">
                                    <div>
                                        <h3> Loved by 10 <br> lacs Users </h3>
                                    </div>
                                </div>
                                <div class="company_info_item mb-3 d-block p-3">
                                    <img src="index_file/images/dice.svg" alt="Choose Your Team With Draft Option" width="25" class="pb-3">
                                    <div>
                                        <h3> Multiple Drafts <br> Available </h3>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 cont2">
                                <div class="company_info_item mb-3 d-block p-3">
                                    <img src="index_file/images/idea.svg" alt="Play Fantasy Cricket-FSL11" width="25" class="pb-3">
                                    <div>
                                        <h3> Unique User <br> Experience </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5 offset-lg-1 col-md-5 offset-md-1 mt-4 mt-lg-0">
                        <div class="img-box">
                            <img src="index_file/images/banner2.png" alt="Play Fantasy Cricket-FSL11" width="400" class="img-fluid">
                        </div>
                        <!-- <div class="img-box">
                          <img src="images/banner2.png" alt="banner" class="img-fluid">
                        </div> -->
                    </div>
                </div>
            </div>
            <div class="dots-img d-none d-lg-flex">
                <img src="index_file/images/dots.png" alt="Online fantasy cricket-FSL11" width="160" class="img-fluid">
            </div>
        </section>
        
        <section class="howToPlaySec py-4">
            <div class="container">
                <div class="row align-items-center justify-content-center">
                    <div class="howToPlay">
                        <h2 class="comman_heading text-uppercase mb-5"> how to play </h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-7 col-md-12">
                        <div class="videoBox">
                            <iframe width="100%" height="350" src="https://www.youtube.com/embed/dzDnlvU1eTk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                        </div>
                    </div>
                    <div class="col-lg-5 col-md-12 mt-4 mt-lg-0">
                        <div class="how pl-0 pl-lg-5">
                            <ol class="step-list">
                                <li>
                                    <span>1</span> <h5>Select a Match</h5> 
                                    <p class="text-muted pt-1">Choose any of the upcoming matches from the match center</p>
                                </li>
                                <li>
                                    <span>2</span> <h5>Create Your Team</h5>
                                    <p class="text-muted pt-1">Choose the group of your favorite players and create your ideal team.</p>
                                </li>
                                <li>
                                    <span>3</span> <h5>Let the game begin</h5>
                                    <p class="text-muted pt-1">Peg your team against others in an existing contest or create a contest of your own.</p>
                                </li>
                                <li>
                                    <span>4</span> <h5>Join Contest</h5>
                                    <p class="text-muted pt-1">A lot of game types available join now</p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-light downloadapp upcomingMatches py-5" id="Download"> <!-- style="background-image:url(assets/img/download-appbg.jpg);" -->
            <div class="container">
                <div class="row align-items-center justify-content-center">
                    <div class="upcoming">
                        <h2 class="comman_heading text-uppercase mb-5"> upcoming matches </h2>
                    </div>
                </div>
                <div class="home-slider">
                    <div class="" slick-custom-carousel ng-if="silder_visible">
                        <div class="slider lobby_page_slider" slick-custom-carousel ng-if="silder_visible" >
                            <div class="" ng-repeat="matches in MatchesList"  >
                                <div class="slider_item ">
                                    <h4> {{matches.SeriesName}} </h4>
                                    <div class="d_flex">
                                        <figure class="mb-0"><img ng-src="{{matches.TeamFlagLocal}}" alt="{{matches.TeamNameShortLocal}}"class="img-fluid" width="60" /></figure>
                                        <div class="timer">
                                            <h4 class="theme_txtclr"><small>{{matches.TeamNameShortLocal}}</small>  VS <small>{{matches.TeamNameShortVisitor}}</small></h4>
                                            <p id="demo" timer-text="{{matches.MatchStartDateTimeUTC}}" timer-data="{{matches.MatchStartDateTimeUTC}}" match-status="{{matches.Status}}" ng-bind-html="clock | trustAsHtml" class="ng-binding"></p>
                                        </div>
                                        <figure class="mb-0"> <img ng-src="{{matches.TeamFlagVisitor}}" alt="{{matches.TeamNameShortVisitor}}" class="img-fluid" width="60"  /> </figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- <section id="howToPlay" class="howToPaySec text-black burger"> style="background-image:url(assets/img/play-bg.jpg);"
            <div class="container">
                <div class="row align-items-end">
                    <div class="col-md-5">
                        <div class="videoBox">
                            <iframe  class="w-100" height="315" src="https://www.youtube.com/embed/dzDnlvU1eTk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                        </div>
                    </div>
                    <div class="col-md-6 offset-md-1">
                        <h4 class="mb-5 comman_heading text-white text-uppercase">Lots of ways to Win</h4>
                        <ul class="list-unstyled ">
                            <li>
                                <span class="icons text-center"><img src="index_file/images/freeGame.svg" alt="Play Free Contest-FSL11" class="img-fluid"></span>
                                <h5 class="text-capitalize text-white">Play Free contest</h5>
                            </li>
                            <li>
                                <span class="icons text-center"><img src="index_file/images/winCash.svg" alt="Win Big Cash Prizes In Public Contest" class="img-fluid"></span>
                                <h5 class="text-capitalize text-white"> Win Big Cash prizes in public contest</h5>
                            </li>
                            <li>
                                <span class="icons text-center"><img src="index_file/images/privat.svg" class="img-fluid pb-3" alt="Play Private Contest And Beat Your Friends"></span>
                                <h5 class="text-capitalize text-white"> Play Private Contest and Beat your friends </h5>
                            </li>
                            <li>
                                <span class="icons text-center"><img src="index_file/images/buildOwnContest.svg" alt="Dont Need To Finish First To Win" class="img-fluid"></span>
                                <h5 class="text-capitalize text-white"> Dont need to finish first to win </h5>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>-->
            
        <section id="howToPlay" class="howToPaySec text-black py-5"> <!--style="background-image:url(assets/img/play-bg.jpg);"-->
            <div class="container">
                <div class="text-center primarHead">
                    <h3 class="mb-5 comman_heading text-uppercase text-white text-center">lots of ways to win</h3>
                </div>
                <div class="row">
                    <div class="col-sm-3 text-center">
                        <span class="icons text-center"><img src="index_file/images/freeGame.svg" alt="Play Free Contest-FSL11" class="img-fluid pb-3"></span>
                        <h5 class="text-capitalize text-white">Play Free contest</h5>
                    </div>
                    <div class="col-sm-3 text-center">
                        <span class="icons text-center"><img src="index_file/images/winCash.svg" alt="Win Big Cash Prizes In Public Contest" class="img-fluid pb-3"></span>
                        <h5 class="text-capitalize text-white"> Win Big Cash prizes in public contest</h5>
                    </div>
                    <div class="col-sm-3 text-center">
                        <span class="icons text-center"><img src="index_file/images/privat.svg" class="img-fluid pb-3" alt="Play Private Contest And Beat Your Friends"></span>
                        <h5 class="text-capitalize text-white"> Play Private Contest and Beat your friends </h5>
                    </div>
                    <div class="col-sm-3 text-center">
                        <span class="icons text-center"><img src="index_file/images/buildOwnContest.svg" alt="Dont Need To Finish First To Win" class="img-fluid pb-3"></span>
                        <h5 class="text-capitalize text-white"> Dont need to finish first to win </h5>
                    </div>
                </div>
            </div>
        </section>
            
        <!-- <section class="getDailyFantasy" id="download_app">
            <div class="container">
                <div class="row py-5">
                    <div class="col-sm-6">
                        <div class="img-box3">
                            <img src="index_file/images/GetDailyFantasy.png" alt="Play Fantasy Sports League & Win Cash Daily-FSL11" class="img-fluid">
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="playStor">
                            <h4 class="text-dark text-uppercase pt-5" style="letter-spacing: 1px; line-height: 30px;"> get daily fantasy sports at <br> your fingertips anytime, anywhere. </h4>
                        </div>
                        <ul class="btns black_downloads mt-4">

                            <li class="mr-1" data-toggle="tooltip" title="Download Now"><a href="https://fsl11.com/android/FSL11.apk" download>
                                    <span class="icon">
                                        <img src="index_file/images/android.svg" alt="android"></span>
                                    <span class="text"><span class="small">FSL11 On</span><span class="big"> Android </span></span></a>
                            </li>

                            <li data-toggle="tooltip" title="Coming Soon"><a href="#">
                                    <span class="icon"><img src="index_file/images/apple.svg" alt="apple"></span>
                                    <span class="text"><span class="small">Download On</span><span class="big"> APPSTORE </span></span></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section> -->

        <section class="bottom-banner-img py-3">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 bottom-banner my-5">
                        <div class="logo-img text-center my-5">
                            <a href="#"><img src="index_file/images/logo.png" alt="Fantasy Sports League-FSL11 Logo" width="150"></a>
                        </div>
                        <div class="freeEntry text-center text-white text-uppercase mb-5">
                            <h3 style="line-height: 40px;"> GET ₹50 BONUS AND FREE ENTRY TO <br> DAILY BONUS CONTEST ON YOUR FIRST LOGIN* </h3>
                        </div>
                        <div class="row justify-content-center">
                            <div class="signup_btn mb-5">
                                <a href="javascript:void(0)" g-login ng-click="SocialLogin('Google')"><button type="button" class="btn-grn text-uppercase mb-3"> Login with Google </button></a>
                                <a href="javascript:void(0)"fb-login ng-click="SocialLogin('Facebook')"><button type="button" class="btn-blu text-uppercase fb"> Login with Facebook  </button></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="clientSec burger bg-light" id="testimonials">
            <div class="container">
                <div class="bdr_lr">
                    <h3> Pro Fantasy Gamers </h3>
                </div>
                <div class="" id="clientSlider" testimonial-slider ng-if="testimonial_silder_visible">
                    <div class="clientslide"ng-repeat="test in Testimonials">
                        <p>{{test.PostContent}} </p>
                        <div class="clientImgbox">
                            <div class="clientImg">
                                <img ng-src="{{test.MediaURL}}" class="img-circle" alt="testimonials" />
                            </div>
                            <h4> {{test.PostCaption}}</h4>
                            <!-- <span> Freelancer </span> -->
                        </div>
                    </div>
                </div>
            </div>
        </section>
          <?php include('footerHome.php');?>
    </main>
</body>

    <script>
        /***** Slick slider Testimonial ***********/

        $(document).ready(function () {

        /*------------------------------- 4.Header sticky -------------------------*/
        // Hide Header on on scroll down
        var NavBar = $('.site_header ');
        var didScroll;
        var lastScrollTop = 0;
        var navbarHeight = NavBar.outerHeight();
        $(window).scroll(function (event) {
            didScroll = true;
        });
        setInterval(function () {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        }, 100);

        function hasScrolled() {
            var st = $(this).scrollTop();
            if (st + $(window).height() < $(document).height()) {
                NavBar.addClass('sticky_header');
                if (st == 0) {
                    NavBar.removeClass('sticky_header');
                }
            }
            lastScrollTop = st;
        }
    });
        /* timer js END */
    </script>
</html>