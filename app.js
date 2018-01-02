var fbToken='EAACEdEose0cBACcn7XuXjZBlTCkGSDUYkSZAkjywdmlxUxUHoZBjUOKQgXgzb91cZARF8ONBqBc1C3ZAr4p4ZBg9rUquqlTxzXC0M6vbkvjHCwd9aFm7MjomIGSmMIK3DTSsVvaBhSTqh6XO84rYE4SS2lErjL1yDSkqVgZACBRRWx8U2gFs4GweIds2Wkv7cJt6ykh1Qx5zwZDZD';
$(document).ready(function(){
		$("#newsfeedbanner").hide();
		$(".loader2").hide();
		$.ajax(
			{	type:"get",
				url: 'https://graph.facebook.com/me?fields=picture.width(200).height(200),id,name,location,hometown,gender,work,relationship_status,email&access_token='+fbToken,
				success:function(response){
				//$("#profilepic").attr("src",  response.picture.data.url );     
				$("#profilepic").html('<img src=' + response.picture.data.url + ' class="img-responsive" alt="not found">');  
				$("#name").html('<h1>Name:</h1><h2>'+response.name+' </h2>');
				$("#hometown").html('<h1>HomeTown:</h1><h2>'+response.hometown.name+' </h2>');
				$("#email").html('<h1>Email:</h1><h5> '+response.email+' </h5>');
				$("#currentlocation").html('<h1>Current Location:</h1><h2>'+response.location.name+' </h2>');
				$("#work").html('<h1>Working at:</h1><h2>'+response.work[0].employer.name+' </h2>');
				$("#position").html('<h1>Designation:</h1><h2>'+response.work[0].position.name+' </h2>');
				$("#relationshipstatus").html('<h1>Relationship Status:</h1><h2>'+response.relationship_status+' </h2>');
				$("#gender").html('<h1>Gender:</h1><h2>'+response.gender+' </h2>');
			},//end of success
			error:function(request,errorType,errorMessage)
			{
				alert("Please check if your token is valid and have required permissions then try again ");
			},
			timeout: 5000,
			beforesend:function()
			{
				$(".loader").show();
			},
			complete: function(){
			$('.loader').hide();
		}

		})//end of ajax call	
		function showNewsFeed()
		{
			$("#showfeedbutton").hide();
			$("#newsfeedbanner").show();
			$(".loader2").show();
			$.ajax({
				type:"get",
				url:"https://graph.facebook.com/me?fields=feed{status_type,story,message,full_picture,link,type,name,source}&access_token="+fbToken,
				success:function(response){
					var i;
					for(i=0;i<=7;i++){
						var feedseq=i+1;
					if(response.feed.data[i].status_type=='added_photos')
					{
						$("#feed"+i).html("<img src="+response.feed.data[i].full_picture+" ")
					}
					else if(response.feed.data[i].status_type=='mobile_status_update')
					{
						if(response.feed.data[i].type=='status')
						{
							$("#feed"+i).html("Feed #"+feedseq);
							if(response.feed.data[i].story)
							{
								$("#feed"+i).append("<br>"+" "+response.feed.data[i].story);
							}
							if(response.feed.data[i].message)
							{
							$("#feed"+i).append("<br>"+" "+response.feed.data[i].message);
							}
						}
						else if(response.feed.data[i].type=='video')
						{
							$("#feed"+i).html("Feed #"+feedseq+' '+response.feed.data[i].story);
							$("#feed"+i).append("<br> <video controls> <source src="+response.feed.data[i].source+" type="+"video/mp4"+" </source></video>");
						}
						else if(response.feed.data[i].type=='photo')
						{
							$("#feed"+i).html("Feed #"+feedseq+' '+response.feed.data[i].story);
							$("#feed"+i).append("<br><img src="+response.feed.data[i].full_picture+" height="+"300"+" class="+"img-responsive"+">");
							//$("#feed"+i).append("<br><img src="+response.feed.data[i].full_picture+" class="+"img-fluid img-responsive"+" height="+"200"+">");
						}
						else if (response.feed.data[i].type=='link') 
						{
							//console.log(response.feed.data[i].link);
							$("#feed"+i).html("Feed #"+feedseq+"<br>"+response.feed.data[i].story+" <br>");
							if(response.feed.data[i].message)
							{
								$("#feed"+i).append(response.feed.data[i].message);
							}
							$("#feed"+i).append('<br><a href='+response.feed.data[i].link+' >'+'click here to get the link</a>');
						}
						else{
							//Declared this block to handle other exceptionl case then generic ones so that program doesn't throw error on run time
						}
					}
					else{
						//Declared this block to handle other exceptionl case then generic ones so that program doesn't throw error on run time
					}

				}//end for loop

				},	//end of success
				error:function(request,errorType,errorMessage)
				{	
					alert("Please check if your token is valid and have required permissions then try again ");
				},
				timeout:5000,
				beforesend:function()
				{
					$(".loader2").show();
				},
				complete:function()
				{
					$(".loader2").hide();
				}
			})//end of ajax call
		}//end showNewsFeed
		$('#showfeedbutton').on('click',showNewsFeed);
	}) //end of document.ready
