<?php  include('header.php'); ?>

<!--Main container sec start-->
<div class="mainContainer" ng-controller="contactController" ng-cloak >
    <div class="mt-5">
        <div class="top-header-title pt-4">
            <h1><img src="../../assets/img/faq.png" alt="cricket" style="width:60px"> Frequently Asked Question </h1>
        </div>
        <div class="pb-5">
            <div class="container mt-4">
                <div class=" faq_content ">
                        <div id="tab5" class="tabcontent"><h3>REGISTRATION ON FSL11</h3>
                           <h5> 1. How do I sign up?  </h5>
                          <p> It’s easy!Once you are on&nbsp;FSL11.com You can either <b><a href="download-fantasy-cricket-app" target="_blank"> download</a></b> our application or <b><a href="authenticate" ng-click="goToLogin('signup')" target="_blank"> register </a></b> by filling out a short form or 
			     login/register instantly with your Facebook or Google+ account.</p>

                          <h5> 2. Why can’t I login to my account? </h5>
                          <p> Please check whether your registered e-mail address and password are entered 	correctly and try again. 
							If you've forgotten your password, click on 'Forgot Password', enter your registered email ID and we’ll send you a 
							link shortly to reset your password via e-mail. If you've forgotten your registered email id, reach out to us
							via&nbsp;our Business Whatsapp or write us on <b>info@fsl11.com</b>.Our Customer Support team will be happy to assist you.</p>

                          <h5> 3. How many accounts can I create with the same email id on FSL11.com? </h5>
                          <p> You can create only one account with one email id on&nbsp;<b><a href="<?= $base_url ?>" target="_blank">FSL11.com</a></b>. Creation of multiple accounts by a single user is strictly prohibited and violates our Fair Play policy. And it will be considered as Fraud, We can always suspend the account in case it is found by our team on our system.</p>

                          <h5> 4. Can I update / edit my information? </h5>
                          <p>Yes, you can! Simply log into&nbsp;&nbsp;<b><a href="<?= $base_url ?>" target="_blank">FSL11.com</a></b>&nbsp or enter the app user profile screen ;and click on ‘Edit Profile’ on the top-right corner of the page. You will be able to update/edit your full name and mobile number and your Avatar. You can also edit your date of birth, address and state if your FSL11 account is ‘Unverified’. 
						  <strong> Remember, the team name chosen by you and the e-mail ID and phone number once registered cannot be changed. </strong></p>

                          <h5> 5. I’m sure I've got the right username and password but I still can't log in. </h5>
                          <p>That’s strange but we will help guide you! If you are a registered user on&nbsp;<b><a href="<?= $base_url ?>" target="_blank">FSL11.com</a></b>&nbsp;and are entering the correct details, please reach out to us via our Business Whatsap or write us on <b>info@fsl11.com</b>.Our Customer Support team will be happy to assist you.</p>
                          <h5> 6. I did not get any confirmation e-mail after I signed up. What to do? </h5>
                          <p>There is a possibility that the e-mail could have been marked as ‘Spam’ by your mailbox. Henceforth, we suggest you to check your spam mail and mark the e-mail from FSL11 as ‘Not Spam’ OR you may not have entered the correct e-mail address during registration. If the issue still persists, get in touch with us via our&nbsp; Business Whatsap or write us on <b>info@fsl11.com</b>.Our Customer Support team will be happy to assist you.</p>

                          <h4> Withdrawls </h4>

                          <h5> 1. How to withdraw money from my FSL11 account? </h5>
                          <p>You can withdraw money from the winnings account in your FSL11 wallet once your account is verified. This verification is a one-time process and doesn’t 
							need to be repeated unless you wish to make changes to your account. Once your account is verified, you can withdraw the desired
							amount (as per current rule of minimum and maximum withdrawal) and it will be deposited into your bank account within 3-5 working days or in your paytm wallet within time frame.</p>

                          <h5> 2. Why can’t I withdraw the Cash Bonus in my FSL11 account? </h5>
                          <p>This is a bonus amount given by&nbsp;<b><a href="<?= $base_url ?>" target="_blank">FSL11.com</a></b>&nbsp;&nbsp;to you. This amount is non-withdrawable and can be used to join more contests and win more cash. Also, make sure to use the received Cash Bonus within time frame as it comes with an expiry date.</p>

                          <h5> 3. What is the minimum &amp; maximum amount I can withdraw from my FSL11 account? </h5>
                          <p>The minimum amount for a single withdrawal request usually is INR 100 and the maximum amount that you can withdraw in one go is INR 1000 but it is subjected to change and limits can be cahnged but always visible on your withdraw cash screen.</p>

                          <h5> 4. What bank account details do I need to provide for withdrawal/verification? </h5>
                          <p> We’ve got to make sure that it’s you who we’re sending the money to. Hence, we need you to provide the bank account details including the following information:- <b>Name of the bank, Name of the branch, Name of the account holder, Account no. and IFSC code</b>.
			      All the information that is required is available on bank verification form which is must to be submitted by user in case of any withdrawal. </p>

                          <h4 dir="ltr"><strong>Leaderboards</strong></h4>

                          <p><strong>Q: How do Leaderboard Rankings work?</strong></p>

                          <p dir="ltr"><strong>A: &nbsp;Leaderboard Rankings are based on the total of <a href="PointSystem"> fantasy points </a> accumulated by the teams created for the matches during a series or the period for which the Leaderboard is active. </strong></p>

                          <p><strong>NOTE:</strong> In case you played with more than 1 team in a multi-entry match, both the Team Fantasy Points will be considered for leaderboard rankings.</p>

                          <p><strong>Q: What are the different types of Leaderboards?</strong></p>

                          <p dir="ltr"><strong>A: Leaderboards are broadly divided into 2 categories:</strong></p>

                          <p><strong>1. Series/Tournament Leaderboards</strong></p>

                          <p dir="ltr">These leaderboards keep a track of a player’s performance on a per series basis. For example, If there’s a 5-match ODI series, the fantasy points of the best team in each of those 5 matches for an individual player will be accumulated for the leaderboard.These leaderboard are available for Fantasy Auction.</p>

                          <p><strong>2. Match Leaderboards </strong></p>

                          <p>These leaderboards keep a track of a player’s performance on a per match basis. For example, if there is a match happening today, the fantasy points of the user team of the respective match and respective contest in which the player has participated will be accumulated for the leaderboard.</p>

                          <p><strong>Q: Which teams are considered for Leaderboards?</strong></p>

                          <p dir="ltr"><strong>A: </strong>Only the teams that have been enrolled in a cash contest or practice contest will be considered for the Leaderboard!</p>

                          <p><strong>Q: How much time does it take to declare Leaderboard Winnings?</strong></p>

                          <p dir="ltr"><strong>A: </strong>After the last match of a particular series or when a paticular match ends, it takes 2-10 hours at least for us to display the final leaderboard score!</p>

                          <h4><strong>Refer &amp; Earn</strong></h4>

                          <p>1: When I will get my referral bonus?<br>
                          You will get Rs.50 cash bonus if your referal friend registers on the application and your friend will also get Rs.50 cash bonus for using your refer code.</p>

                          <h4>Account Balance</h4>

                          <p>Here, you can see the total balance in your FSL11 account and can either deposit/withdraw money. Remember, you need to get your account verified by us to withdraw money. Don’t worry! This is a one-time activity unless you wish to change your account details.</p>

                          <ol>
                            <li class="mb-2"><strong>Deposited&nbsp;</strong><br/>
                            If you have deposited an amount, but haven't joined a contest using this amount, it will be considered as 'Deposited' in your account.</li>
                            
                            <li class="mb-2"><strong>Winnings&nbsp;</strong><br/>
                            It’s the money you have earned by winning in contests. No processing fees will be deducted if you wish to withdraw any amount from your winnings.</li>
                           
                            <li class="mb-2"><strong>Cash Bonus&nbsp;</strong><br/>
                            Check the various promotions and bonuses available while you deposit into your account.Cash bonus can not be withdrawn but can only be used to play on application. </li>
                         
                        </ol>
                        </div>
                     </div>
            </div>
        </div>
<!-- <section class="video-bg" style="background-image: url('assets/img/how_Back_img.jpg');">
    <div class="container">
        <div class="row">
            <div class="col-md-5 col-xs-12">
                <div class="how  text-white">
                  <h1> How to Play... </h1>
                  <ol class="mt-4 step-list">
                    <li> 1.  Select a Match </li>
                    <li> 2.  Create Your Team </li>
                    <li> 3.  Let the game begin </li>
                    <li> 4.  Join Contest </li>
                  </ol>
                </div>
              </div>

              <div class="col-md-7 col-xs-12 text-center">
                <div class="videoBox">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/dzDnlvU1eTk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                </div>
            </div>
        </div>
    </div>
</section> -->
    </div>



</div>
<!--Main container sec end-->
<?php include('footerHome.php');?>