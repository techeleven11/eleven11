<!DOCTYPE html>
<html  lang="en"  >
    <head>
        <?php //include('MetaData.php') ?>
        <?php 
            $ServerName = $_SERVER['SERVER_NAME'];
        ?>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" >

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
        <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700" rel="stylesheet">
        <link rel="icon" type="png/jpg" href="../../assets/img/fav1.png"> 

        <link rel="stylesheet" type="text/css" href="../../assets/css/jquery.mCustomScrollbar.css">
        <link href="../../assets/css/slick.css" rel="stylesheet">
        <link href="../../assets/css/slick-theme.css" rel="stylesheet">
        <link href="../../assets/css/custom.css?version=<?= VERSION ?>" rel="stylesheet">
        <link href="../../assets/css/draftcustom.css?version=<?= VERSION ?>" rel="stylesheet">
        <link href="../../assets/css/responsive.css?version=<?= VERSION ?>" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Quicksand:300,400,500,700" rel="stylesheet"> 
        <link rel="stylesheet" href="index_file/custom.css?version=<?= VERSION ?>">
        <?php if($ServerName == 'www.fsl11.com'){ ?>
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-159069138-1"></script>
            <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-159069138-1');
            </script>
        <?php } ?>
        <!-- Facebook Pixel Code -->
        <script>
            !function(f, b, e, v, n, t, s)
            {if (f.fbq)return; n = f.fbq = function(){n.callMethod?
                    n.callMethod.apply(n, arguments):n.queue.push(arguments)};
            if (!f._fbq)f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
            n.queue = []; t = b.createElement(e); t.async = !0;
            t.src = v; s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)}(window, document, 'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2433117410258821');
            fbq('track', 'PageView');</script>

        <script>
            (function() {
            var ta = document.createElement('script'); ta.type = 'text/javascript'; ta.async = true;
            ta.src = document.location.protocol + '//' + 'static.bytedance.com/pixel/sdk.js?sdkid=BNB5DMK0M0F0PKIEGLC0';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(ta, s);
            })();</script>

        <noscript>
    <img height="1" width="1" style="display:none"
         src="https://www.facebook.com/tr?id=2433117410258821&ev=PageView&noscript=1"
         />
    </noscript>
    <?php if($ServerName == 'www.fsl11.com'){ ?>
    <!-- Google Tag Manager -->
    <script>(function(w, d, s, l, i){w[l] = w[l] || []; w[l].push({'gtm.start':
                new Date().getTime(), event:'gtm.js'}); var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer'?'&l=' + l:''; j.async = true; j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-NR3NCVQ');</script>
    <!-- Hotjar Tracking Code for https://www.fsl11.com/ -->
    <?php } ?>
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:1620451,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
    <!-- End Google Tag Manager -->
    <!-- End Facebook Pixel Code -->
</head>

<body >
    <?php if($ServerName == 'www.fsl11.com'){ ?>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NR3NCVQ"
                      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) --> 
    <?php } ?>
    <!--Header sec start-->
    <header class="headerSec {{!isLoggedIn ? 'withoutLogin' : '' }}" id="header" ng-controller="headerController">
        <div class="headerBottom"  ng-if="type != 'mobile'">
            <div class="container-fluid">
                <nav class="navbar navbar-expand-lg" ng-if="!isLoggedIn">
                    <a class="navbar-brand text-white signin_logo" href="javascript:void(0)" ng-if="type != 'mobile'"> 
                        <img src="assets/img/logo.png" alt="logo" ng-if="secondLevelLocation != 'authenticate'" style="position: absolute; left: 0;z-index: 9;"> 
                        <img src="assets/img/logo.png" alt="logo" ng-if="secondLevelLocation == 'authenticate'">
                    </a>

                    <div class="col-lg-12">   <!-- ng-if="secondLevelLocation != 'authenticate'" -->
                        <ul class="nav justify-content-end login_menu d-flex mt-lg-3">
                            <li class="nav-item mr-3"> <a href="download-fantasy-cricket-app" class="join_btn text-dark"> Download App </a></li>

                            <li class="nav-item"><a class="btn bg-white px-4 text-dark login_btn" href="javascript:void(0)" ng-click="goToLogin('login');changeTabLogin('login')"> Login </a></li>
                        </ul>
                    </div>  

                    <button class="navbar-toggler navbar-toggler-right collapsed" type="button" data-toggle="collapse" data-target="#navb">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                </nav>
                <nav class="navbar navbar-expand-lg" ng-if="isLoggedIn" ng-init="getNotifications()">
                    <a class="navbar-brand text-white" href="lobby">
                        <img src="assets/img/logo.png" alt="logo"> 
                    </a>
                    <button class="navbar-toggler navbar-toggler-right collapsed" type="button" data-toggle="collapse" data-target="#navb">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="navbar-collapse collapse" id="navb">
                        <ul class="navbar-nav rightNav" >               
                            <li class="nav-item wallet_icon"> 
                                <a href="myAccount" data-toggle="tooltip" title="Click to view wallet"><img src="assets/img/wallet.svg" alt="wallet"/></a>
                                <a href="myAccount" data-toggle="tooltip" title="Click to view wallet"><img src="assets/img/wallet-yello.svg" alt="wallet"></a>
                            </li>
                            <li class="nav-item notification">
                                <a href="#" class="dropdown-toggle" data-toggle="collapse" data-target="#select_all">
                                    <i class="fa fa-bell" aria-hidden="true"> </i>
                                    <span class="badge" ng-if="notificationCount > 0">{{notificationCount}}</span>
                                </a>
                                <div class="dropdown-menu" id="select_all">
                                    <h4>Notifications Center </h4>
                                    <div class="select_check" ng-if="notificationList.length > 0">
                                        <p> <input type="checkbox" ng-click="selectAllNotification(notificationSelect.selectAll)" ng-model="notificationSelect.selectAll"  id="removeAllNoti" name="removeAll"> Select All </p>
                                        <a href="javascript:;" ng-click="checkNotificationDeletionCount()">
                                            <i class="fa fa-trash"></i>
                                        </a>
                                    </div>
                                    <ul>
                                        <li ng-repeat="notifications in notificationList" ng-if="notificationList.length > 0">
                                            <div style="width: 80%;" class="cursor_pointer" ng-click="readNotification(notifications.NotificationID, notifications.RefrenceID)">
                                                <span>{{notifications.NotificationText}}</span>
                                                <span>{{notifications.NotificationMessage}}</span>
                                            </div>
                                            <span class="">{{notifications.EntryDate| myDateFormat}}</span>

                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="check" ng-model="notifications.isChecked" name="notification">
                                            </div>
                                        </li>
                                        <li ng-if="notificationList.length == 0"> No unread notification. </li>
                                    </ul>
                                </div>
                            </li>

                            <li class="dropdown accountDrop bdr d-flex">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <i class="fa fa-question" aria-hidden="true"  style="font-size: 25px; margin-top: -3px;"></i></a>
                                <div class="dropdown-menu helpCenter">
                                    <h4 class="dropdown_title"> Help center  </h4>
                                    <ul>
                                        <li><a href="../../AboutUs"> About Us  </a></li>
                                        <li><a href="contactUs"> Contact Us  </a></li>
                                        <li><a href="Faq">FAQs  </a></li>
                                        <li><a href="Legalities">Legality  </a></li>
                                        <li><a href="PointSystem">Point System  </a></li>
                                        <li><a href="privacyPolicy">Privacy Policy  </a></li>
                                        <li><a href="TermConditions">Term & Conditions  </a></li>
                                    </ul>
                                </div>
                            </li>

                            <li class="dropdown accountDrop mr-2">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <cite><img ng-src="{{profileDetails.ProfilePic}}" alt="profile" style="width: 40px;"></cite> <!--<span>{{profileDetails.FirstName}}</span>--></a>
                                <div class="dropdown-menu">
                                    <div class="profile-header px-3 border-bottom">
                                        <div class="row">
                                            <h4 class="dropdown_title"> User settings </h4> 
                                            <ul class="col-md-12 border-bottom px-3 pb-2">
                                                <li> <span> BALANCE </span> : {{moneyFormat(profileDetails.TotalCash)}} </li>
                                            </ul>

                                            <div class="d-flex w-100 pt-2 pb-2">
                                                <div class="col-md-6 border-right"><a  href="javascript:void(0)" ng-click="openPopup('add_money');"> <i class="fa fa-money" aria-hidden="true"></i> Add Cash </a></div>
                                                <div class="col-md-6"><a href="javascript:void(0)" ng-click="openPopup('withdrawPopup')"><i class="fa fa-credit-card" aria-hidden="true"></i> Withdraw </a></div>
                                            </div>
                                        </div>    
                                    </div>
                                    <ul class="userSettings">
                                        <li><a href="profile"> <i class="fa fa-fw fa-user"></i> Profile</a></li>
                                        <li><a href="myAccount"><i class="fa fa-user-circle"></i> My Account</a></li>
                                        <li><a href="changePassword"><i class="fa fa-user-circle"></i> Change Password</a></li>
                                        <li><a href="settings"><i class="fa fa-fw fa-gear"></i> Verify Accounts</a></li>
                                        <li> <a href="Coupons"> <i class="fa fa-shopping-basket"></i> Offers 
                                            </a></li>

                                        <li> <a href="referAndEarn"> <i class="fa fa-money"></i> Refer &amp; Earn </a></li> 

                                        <li><a href="javascript:void(0)" ng-click="logout()"><i class="fa fa-fw fa-power-off"></i> Log Out</a></li>
                                    </ul>
                                </div>
                            </li>

                            <li class="nav-item  text-right">
                                <b style="color:#12c451;"> {{moneyFormat(profileDetails.TotalCash)}} </b>
                                <p style="text-align: right;"> BALANCE </p>
                            </li>
                            <li>
                                <button type="button" class="btnTrans btn bggreen" ng-click="openPopup('add_money');" data-toggle="tooltip" title="Click to Add Cash"> Add Funds </button>
                            </li>
                        </ul>
                        <ul class="navbar-nav mr-auto mt-2">
                            <li class="nav-item {{headerActiveMenu=='lobbyCricket' ? 'active' : '' }}">
                                <a class="nav-link" href="javascript:void(0)" ng-click="gameTypeSelection('Cricket')"> Cricket  </a>
                            </li>
                            <li class="nav-item {{headerActiveMenu=='lobbyFootball' ? 'active' : '' }}">
                                <a class="nav-link" href="javascript:void(0)" ng-click="gameTypeSelection('Football')"> Football  </a>
                            </li>
                             <li class="nav-item {{headerActiveMenu=='auction' ? 'active' : '' }}  ">
                                 <a class="nav-link" href="auction"> Auction </a>
                             </li>
                             <li class="nav-item {{headerActiveMenu=='snakeDraft' ? 'active' : '' }}  ">
                                 <a class="nav-link" href="snakeDraft"> Gully Fantasy </a>
                             </li> 
                            <!-- <li class="nav-item {{headerActiveMenu=='leagueCenter' ? 'active' : '' }} ">
                                <a class="nav-link" href="leagueCenter">  My League </a>
                            </li> -->
                            <li class="nav-item dropdown accountDrop">
                                <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown"> My League </a>
                                <div class="dropdown-menu">
                                    <ul>
                                        <li class="{{headerActiveMenu=='leagueCenter' ? 'active' : '' }} "><a href="leagueCenter" > DFS </a></li>
                                         <li class="{{headerActiveMenu=='auctionLeagueCenter' ? 'active' : '' }}"><a href="auctionLeagueCenter"> Auction </a></li>
                                         <li class="{{headerActiveMenu=='draftLeagueCenter' ? 'active' : '' }}"><a href="draftLeagueCenter"> Gully Fantasy </a></li> 
                                    </ul>
                                </div>
                            </li>
                            <!--                                 <li class="nav-item {{headerActiveMenu=='referAndEarn' ? 'active' : '' }}  ">
                                                                <a class="nav-link" href="referAndEarn"> Refer &amp; Earn </a>
                                                            </li> -->
                            <!-- <li class="nav-item {{headerActiveMenu=='draftLeagueCenter' ? 'active' : '' }}  ">
                                <a class="nav-link" href="draftLeagueCenter"> Draft League </a>
                            </li> -->

                            <!--                                 <li class="nav-item {{headerActiveMenu=='Coupons' ? 'active' : '' }}  ">
                                                                <a class="nav-link" href="Coupons"> Coupons </a>
                                                            </li> -->
                            <!-- <li class="nav-item {{headerActiveMenu=='GamesType' ? 'active' : '' }}  ">

                                <select ng-model="GamesType" name="GamesType" ng-change="gameTypeSelection(GamesType)" class="select_drop selectpicker">
                                    <option value="Cricket">Cricket</option>
                                    <option value="Football">Football</option>
                                </select>

                            </li> -->
                        </ul>
                    </div>
                </nav>
                <div class="onlyMobileMenu " ng-if="isLoggedIn" >
                    <ul class="navbar-nav rightNav" >

                        <li class="nav-item wallet_icon"> 
                            <a href="myAccount"><img src="assets/img/wallet.svg" alt="wallet"/></a>
                            <a href="myAccount"><img src="assets/img/wallet-yello.svg" alt="wallet"></a>
                        </li>
                        <li class="nav-item">
                            <span class="mr-2">&#8377;</span> <b style="color:#12c451;"> {{profileDetails.TotalCash}}</b>

                            <button type="button" class="btnTrans btn" ng-click="openPopup('add_money');">+</button>
                        </li>

                        <li class="nav-item notification">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-bell" aria-hidden="true"> </i>
                                <span class="badge" ng-if="notificationCount > 0">{{notificationCount}}</span>
                            </a>
                            <div class="dropdown-menu">
                                <h4> Notifications Center </h4>
                                <ul>
                                    <li class="cursor_pointer" ng-repeat="notifications in notificationList" ng-click="(notifications.StatusID == 1)?readNotification(notifications.NotificationID, notifications.RefrenceID):''">
                                        <p>{{notifications.NotificationText}}</p>
                                        <p class="text-dark">{{notifications.NotificationMessage}}</p>
                                        <span>{{notifications.EntryDate| myDateFormat}}</span>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
    <!--Header sec end-->

