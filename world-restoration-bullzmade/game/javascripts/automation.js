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

function triggerAutomators() {
    autobuyFRs()
    autobuyRNEUs()
    autobuyNNEUs()
}