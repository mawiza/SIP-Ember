
App.Administration.FIXTURES = [
    {
        id: 1
        name: "SSB"
        color: "#000"
    }
    {
        id: 2
        name: "BEK"
        color: "#123"
    }
]

App.Theme.FIXTURES = [
    {
        id: 1
        definition: "theme1"
        focusareas: [1,2]
    }
    {
        id: 2
        definition: "theme2"
        focusareas: [3,4]
    }
]

App.Focusarea.FIXTURES = [
    {
        id: 1
        definition: "focusarea1"
        theme: 1
    }
    {
        id: 2
        definition: "focusarea2"
        theme: 1
    }
    {
        id: 3
        definition: "focusarea3"
        theme: 2
    }
    {
        id: 4
        definition: "focusarea4"
        theme: 2
    }
]