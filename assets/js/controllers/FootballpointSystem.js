"use strict";app.controller("FootballpointSystemController",["$scope","$rootScope","$location","environment","$localStorage","$sessionStorage","appDB","toastr","Upload",function(t,o,n,i,a,e,s,p,c){t.env=i,t.PointCategory="Normal",t.activeTab="T20",t.ChangeTab=function(o){t.activeTab=o},t.CaptainPoint=0,t.ViceCaptainPoint=0,t.PlayingXIPoint=0,t.ManOfMatchPoint=0,t.pointSystem=function(){t.points=[];s.callPostForm("football/sports/getPoints",{}).then(function(o){if(t.checkResponseCode(o)){t.points=o.Data.Records;for(var n=0;n<t.points.length;n++)t.points[n].Sort=parseInt(t.points[n].Sort),"CaptainPointMP"==t.points[n].PointsTypeGUID?t.CaptainPoint=t.points[n].PointsValue:"ViceCaptainPointMP"==t.points[n].PointsTypeGUID?t.ViceCaptainPoint=t.points[n].PointsValue:"StatringXI"==t.points[n].PointsTypeGUID?t.PlayingXIPoint=t.points[n].PointsValue:"ManOfMatch"==t.points[n].PointsTypeGUID&&(t.ManOfMatchPoint=t.points[n].PointsValue)}},function(o){t.checkResponseCode(o)})}}]);