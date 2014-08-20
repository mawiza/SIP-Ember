App.Router.map ->
    @resource "graph"
    @resource "administrations"
    @resource "administrations.new", {path:'/administrations/new'}
    @resource "administrations.edit", {path:'/administrations/edit/:administration_id'}
    @resource 'themes', ->
        @route 'new'
        @route 'edit', {path:'/edit/:theme_id'}
        @resource 'focusareas', {path:'/:theme_id/focusareas'}, ->
            @route 'new', {path:'/new'}
            @route 'edit', {path:'/edit/:focusarea_id'}
    @resource 'strategies', ->
        @route 'administration', {path:'/administration/:administration_id'}
