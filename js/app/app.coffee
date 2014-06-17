window.App = Ember.Application.create()
    #LOG_TRANSITIONS: true
    #LOG_TRANSITIONS_INTERNAL: true
    #LOG_VIEW_LOOKUPS: true
    #LOG_BINDINGS: true
    #LOG_ACTIVE_GENERATION: true

App.ApplicationAdapter = DS.LSAdapter.extend
    namespace: 'sip'

DS.LSAdapter.create
    namespace: 'sip'

#create an interface for this
Ember.I18n.translations =
    administrations:
        index:
            title: "Forvaltning"
        new:
            title: "Opret nye forvaltning"

#Ember.I18n.translations =
#    administrations:
#        edit:
#            title: "Edit User"
#
#        followers:
#            title:
#                one: "One Follower"
#                other: "All {{count}} Followers"
#
#    button:
#        add_user:
#            title: "Add a user"
#            text: "Add"
#            disabled: "Saving..."