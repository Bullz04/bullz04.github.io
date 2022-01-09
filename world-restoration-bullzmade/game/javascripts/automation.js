function automationUnlock(type) {
    if (type == "Auto-FRs" && temp.automator.autoFRs.requirement() && !player.automator.autoFRs.isUnlocked) {
        player.automator.autoFRs.isUnlocked = true
    }

    if (type == "Auto-RNEUs" && temp.automator.autoRNEUs.requirement() && !player.automator.autoRNEUs.isUnlocked) {
        player.automator.autoRNEUs.isUnlocked = true
    }

    if (type == "Auto-NNEUs" && temp.automator.autoNNEUs.requirement() && !player.automator.autoNNEUs.isUnlocked) {
        player.automator.autoNNEUs.isUnlocked = true
    }

    if (type == "Auto-RCUs" && temp.automator.autoRCUs.requirement() && !player.automator.autoRCUs.isUnlocked) {
        player.automator.autoRCUs.isUnlocked = true
    }

    if (type == "Auto-NCUs" && temp.automator.autoNCUs.requirement() && !player.automator.autoNCUs.isUnlocked) {
        player.automator.autoNCUs.isUnlocked = true
    }

    if (type == "Auto-PreExt" && temp.automator.autoPreExt.requirement() && !player.automator.autoPreExt.isUnlocked) {
        player.automator.autoPreExt.isUnlocked = true
    }
}

function autobuyFRs() {
    if (player.automator.autoFRs.isActive) {
        maxAllFRs()
    }
}

function autobuyRNEUs() {
    if (player.automator.autoRNEUs.isActive) {
        maxAllRNEUs()
    }
}

function autobuyNNEUs() {
    if (player.automator.autoNNEUs.isActive) {
        for (i = 0; i < temp.NEUpgrades.nonRepeatable.isUnlocked.length; i++) {
            buyNormalNEUpgrade(i)
        }
    }
}

function autobuyRCUs() {
    if (player.automator.autoRCUs.isActive) {
        maxAllRCUs()
    }
}

function autobuyNCUs() {
    if (player.automator.autoNCUs.isActive) {
        for (i = 0; i < temp.cakeUpgrades.nonRepeatable.isUnlocked.length; i++) {
            buyNormalCakeUpgrade(i)
        }
    }
}

function autobuyPreExtensions() {
    if (player.automator.autoPreExt.isActive) {
        buyPreciousExtension("max")
    }
}

function showAutomations() {
    let k = Object.keys(temp.automator)
    getAutomatorsShowed = function() {
        if (temp.unlockCondition.preciousFork()) {
            return 6
        } else if (player.karma.gt(0) || player.gainedKarma.gt(0) || player.prestigeStat[2].gt(0)) {
            return 5
        } else if (player.cakes.gt(0) || player.gainedCakes.gt(0) || player.prestigeStat[1].gt(0)) {
            return 3
        } else {
            return 1
        }
    }

    for (i = 0; i < getAutomatorsShowed(); i++) {
        temp.automatorsShown[i] = true
    }
    for (i = getAutomatorsShowed(); i < temp.automatorsShown.length; i++) {
        temp.automatorsShown[i] = false
        player.automator[k[i]].isUnlocked = false
        player.automator[k[i]].isActive = false
    }
    
}

function triggerAutomators() {
    autobuyFRs()
    autobuyRNEUs()
    autobuyNNEUs()
    autobuyRCUs()
    autobuyNCUs()
    autobuyPreExtensions()
}