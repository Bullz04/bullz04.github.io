function tab(a) {
    document.getElementById("BeforeLife").style.display = "none"
    document.getElementById("PrestigeLayers").style.display = "none"
    document.getElementById("Achievements").style.display = "none"
    document.getElementById("Automation").style.display = "none"
    document.getElementById("Settings").style.display = "none"

    document.getElementById(a).style.display = ""
}

function beforeLifeSubTab(a) {
    document.getElementById("subBeforeLife1").style.display = "none"
    document.getElementById("subBeforeLife2").style.display = "none"

    document.getElementById(a).style.display = ""
}

function prestigeSubTab(a) {
    document.getElementById("NewEpisode").style.display = "none"
    document.getElementById("NewCakeAtStake").style.display = "none"
    document.getElementById("NewContest").style.display = "none"

    document.getElementById(a).style.display = ""
}

function NCaSSubTab(a) {
    document.getElementById("subNCaS1").style.display = "none"
    document.getElementById("subNCaS2").style.display = "none"

    document.getElementById(a).style.display = ""
}

function NCSubTab(a) {
    document.getElementById("subNC1").style.display = "none"
    document.getElementById("subNC2").style.display = "none"

    document.getElementById(a).style.display = ""
}

function achievementsSubTab(a) {
    document.getElementById("subAchievements1").style.display = "none"
    document.getElementById("subAchievements2").style.display = "none"

    document.getElementById(a).style.display = ""
}

function settingsSubTab(a) {
    document.getElementById("subSettings1").style.display = "none"
    document.getElementById("subSettings2").style.display = "none"
    document.getElementById("subSettings3").style.display = "none"
    document.getElementById("subSettings4").style.display = "none"

    document.getElementById(a).style.display = ""
}

tab("BeforeLife")
prestigeSubTab("NewEpisode")
NCaSSubTab("subNCaS1")
achievementsSubTab("subAchievements1")
beforeLifeSubTab("subBeforeLife1")
NCSubTab("subNC1")
settingsSubTab("subSettings1")









