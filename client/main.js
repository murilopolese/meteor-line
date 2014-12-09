Meteor.startup( function() {
	Meteor.subscribe( 'line' );
});

Template.line.helpers({
	isYourTurn: function() {
		return Meteor.line.isYourTurn()
	},
	inLine: function() {
		return Meteor.line.yourPosition() != undefined;
	}
});
Template.lineList.helpers({
	line: function() {
		return Meteor.line.all().fetch();
	},
	yourPosition: function() {
		return Meteor.line.yourPosition();
	},
	totalInLine: function() {
		return Meteor.line.all().count();
	}
});

Template.line.events({
	'click .join-line': function() {
		Meteor.call( 'joinLine' );
	}
});