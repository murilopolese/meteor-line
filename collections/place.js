Place = new Mongo.Collection( 'place' );

Place.allow({
	update: function( userId, place ) {
		return userId == place.userId;
	}
});

Meteor.line = {};
Meteor.line.all = function() {
	return Place.find(
		{ active: true },
		{ sort: { createdAd: 1 } }
	);
}

Meteor.line.first = function() {
	return Place.findOne(
		{ active: true },
		{ sort: { createdAd: 1 } }
	);
}

Meteor.line.yourPosition = function() {
	var line = Meteor.line.all();
	var yourPosition = undefined;
	line.forEach( function( place, i ) {
		if( place.userId == Meteor.userId() ) {
			yourPosition = i + 1;
		}
	});
	return yourPosition;
}

Meteor.line.isYourTurn = function() {
	return Meteor.line.yourPosition() == '1';
};

Meteor.line.timeout = function() {
	var timeout = 10000; // milliseconds
	var place = Meteor.line.first();

	if( place ) {
		if( place.inLineAt ) {
			if( Date.now() - place.inLineAt.getTime() > timeout ) {
				Place.update(
					{
						userId: place.userId,
						active: true
					},
					{ $set: { active: false } }
				);
				console.log( 'User kicked', place.userId() );
			}
		} else {
			Place.update(
				{ _id: place._id },
				{ $set: { inLineAt: new Date() } }
			);
		}
	}
}