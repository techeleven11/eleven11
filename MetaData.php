<?php 
    const VERSION = 4.7;
    header('X-Frame-Options: sameorigin');
    $a = $_SERVER['REQUEST_URI']; 
    $a = str_replace("/eleven11/",'',$a);
    if(strpos($a, '?') !== false){
        $a = substr($a, 0, strpos($a, "?"));
    }
    $data = array_values(array_filter(explode('/',$a)));
    $PathName = '';
    if(count($data) > 0){
        $PathName = $data[count($data)-1];
    }
    $ServerName = $_SERVER['SERVER_NAME'];
    if(count($data) == 1 && $data[0] == 'fantasy-cricket'){
        $path = '../';
    }else if(count($data) >= 2 && $data[0] == 'fantasy-cricket' && $data[1] == 'ipl'){
        $path = '../../';
    }else{
        $path = '';
    }
    switch ($_SERVER['SERVER_NAME']) {
        case 'localhost':
        $base_url = 'http://localhost/eleven11/';
        $api_url = 'http://159.65.147.114/ifl/api/';
        break;
        case '206.189.148.56':
        $base_url = 'http://206.189.148.56/';
        $api_url = 'http://159.65.147.114/ifl/api/';
        break;
        case 'aaa.aaa.com':
        $base_url = 'http://159.65.147.114/ifl/';
        $api_url = 'http://159.65.147.114/ifl/api/';
        break;  
        default :
        $_SERVER['CI_ENV'] = 'production';
        $base_url = 'http://159.65.147.114/ifl/';
        $api_url = 'http://159.65.147.114/ifl/api/';
        break;
    }
?>
<?php if($PathName == ''){ ?>
    <title>Fantasy Cricket App | Play Online & Win Real Cash | Download ELEVEN 11</title>
    <meta name="description" content="Play fantasy cricket online at India's best fantasy cricket app - ELEVEN 11. Download India's No.1 fantasy sports league app, play online, and win cash daily.">
<?php } elseif (strpos($_SERVER["REQUEST_URI"], 'authenticate') !== false && $_GET['type'] == 'signup' && isset($_GET['type'])) { ?>
    <title>Signup and Play Fantasy Cricket To Win Cash Prize Daily | ELEVEN 11</title>
    <meta name="description" content="Play fantasy cricket league Online with ELEVEN 11. Download & register on ELEVEN 11 App. Create your team & win real cash prize!">
<?php } elseif ($PathName =='AboutUs') { ?>
    <title>About Us | Play Fantasy Cricket League Online and Win Cash Prizes at ELEVEN 11</title>
    <meta name="description" content="ELEVEN 11 is India`s fastest growing fantasy sports website, developed for sports fans, in particular for the cricket fans of India.Join ELEVEN 11 and enjoy online cricket">
<?php } elseif ($PathName =='contactUs') { ?>
    <title>Contact Us | India's No.1 Fantasy Cricket Platform</title>
    <meta name="description" content="Need any assistance? Contact us and get support from highly experienced support executives which are available 24*7 to help you">
<?php } elseif ($PathName =='faq') { ?>
    <title>FAQs- Frequently Asked Questions | ELEVEN 11</title>
    <meta name="description" content="Get answers to most of your frequently asked questions about fantasy cricket at ELEVEN 11. Browse through our FAQs section to know more.">
<?php } elseif ($PathName =='Legalities') { ?>
    <title>Legalities- ELEVEN 11</title>
    <meta name="robots" content="noindex" />
    <meta name="description" content="Legalities- ELEVEN 11 offers services related to fantasy cricket leagues including fun features and contests and therefore it is completely legal.">
<?php } elseif ($PathName  == 'PointSystem') { ?>
    <title>Point System for Fantasy Cricket Leagues- ELEVEN 11</title>
    <meta name="description" content="Want to know about our Point System for Fantasy Sports Leagues? Visit and learn how to earn points at ELEVEN 11">
<?php } elseif ($PathName =='privacyPolicy') { ?>
    <title>Privacy Policy- ELEVEN 11</title>
    <meta name="robots" content="noindex" />
    <meta name="description" content="The Privacy Policy of ELEVEN 11.com  describes how we work to maintain that trust and protect that information.">
<?php } elseif ($PathName =='TermConditions') { ?>
    <title>Terms & Condition- ELEVEN 11</title>
    <meta name="robots" content="noindex" />
    <meta name="description" content="By accepting the Terms of Service on the registration page, you consent to provide sensitive personal data or personal information and are aware of the purpose of sharing such information.">
<?php } elseif ($PathName =='download-fantasy-cricket-app') { ?>
    <title>Download Fantasy Cricket App | Play Cricket Online & Win Cash | ELEVEN 11</title>
    <meta name="description" content="Download the best fantasy cricket app - ELEVEN 11, play fantasy cricket online in India, and win real cash every day with exciting joining bonus points.">
<?php } elseif ($PathName =='Disclaimer') { ?>
    <title>Disclaimer- ELEVEN 11</title>
    <meta name="robots" content="noindex" />
    <meta name="description" content="Disclaimer- ELEVEN 11 is not affiliated in any way to and claims no association">
<?php } elseif ($PathName =='how-to-play-fantasy-cricket') { ?>
    <title>How to Play Fantasy Cricket League Online | ELEVEN 11</title>
    <!-- <meta name="robots" content="noindex" /> -->
    <meta name="description" content="Learn how to play real fantasy cricket league online in India at ELEVEN 11. Join the cricket fantasy league, build your team and win real cash prizes.">
<?php } elseif ($PathName =='RefundPolicy') { ?>
    <title> Refund and Cancellation Policy- ELEVEN 11</title>
    <meta name="robots" content="noindex" />
    <meta name="description" content="At ELEVEN 11 we are working with the best banking & gateway partners to payout our users at the earliest possible.">
<?php } elseif ($PathName =='Coupons') { ?>
    <title>  Coupon Codes and Offers- ELEVEN 11 </title>
    <meta name="description" content="Checkout the coupon codes at ELEVEN 11 to win 100% Cash Bonus on first Deposit.">
<?php } elseif ($PathName =='leagueCenter') { ?>
    <title> League Center- ELEVEN 11 </title>
    <meta name="description" content="At full list of all upcoming, live and past matches joined by you only at ELEVEN 11 League Center.">
<?php } elseif ($PathName =='lobby') { ?>
    <title> Lobby- ELEVEN 11 </title>
    <meta name="description" content="ELEVEN 11 Lobby allows you to create your own contests and create teams as per the matches schedule.">
<?php } elseif ($PathName =='profile') { ?>
    <title> My Profile- FSl11 </title>
    <meta name="description" content="Manage and update your profile including all the details at ELEVEN 11 profile section.">
<?php } elseif ($PathName =='myAccount') { ?>
    <title> Add and Withdraw Cash- ELEVEN 11 </title>
    <meta name="description" content="Manage your cash amount at My Account. Check the bonus amount, add cash or manage cash by visiting the page.">
<?php } elseif ($PathName =='referAndEarn') { ?>
    <title> Fantasy Cricket Refer and Earn Program- ELEVEN 11 </title>
    <meta name="description" content="ELEVEN 11.com offers a very lucrative referral program for it's players so that they can make the most of refer and earn. Invite your friends now.">
<?php } elseif ($PathName =='settings') { ?>
    <title> Verify Your Account- ELEVEN 11 </title>
    <meta name="description" content="Verify your ELEVEN 11 account ASAP and enjoy 1- click cash withdrawals forever">
<?php } elseif ($PathName == 'FootballPointSystem') { ?>
    <title> Fantasy Football League Point System- ELEVEN 11 </title>
    <meta name="description" content="Understand the Fantasy Football point system at ELEVEN 11 and set up your fantasy football team now to win.">
<?php } elseif ($PathName =='changePassword') { ?>
    <title> Change Password- ELEVEN 11 </title>
    <meta name="description" content="Want to change your current password? Visit the page and follow simple steps.">
<?php } elseif ($PathName =='authenticate') { ?>
    <title> Login and Play Fantasy Cricket at ELEVEN 11 to Win Cash </title>
    <meta name="robots" content="noindex" />
    <meta name="description" content="Sign-in to ELEVEN 11 and start creating your perfect 11 team to win big cash prizes every live match.">
<?php } elseif ($PathName =='fantasy-cricket') { ?>
    <title> Fantasy Cricket | Play Fantasy Cricket League Online | ELEVEN 11 </title>
    <!-- <meta name="robots" content="noindex" /> -->
    <meta name="description" content="Play fantasy cricket online at India's best fantasy cricket site - ELEVEN 11. Join the cricket fantasy league, build your team and win real cash prizes.">
<?php } elseif ($PathName =='AuctionHowtoPlay') { ?>
    <title> Fantasy Auction: How to Play Fantasy Cricket Auction | ELEVEN 11 </title>
    <meta name="description" content="Learn how to play fantasy auction in 6 simple steps at ELEVEN 11. Sign up to play fantasy cricket and win real cash prizes.">
<?php } elseif ($PathName =='GullyHowtoPlay') { ?>
    <title>Gully Cricket: How to Play Fantasy Gully Cricket | ELEVEN 11</title>
    <meta name="description" content="Learn how to play fantasy gully cricket in 6 simple steps at ELEVEN 11. Sign up to play fantasy cricket and win real cash prizes.">
<?php } elseif ($PathName =='how-to-play-fantasy-football') { ?>
    <title> How to Play Fantasy Football | ELEVEN 11 </title>
    <!-- <meta name="robots" content="noindex" /> -->
    <meta name="description" content="Learn how to play fantasy football in 6 simple steps at ELEVEN 11. Sign up to play fantasy football and win real cash prizes.">
<?php } elseif ($PathName =='ipl') { ?>
    <title> IPL Fantasy Cricket League App | Play IPL Cricket & Win Cash | ELEVEN 11 </title>
    <meta name="description" content="Play IPL fantasy cricket to win real cash prizes on ELEVEN 11 - IPL fantasy cricket league App. CLICK HERE to get complete details about IPL cricket 2020.">
<?php } elseif ($PathName =='chennai-super-kings') { ?>
    <title> Chennai Super Kings IPL Team 2020 | CSK Fantasy Cricket Tips | ELEVEN 11  </title>
    <meta name="description" content="Get access to the Chennai Super Kings team 2020, fantasy cricket tips and more at ELEVEN 11. Create your CSK team, play fantasy cricket & win cash.">
<?php } elseif ($PathName =='mumbai-indians') { ?>
    <title> Mumbai Indians IPL Team 2020 | MI Fantasy Cricket Tips | ELEVEN 11  </title>
    <meta name="description" content="Get access to the Mumbai Indians team 2020, fantasy cricket tips and more at ELEVEN 11. Create your Mumbai Indians team, play fantasy cricket & win cash. ">
<?php } elseif ($PathName =='delhi-capitals') { ?>
    <title> Delhi Capitals IPL Team 2020 | DC Fantasy Cricket Tips | ELEVEN 11 </title>
    <meta name="description" content="Get access to the Delhi Capitals team 2020, fantasy cricket tips and more at ELEVEN 11. Create your Delhi Capitals team, play fantasy cricket & win cash. ">
<?php } elseif ($PathName =='kings-xi-punjab') { ?>
    <title> Kings XI Punjab IPL Team 2020 | KXIP Fantasy Cricket Tips | ELEVEN 11  </title>
    <meta name="description" content="Get access to the Kings XI Punjab team 2020, fantasy cricket tips and more at ELEVEN 11. Create your KXIP team, play fantasy cricket & win cash.">
<?php } elseif ($PathName =='kolkata-knight-riders') { ?>
    <title> Kolkata Knight Riders IPL Team 2020 | KKR Fantasy Cricket Tips | ELEVEN 11  </title>
    <meta name="description" content="Get access to the Kolkata Knight Riders team 2020, fantasy cricket tips and more at ELEVEN 11. Create your KKR team, play fantasy cricket & win cash.">
<?php } elseif ($PathName =='sunrisers-hyderabad') { ?>
    <title> Sunrisers Hyderabad IPL Team 2020 | SRH Fantasy Cricket Tips | ELEVEN 11  </title>
    <meta name="description" content="Get access to the Sunrisers Hyderabad team 2020, fantasy cricket tips and more at ELEVEN 11. Create your Sunrisers Hyderabad team, play fantasy cricket & win cash. ">
<?php } elseif ($PathName =='royal-challengers-bangalore') { ?>
    <title> Royal Challengers Bangalore IPL Team 2020 | RCB Fantasy Cricket Tips | ELEVEN 11  </title>
    <meta name="description" content="Get access to the Royal Challengers Bangalore team 2020, fantasy cricket tips and more at ELEVEN 11. Create your RCB team, play fantasy cricket & win cash.">
<?php } elseif ($PathName =='rajasthan-royals') { ?>
    <title> Rajasthan Royals IPL Team 2020 | RR Fantasy Cricket Tips | ELEVEN 11  </title>
    <meta name="description" content="Get access to the Rajasthan Royals IPL team 2020, fantasy cricket tips and more at ELEVEN 11. Create your Rajasthan Royals team, play fantasy cricket & win cash.">
<?php } elseif ($PathName =='csk-vs-kkr') { ?>
    <title> CSK vs KKR IPL Fantasy Cricket Match 2020 | ELEVEN 11 </title>
    <meta name="description" content="Chennai Super Kings vs Kolkata Knight Riders IPL Match 2020. Sign up to play fantasy cricket to win real cash prizes on ELEVEN 11.">
<?php } elseif ($PathName =='csk-vs-mi') { ?>
    <title> CSK vs MI IPL Fantasy Cricket Match 2020 | ELEVEN 11 </title>
    <meta name="description" content="Chennai Super Kings vs Mumbai Indians IPL Match 2020. Sign up to play fantasy cricket to win real cash prizes on ELEVEN 11.">
<?php } elseif ($PathName =='csk-vs-rcb') { ?>
    <title> CSK vs RCB IPL Fantasy Cricket Match 2020 | ELEVEN 11 </title>
    <meta name="description" content="Chennai Super Kings vs Royal Challengers Bangalore IPL Match 2020. Sign up to play fantasy cricket to win real cash prizes on ELEVEN 11.">
<?php } elseif ($PathName =='dc-vs-mi') { ?>
    <title> DC vs MI IPL Fantasy Cricket Match 2020 | ELEVEN 11 </title>
    <meta name="description" content="Delhi Capitals vs Mumbai Indians IPL Match 2020. Sign up to play fantasy cricket to win real cash prizes on ELEVEN 11.">
<?php } elseif ($PathName =='dc-vs-rcb') { ?>
    <title> DC vs RCB IPL Fantasy Cricket Match 2020 | ELEVEN 11 </title>
    <meta name="description" content="Delhi Capitals vs Royal Challengers Bangalore IPL Match 2020. Sign up to play fantasy cricket to win real cash prizes on ELEVEN 11.">
<?php } elseif ($PathName =='dc-vs-srh') { ?>
    <title> DC vs SRH IPL Fantasy Cricket Match 2020 | ELEVEN 11 </title>
    <meta name="description" content="Delhi Capitals vs Sunrisers Hyderabad IPL Match 2020. Sign up to play fantasy cricket to win real cash prizes on ELEVEN 11.">
<?php } elseif ($PathName =='csk-vs-dc') { ?>
    <title> CSK vs DC IPL Fantasy Cricket Match 2020 | ELEVEN 11 </title>
    <meta name="description" content="Chennai Super Kings vs Delhi Capitals IPL Match 2020. Sign up to play fantasy cricket to win real cash prizes on ELEVEN 11.">
<?php } elseif ($PathName =='rr-vs-rcb') { ?>
    <title> RR vs RCB IPL Fantasy Cricket Match 2020 | ELEVEN 11 </title>
    <meta name="description" content="Rajasthan Royals vs Royal Challengers Bangalore IPL Match 2020. Sign up to play fantasy cricket to win real cash prizes on ELEVEN 11.">
<?php } elseif ($PathName =='csk-vs-rr') { ?>
    <title> CSK vs RR IPL Fantasy Cricket Match 2020 | ELEVEN 11 </title>
    <meta name="description" content="Chennai Super Kings vs Rajasthan Royals IPL Match 2020. Sign up to play fantasy cricket to win real cash prizes on ELEVEN 11.">
<?php } elseif ($PathName =='csk-vs-kxip') { ?>
    <title> CSK vs KXIP IPL Fantasy Cricket Match 2020 | ELEVEN 11 </title>
    <meta name="description" content="Chennai Super Kings vs Kings XI Punjab IPL Match 2020. Sign up to play fantasy cricket to win real cash prizes on ELEVEN 11.">
<?php } elseif ($PathName =='csk-vs-srh') { ?>
    <title> CSK vs SRH IPL Fantasy Cricket Match 2020 | ELEVEN 11 </title>
    <meta name="description" content="Chennai Super Kings vs Sunrisers Hyderabad IPL Match 2020. Sign up to play fantasy cricket to win real cash prizes on ELEVEN 11.">
<?php } elseif ($PathName =='dc-vs-kkr') { ?>
    <title> DC vs KKR IPL Fantasy Cricket Match 2020 | ELEVEN 11 </title>
    <meta name="description" content="Delhi Capitals vs Kolkata Knight Riders IPL Match 2020. Sign up to play fantasy cricket to win real cash prizes on ELEVEN 11.">
<?php } elseif ($PathName =='dc-vs-kxip') { ?>
    <title> DC vs KXIP IPL Fantasy Cricket Match 2020 | ELEVEN 11 </title>
    <meta name="description" content="Delhi Capitals vs Kings XI Punjab IPL Match 2020. Sign up to play fantasy cricket to win real cash prizes on ELEVEN 11.">
<?php } elseif ($PathName =='kkr-vs-rcb') { ?>
    <title> KKR vs RCB IPL Fantasy Cricket Match 2020 | ELEVEN 11 </title>
    <meta name="description" content="Kolkata Knight Riders vs Royal Challengers Bangalore IPL Match 2020. Sign up to play fantasy cricket to win real cash prizes on ELEVEN 11.">
<?php } elseif ($PathName =='kxip-vs-kkr') { ?>
    <title> KXIP vs KKR IPL Fantasy Cricket Match 2020 | ELEVEN 11 </title>
    <meta name="description" content="Kings XI Punjab vs Kolkata Knight Riders IPL Match 2020. Sign up to play fantasy cricket to win real cash prizes on ELEVEN 11.">
<?php } elseif ($PathName =='rcb-vs-kxip') { ?>
    <title> RCB vs KXIP IPL Fantasy Cricket Match 2020 | ELEVEN 11 </title>
    <meta name="description" content="Royal Challengers Bangalore vs Kings XI Punjab IPL Match 2020. Sign up to play fantasy cricket to win real cash prizes on ELEVEN 11.">
<?php } elseif ($PathName =='kxip-vs-srh') { ?>
    <title> KXIP vs SRH IPL Fantasy Cricket Match 2020 | ELEVEN 11 </title>
    <meta name="description" content="Kings XI Punjab vs Sunrisers Hyderabad IPL Match 2020. Sign up to play fantasy cricket to win real cash prizes on ELEVEN 11.">
<?php } elseif ($PathName =='mi-vs-kkr') { ?>
    <title> MI vs KKR IPL Fantasy Cricket Match 2020 | ELEVEN 11 </title>
    <meta name="description" content="Mumbai Indians vs Kolkata Knight Riders IPL Match 2020. Sign up to play fantasy cricket to win real cash prizes on ELEVEN 11.">
<?php } elseif ($PathName =='mi-vs-kxip') { ?>
    <title> MI vs KXIP IPL Fantasy Cricket Match 2020 | ELEVEN 11 </title>
    <meta name="description" content="Mumbai Indians vs Kings XI Pubjab IPL Match 2020. Sign up to play fantasy cricket to win real cash prizes on ELEVEN 11.">
<?php } elseif ($PathName =='mi-vs-rcb') { ?>
    <title> MI vs RCB IPL Fantasy Cricket Match 2020 | ELEVEN 11 </title>
    <meta name="description" content="Mumbai Indians vs Royal Challengers Bangalore IPL Match 2020. Sign up to play fantasy cricket to win real cash prizes on ELEVEN 11.">
<?php } elseif ($PathName =='rr-vs-kxip') { ?>
    <title> RR vs KXIP IPL Fantasy Cricket Match 2020 | ELEVEN 11 </title>
    <meta name="description" content="Rajasthan Royals vs Kings XI Punjab IPL Match 2020. Sign up to play fantasy cricket to win real cash prizes on ELEVEN 11.">
<?php } elseif ($PathName =='rr-vs-mi') { ?>
    <title> RR vs MI IPL Fantasy Cricket Match 2020 | ELEVEN 11 </title>
    <meta name="description" content="Rajasthan Royals vs Mumbai Indians IPL Match 2020. Sign up to play fantasy cricket to win real cash prizes on ELEVEN 11.">
<?php } elseif ($PathName =='rcb-vs-srh') { ?>
    <title> RCB vs SRH IPL Fantasy Cricket Match 2020 | ELEVEN 11 </title>
    <meta name="description" content="Royal Challengers Bangalore vs SRH IPL Match 2020. Sign up to play fantasy cricket to win real cash prizes on ELEVEN 11.">
<?php } elseif ($PathName =='kkr-vs-srh') { ?>
    <title> KKR vs SRH IPL Fantasy Cricket Match 2020 | ELEVEN 11 </title>
    <meta name="description" content="Kolkata Knight Riders vs Sunrisers Hyderabad IPL Match 2020. Sign up to play fantasy cricket to win real cash prizes on ELEVEN 11.">
<?php } else{
    echo "<title>ELEVEN 11</title>";
}
?>