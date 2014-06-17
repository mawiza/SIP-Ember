App.AdministrationsNew = Ember.Controller.extend
    submit: ->
        #var me = this;
        #post.get("store").commit();
        #post.on('didCreate', function() {
        #    me.get('target').transitionTo('posts.index')
        transitionTo('/administrations')
