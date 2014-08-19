Ember.Utility = Ember.Object.extend(
    idFromURL: (currentUrl)->
        regex = /([a-f0-9]{24})/
        result = regex.exec(currentUrl) || ["", null]
        if result?
            result = regex.exec(App.__container__.lookup('router:main').get('url')) || ["", null]
        return result[1]


    #http://www.sitepoint.com/javascript-generate-lighter-darker-color/
    colorLuminance: (hex, lum) ->
        # validate hex string
        hex = String(hex).replace(/[^0-9a-f]/g, "")
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]  if hex.length < 6
        lum = lum or 0

        # convert to decimal and change luminosity
        rgb = "#"
        c = undefined
        i = undefined
        i = 0
        while i < 3
            c = parseInt(hex.substr(i * 2, 2), 16)
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16)
            rgb += ("00" + c).substr(c.length)
            i++
        rgb

    d2h: (d) ->
        d.toString 16

    h2d: (h) ->
        parseInt h, 16

    stringToHex: (tmp) ->
        str = ""
        i = 0
        tmp_len = tmp.length
        c = undefined
        while i < tmp_len
            c = tmp.charCodeAt(i)
            str += @d2h(c) + " "
            i += 1
        str

    hexToString: (tmp) ->
        arr = tmp.split(" ")
        str = ""
        i = 0
        arr_len = arr.length
        c = undefined
        while i < arr_len
            c = String.fromCharCode(@h2d(arr[i]))
            str += c
            i += 1
        str
)

Ember.Application.initializer
    name: "registerUtilities"
    initialize: (container, application) ->
        application.register "utility:main", Ember.Utility
        return

Ember.Application.initializer
    name: "injectUtilities"
    initialize: (container, application) ->
        application.inject "controller", "utility", "utility:main"
        application.inject "route", "utility", "utility:main"
        application.inject "model", "utility", "utility:main"
        application.inject "view", "utility", "utility:main"
        application.inject "component", "utility", "utility:main"
        return
