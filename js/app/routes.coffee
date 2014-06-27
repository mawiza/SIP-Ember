App.Router.map ->
    @resource "administrations"
    @resource "administrations.new", {path:'/administrations/new'}
    @resource "administrations.edit", {path:'/administrations/edit/:id'}
    @resource 'themes', ->
        @route 'new'
        @route 'edit', {path:'/edit/:id'}
        @resource 'focusareas', {path:'/:id/focusareas'}, ->
            @route 'new'
            @route 'edit', {path:'/edit/:id'}
    @resource 'about'
    @resource 'settings'
