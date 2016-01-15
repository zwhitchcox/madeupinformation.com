'use strict'



var chai = require('chai');
var uuid = require('uuid');
var expect = chai.expect
var credentials = {
    "accessKeyId": process.env.AMAZON_KEY_ID,
    "secretAccessKey": process.env.AMAZON_ACCESS_KEY,
    "region": process.env.AMAZON_REGION
}
var DynamoDB = require('aws-dynamodb')(credentials);
var Lambda = require('../helpers/Lambda');

/*describe('Users Test',function(){
	//#1
	var Users = require('../helpers/Users.js');
	var user = new Users();
	describe('daily user count query ',function(){
		//A.
		before(function(done){
			console.log('injecting daily user count sample data');
			var users = require('../sample_data/users/daily_user_count.json');
			DynamoDB
			    .table('Google')
			    .insert({
			    	query_type: 'daily_user_count',
			        date: new Date().getTime(),
			  		data : users
			    },function(err,data){
			    	console.info(err,data);
			    	done();
			    });
		});

		it('should equal an array',function(done){
			this.timeout(5000);
			user.getDailyUserCount(function(err,data){
				chai.assert(data,'array');
				done();
			
			});
		
		
		});
	});



	describe('top 5 campaigns query',function(){
		//B. 
		before(function(done){
			var campaigns = require('../sample_data/users/top_campaigns.json');
			DynamoDB
			    .table('Google')
			    .insert({
			    	query_type: 'top_campaigns',
			        date: new Date().getTime(),
			  		data : campaigns
			    },function(err,data){
			    	
			    	done();
			    });
		});
		it('should  equal an array and length is 5',function(done){
			this.timeout(5000);
			user.getTopCampaigns(function(err,data){
				chai.assert(data,'array');
				chai.assert.lengthOf(data,5);
				done();
			});
		});
	});

	describe('restaurant search',function(){
		//C.
		before(function(done){
			var restaurants = require('../sample_data/users/restaurant_search.json');
			DynamoDB
				.table('Google')
				.insert({
					query_type: 'restaurant_search',
					date: new Date().getTime(),
					data : restaurants
				},function(err,data){
					//console.log(err,data);
					done();
				})
		});

		it('should be an array',function(done){
			this.timeout(5000);
			user.restaurantSearch(function(err,data){
				chai.assert(data,'array');
				done();
			})
			
		});



		describe('get users by location ',function(){
			//D
			before(function(done){
				var users_by_location = require('../sample_data/users/users_by_location.json');
				DynamoDB
					.table('Google')
					.insert({
						query_type: 'users_by_location',
						date : new Date().getTime(),
						data : users_by_location
					},function(err,data){
						console.log(err,data);
						done();
					});
			});
			it( ' users by location should be an array ',function(done){
				this.timeout(5000);
				user.getUsersByLocation(function(err,data){
					console.log(err,data);
					chai.assert(data,'array');
					done();
				});
			
			})



		});
	});

});



describe('Offers Test',function(){
	//#2
	var Offer = require('../helpers/Offers.js');
	var  offer  = new Offer();
	describe('GET avg check without offer',function(){
		before(function(done){
			var avg_check_without_offer = require('../sample_data/offers/average_check_without_offer.json');
			DynamoDB
				.table('Mulesoft')
				.insert({
					query_type: 'average_check_without_offer',
					date : new Date().getTime(),
					data : avg_check_without_offer
				},function(err,data){
					console.log(err,data);
					done();
				});
		});

		it('average check without offer should be an array ',function(done){
			this.timeout(5000);
			offer.getAvgCheckNoOffer(function(err,data){
				//console.log(err,data);
				chai.assert(data,'array');
				chai.assert.isUndefined(err,'there was no error');
				done();

			});
		
		});
	});

	describe('GET avg check with offer ',function(){
		before(function(done){
			var avg_check_with_offer = require('../sample_data/offers/average_check_with_offer.json');
			DynamoDB
				.table('Mulesoft')
				.insert({
					query_type: 'average_check_with_offer',
					date : new Date().getTime(),
					data : avg_check_with_offer
				},function(err,data){
					//console.log(err,data);
					done();
					//chai.assert(data,'array');
					//chai.assert.isUndefined(err,'there was no error');
				});
		});

		it('average check with offer should be an array ',function(done){
			this.timeout(5000);
			offer.getAvgCheckWithOffer(function(err,data){
				chai.assert(data,'array');
				chai.assert.isUndefined(err,'there was no error');
				done();
			})
			
		});
	});


	describe('GET offers last week ',function(){
		before(function(done){
				var offer_last_week = require('../sample_data/offers/offers_last_week.json');
				DynamoDB
				.table('Mulesoft')
				.insert({
					query_type: 'offers_last_week',
					date : new Date().getTime(),
					data : offer_last_week

			},function(err,data){
				
				done();
			});	
		});
		it('should be an array with no error', function(done){
			this.timeout(5000);
			offer.getOffersLastWeek(function(err,data){
				chai.assert(data,'array');
				chai.assert.isUndefined(err, 'there was an error');
				done();
			});
		});

	});


	describe('GET offers this week ',function(){
		before(function(done){
			var offers_this_week = require('../sample_data/offers/offers_this_week.json');
			DynamoDB
				.table('Mulesoft')
				.insert({
					query_type : 'offers_this_week',
					date : new Date().getTime(),
					data : offers_this_week
				},function(err,data){
					console.log(err,data);
					done();
				});
		});

		it('should be an array with no errors',function(done){
			this.timeout(5000);
			offer.getOffersThisWeek(function(err,data){
				chai.assert(data,'array');
				chai.assert.isUndefined(err,'there was an error');
				done();
			})
			
		});
	});


	describe('GET real time locations ',function(){
		before(function(done){
			var  real_time_locations = require('../sample_data/offers/realtime_locations.json');
			DynamoDB
				.table('Mulesoft')
				.insert({
					query_type : 'realtime_locations',
					date : new Date().getTime(),
					data : real_time_locations
				},function(err,data){
						done();
				})
		});
		it('should be an array with no error ',function(done){
			this.timeout(5000);
			offer.getRealTimeLocations(function(err,data){
				console.log(err,data);
				chai.assert(data, 'array');
				chai.assert.isUndefined(err, 'there was an error asserting data');
				done();
			});
			//done();
		});
	});
});

describe('Overview Test ',function(){
	//#3
	var Overview = require('../helpers/Overview');
	var overview = new Overview();

	describe('GET daily downloads ',function(){
		//A.
		before(function(done){
			var daily_downloads = require('../sample_data/overview/daily_downloads.json');
			DynamoDB
				.table('Mulesoft')
				.insert({
					query_type : 'daily_downloads',
					date : new Date().getTime(),
					data : daily_downloads

				},function(err,data){
					//console.log(err,data);
					done();
				})
		});

		it('should be an array with no error',function(done){
			this.timeout(5000);
			overview.getDailyDownloads(function(err,data){
				//console.log(err,data);
				chai.assert(data,'array');
				chai.assert.isUndefined(err,'there was an error');
				done();
			})
			
		});
	});


	describe('GET app updates ',function(){
		//B. 
		before(function(done){
			var app_updates = require('../sample_data/overview/app_updates.json');
			DynamoDB
				.table('Mulesoft')
				.insert({
					query_type : 'app_updates',
					date 	   : new Date().getTime(),
					data 	   : app_updates 
				},function(err,data){
					console.log(err,data);
					done();
				});
		});

		it('should be an array with no errors',function(done){
			this.timeout(5000);
			overview.getAppUpdates(function(err,data){
				
				chai.assert(data,'array');
				chai.assert.isUndefined(err,'there was an error');
				done();
			})
		})
	});

	describe('GET  campaigns ',function(){
		//C.
		before(function(done){
			var campaigns = require('../sample_data/overview/campaigns.json');
			DynamoDB
				.table('Mulesoft')
				.insert({
					query_type	: 'campaigns',
					date        : new Date().getTime(),
					data        : campaigns
				},function(err,data){
				
					done();
				});
	
		});
		it('should be an array with no errors ',function(done){
			this.timeout(5000);
			overview.getCampaigns(function(err,data){
		
				chai.assert(data,'array');
				chai.assert.isUndefined(err,'there was an error with getCampaigns');
				done();
			});
		});

	});

	describe('GET total downlaods ',function(){
		//D.
		before(function(done){
			var total_downloads = require('../sample_data/overview/total_downloads.json');
			DynamoDB
				.table('Mulesoft')
				.insert({
					query_type : 'total_downloads',
					date 	   : new Date().getTime(),
					data       : total_downloads 
				},function(err,data){
					done();
				});

		});

		it('should be an array with no errors ',function(done){
			this.timeout(5000);
			overview.getTotalDownloads(function(err,data){
				
				chai.assert(data,'array');
				chai.assert.isUndefined(err,'there was an error');
				done();
			});
		});
	});


	describe('GET app-ratings ',function(done){
		//E.
		before(function(done){
			var app_ratings = require('../sample_data/overview/app_ratings.json');
			DynamoDB
				.table('Mulesoft')
				.insert({
					query_type  : 'app_ratings',
					date        : new Date().getTime(),
					data        :  app_ratings
				},function(err,data){
					done();
				});
		});

		it('should be an array with no errors ',function(done){
			this.timeout(5000);
			overview.getAppRatings(function(err,data){
				chai.assert(data,'array');
				chai.assert.isUndefined(err,data);
				done();
			});
		});
	});


	describe('GET lastweek downloads ',function(){
		//F.
		before(function(done){
			var lastweek_downloads = require('../sample_data/overview/lastweek_downloads');
			DynamoDB
				.table('Mulesoft')
				.insert({
					query_type  : 'lastweek_downloads',
					date 		: new Date().getTime(),
					data        : lastweek_downloads
				},function(err,data){
					done();
				});

		});


		it('should be an array with no errors ',function(done){
			this.timeout(5000);
			overview.getLastWeekDownloads(function(err,data){
				console.log(err,data);
				chai.assert(data,'array');
				chai.assert.isUndefined(err,'there was an error');
				done();
			});
		});
	});
});*/

describe('Lambda functions parser ',function(){
	var sample_data = require('../sample_data/teradata.json');
	var lambda = new Lambda(sample_data);

	//overview 
	it('should be an object',function(done){
		chai.assert(lambda,'object');
		done();	
	});
	it('lambda.dailyDownloads return an array that has an properties timestamp,count,android,ios',function(done){
		var formatted_daily_downloads = lambda.dailyDownloads();
		console.log(formatted_daily_downloads);

		chai.expect(formatted_daily_downloads).to.be.a('array');
		done();
	});

	it('lambda.campaigns should return an array with properties start_timestamp,end_timestamp,label',function(done){
		var campaigns = lambda.campaigns();
		chai.expect(campaigns).to.be.a('array');
		chai.expect(campaigns[0]).to.have.property('start_timestamp');
		chai.expect(campaigns[0]).to.have.property('end_timestamp');
		chai.expect(campaigns[0]).to.have.property('label');
		done();
	});

	it('lambda.totalDownloads should return an object with a property called total_downloads',function(done){
		var total_downloads = lambda.totalDownloads();
		chai.expect(total_downloads).to.be.a('object');
		chai.expect(total_downloads).to.have.property('total_downloads');
		chai.expect(total_downloads.total_downloads).to.be.a('number');
		done();
	});
	it('lambda.lastweekDowloads should return an array with label timestamp count',function(done){
		var lastweek_downloads = lambda.lastWeekDownloads();
		chai.expect(lastweek_downloads).to.be.a('array');
		//chai.expect(lastweek_downloads).to.eql(2);
		done();
	});
	it('lambda.appRatings should return an object with properties ios, android',function(done){
		var app_ratings = lambda.appRatings();
		chai.expect(app_ratings).to.be.a('object');
		chai.expect(app_ratings).to.have.property('ios');
		chai.expect(app_ratings).to.have.property('android');
		chai.expect(app_ratings).to.have.deep.property('ios.version');
		chai.expect(app_ratings).to.have.deep.property('ios.stars');
		chai.expect(app_ratings).to.have.deep.property('ios.reviews');
		chai.expect(app_ratings).to.have.deep.property('android.version');
		chai.expect(app_ratings).to.have.deep.property('android.stars');
		chai.expect(app_ratings).to.have.deep.property('android.reviews');
		done();


	});
	it('lambda.appUpdates should return an object with os and timestamp',function(done){
		var app_updates = lambda.appUpdates();
		chai.expect(app_updates).to.be.a('array');
		chai.assert.lengthOf(app_updates,2);
		done();
	});

	//offers
	it('lambda.averageCheckWithOffer should an array of objects',function(done){
		var average_check_with_offer = lambda.averageCheckWithOffer();
		chai.expect(average_check_with_offer).to.be.a('array');
		chai.expect(average_check_with_offer[0]).to.have.property('timestamp');
		chai.expect(average_check_with_offer[0]).to.have.property('value');
		done();
	});

	it('lambda.averageCheckWithoutOffer should an array of objects',function(done){
		var average_check_without_offer = lambda.averageCheckWithoutOffer();
		chai.expect(average_check_without_offer).to.be.a('array');
		chai.expect(average_check_without_offer[0]).to.have.property('timestamp');
		chai.expect(average_check_without_offer[0]).to.have.property('value');
		done();
	});

	it('lambda.realtime_locations an array of objects whos properties are latitude,longitude,value',function(done){
		var realtime_locations = lambda.realTimeLocations();
		chai.expect(realtime_locations).to.be.a('array');
		chai.expect(realtime_locations[0]).to.have.property('longitude');
		chai.expect(realtime_locations[0]).to.have.property('latitude');
		chai.expect(realtime_locations[0]).to.have.property('value');
		done();
	});

	it('lambda.offers_this_week should be an array of objects that contain offers from beginning of week to current day',function(done){
		var offers_this_week = lambda.offersThisWeek();
		chai.expect(offers_this_week).to.be.a('array');
		chai.expect(offers_this_week[0]).to.have.property('count');
		chai.expect(offers_this_week[0]).to.have.property('label');
		done()
	});

	it('lambda.offersLastWeek should be an array of objects with label and count',function(done){
		var offers_last_week = lambda.offersLastWeek();
		chai.expect(offers_last_week).to.be.a('array');
		chai.expect(offers_last_week[0]).to.have.property('count');
		chai.expect(offers_last_week[0]).to.have.property('label');
		done();
	});


});


