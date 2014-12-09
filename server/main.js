Meteor.publish( 'line', function() {
	return Meteor.line.all();
});

Meteor.startup(function() {
	Place.remove({});
	Meteor.setInterval( Meteor.line.timeout, 1000 );
});

Meteor.methods({
	joinLine: function() {
		if( !Meteor.userId ) {
			throw new Meteor.Error( 'You must login to join the line' );
		}

		Place.insert({
			active: true,
			userId: Meteor.userId(),
			createdAt: new Date(),
			avatar: "https://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture/?type=square"
		});

		console.log( 'User entered the line', Meteor.userId() );
	},
	leaveLine: function() {
		if( !Meteor.userId ) {
			throw new Meteor.Error( 'You must login to leave the line' );
		}
		Place.update( 
			{ userId: Meteor.userId() },
			{ $set: { active: false } }
		)
	}
});