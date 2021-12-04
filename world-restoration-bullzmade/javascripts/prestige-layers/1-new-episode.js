function getKeyGain() {
    let boost = function() {
        return new Decimal(1)
        .times( (player.achievementsGotten[11]) ? getAchRewards("12") : new Decimal(1) )
        .times(getRNEUpgradeEffect("1"))
        .times(getRNEUpgradeEffect("3"))
        .times( (player.NEUpgrades.nonRepeatable.isBought[2]) ? getNNEUpgradeEffect("3") : new Decimal(1) )
        .times( (player.cakeUpgrades.nonRepeatable.isBought[0]) ? getNCUpgradeEffect("1") : new Decimal(1) )
        .times(getEmpoweredCakeEffect())
        .times( (temp.preciousEffect.isUnlocked[1]) ? getPFEffects("2") : new Decimal(1) )
        .root( (player.theJudgement.isActive) ? new Decimal(100) : new Decimal(1) )
    }
    return Decimal.floor(
        Decimal.log(player.repelledForks.div(1000).plus(1), 2)
        .times(boost())
    )
}

function getNewEpisodeGain() {
    return new Decimal(1)
}

function getRNEUpgradeEffect(text) {
    switch (text+"") {
        case "1":
            return Decimal.log(player.keys.plus(2), 2)
            .pow(player.NEUpgrades.repeatable.levels[0])
            .pow( (player.cakeUpgrades.nonRepeatable.isBought[3]) ? getNCUpgradeEffect("4") : new Decimal(1) )
            .pow( (player.karmaUpgrades.nonRepeatable.isBought[8]) ? getNKaUpgradeEffect("9") : new Decimal(1) )
            .pow( (player.karmaUpgrades.nonRepeatable.isBought[14]) ? getNKaUpgradeEffect("15") : new Decimal(1) )
        case "2":
            return player.NEUpgrades.repeatable.levels[1].times(0.25).plus(1)
        case "3":
            return Decimal.log(player.repelledForks.plus(10), 10).pow(0.5)
            .pow(player.NEUpgrades.repeatable.levels[2])
            .pow( (player.NEUpgrades.nonRepeatable.isBought[5]) ? getNNEUpgradeEffect("6") : new Decimal(1) )
            .pow( (player.karmaUpgrades.nonRepeatable.isBought[8]) ? getNKaUpgradeEffect("9") : new Decimal(1) )
            .pow( (player.karmaUpgrades.nonRepeatable.isBought[14]) ? getNKaUpgradeEffect("15") : new Decimal(1) )
    }
}

function getNNEUpgradeEffect(text) {
    switch (text+"") {
        case "1":
            return player.gainedKeys.times(0.2).plus(1)
            .pow(getRNEUpgradeEffect("2"))
        case "2":
            return getTotalFRs().minus(1).times(0.1).plus(1)
            .pow( (player.achievementsGotten[7]) ? getAchRewards("8") : new Decimal(1) )
            .pow( (player.NEUpgrades.nonRepeatable.isBought[6]) ? getNNEUpgradeEffect("7") : new Decimal(1) )
        case "3":
            return Decimal.log(player.repelledForks.plus(2), 2)
            .pow(0.5)
            .pow( (player.NEUpgrades.nonRepeatable.isBought[3]) ? getNNEUpgradeEffect("4") : new Decimal(1) )
            .pow( (player.NEUpgrades.nonRepeatable.isBought[7]) ? getNNEUpgradeEffect("8") : new Decimal(1) )
        case "4":
            return Decimal.log(Decimal.log(player.repelledForks.plus(2), 2).plus(1), 2).pow(1.5)
        case "5":
            return Decimal.log(Decimal.log(player.repelledForks.plus(100), 100).plus(99), 100)
        case "6":
            return player.NEUpgrades.repeatable.levels[0].times(0.01).plus(1)
        case "7":
            return Decimal.log(Decimal.log(player.keys.plus(10), 10).plus(9), 10).pow(6)
        case "8":
            return Decimal.log(Decimal.log(player.keys.plus(10), 10).plus(49), 50)
    }
}

function getRNEUDiscounts(i) {
    switch (i+1) {
        case 1:
            return new Decimal(1)
        case 2:
            return new Decimal(1)
        case 3:
            return new Decimal(1)
    }
}

function getRNEUScalingWeakness(i) {
    switch (i+1) {
        case 1:
            return new Decimal(1)
            .times( (player.cakeUpgrades.nonRepeatable.isBought[2]) ? getNCUpgradeEffect("3") : new Decimal(1) )
            .times( (player.NEUpgrades.nonRepeatable.isBought[4]) ? getNNEUpgradeEffect("5") : new Decimal(1) )
            .times( (player.karmaUpgrades.nonRepeatable.isBought[9]) ? getNKaUpgradeEffect("10") : new Decimal(1) )
        case 2:
            return new Decimal(1)
            .times( (player.NEUpgrades.nonRepeatable.isBought[4]) ? getNNEUpgradeEffect("5") : new Decimal(1) )
            .times( (player.karmaUpgrades.nonRepeatable.isBought[9]) ? getNKaUpgradeEffect("10") : new Decimal(1) )
        case 3:
            return new Decimal(1)
            .times( (player.cakeUpgrades.nonRepeatable.isBought[2]) ? getNCUpgradeEffect("3") : new Decimal(1) )
            .times( (player.NEUpgrades.nonRepeatable.isBought[4]) ? getNNEUpgradeEffect("5") : new Decimal(1) )
            .times( (player.karmaUpgrades.nonRepeatable.isBought[9]) ? getNKaUpgradeEffect("10") : new Decimal(1) )
            
    }
}

function buyNormalNEUpgrade(i) {
    if (!player.NEUpgrades.nonRepeatable.isBought[i] && player.keys.gte(temp.NEUpgrades.nonRepeatable.cost[i]) && temp.NEUpgrades.nonRepeatable.isUnlocked[i]) {
        player.NEUpgrades.nonRepeatable.isBought[i] = true
        player.keys = player.keys.minus(temp.NEUpgrades.nonRepeatable.cost[i])
    }
}

function buyRepeatableNEUpgrade(i, amount) {
    if (amount == "singles") {
        if (  player.keys.gte(temp.NEUpgrades.repeatable.costFormula[i]())  ) {
            player.NEUpgrades.repeatable.levels[i] = player.NEUpgrades.repeatable.levels[i].add(1)
        }
    } else if (amount == "max") {
        if (  player.keys.gte(temp.NEUpgrades.repeatable.costFormula[i]())  ) {
            player.NEUpgrades.repeatable.levels[i] = temp.NEUpgrades.repeatable.levelGain[i]().plus(1)
        }
    }
}

function maxAllRNEUs() {
    for (i = 0; i < 3; i++) {
        buyRepeatableNEUpgrade(i, "max")
    }
}

function unlockNNEUs() {
    getNNEUsUnlocked = function() {
        if (player.karma.gt(0) || player.gainedKarma.gt(0) || player.prestigeStat[2].gt(0)) {
            return 8
        } else {
            return 3
        }
    }

    for (i = 0; i < getNNEUsUnlocked(); i++) {
        temp.NEUpgrades.nonRepeatable.isUnlocked[i] = true
    }
    for (i = getNNEUsUnlocked(); i < temp.NEUpgrades.nonRepeatable.isUnlocked.length; i++) {
        temp.NEUpgrades.nonRepeatable.isUnlocked[i] = false
        player.NEUpgrades.nonRepeatable.isBought[i] = false
    }
}

function generateKeys(diff) {
    basePassiveKeyGain = function() {
        return getKeyGain()
        .times(getRCUpgradeEffect("1").div(100))
        .times(diff)
    }

    player.keys = player.keys.add(basePassiveKeyGain())
    player.gainedKeys = player.gainedKeys.add(basePassiveKeyGain())
}