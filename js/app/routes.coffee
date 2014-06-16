App.Router.map ->
    @resource("administrations")
    @resource("administrations.new", {path:'/administrations/new'})
    @route('about')
    @route('themes')
    @route('focusareas')
