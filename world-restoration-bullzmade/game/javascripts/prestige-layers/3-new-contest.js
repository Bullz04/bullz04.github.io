function getKarmaGain() {
    let boost = function() {
        return new Decimal(1)
        .times(getRKaUpgradeEffect("2"))
        .times(getRKaUpgradeEffect("3"))
        .times( (player.karmaUpgrades.nonRepeatable.isBought[4]) ? getNKaUpgradeEffect("5") : new Decimal(1) )
        .times( (temp.preciousEffect.isUnlocked[4]) ? getPFEffects("5") : new Decimal(1) )
        .times( (player.achievementsGotten[34]) ? getAchRewards("35-Karma") : new Decimal(1))
        .times( (player.achievementsGotten[35]) ? getAchRewards("36-Karma") : new Decimal(1))
        .times(getJusticePointEffects("Karma"))
        .times( (player.karmaUpgrades.nonRepeatable.isBought[12]) ? getNKaUpgradeEffect("13-Karma") : new Decimal(1) )
    }
    return Decimal.floor(
        Decimal.log(player.cakes.div(1e20).plus(2), 3).pow(1/3)
        .times(boost())
    )
}

function getNCgain() {
    return new Decimal(1)
}

function getNKaUsBought() {
    var upgradesBought = 0
    for (i = 0; i < player.karmaUpgrades.nonRepeatable.isBought.length; i++) {
        var isBought = true
        if (!player.karmaUpgrades.nonRepeatable.isBought[i]) isBought = false
        if (isBought) {
            upgradesBought++
        }
    }
    return upgradesBought
}

function buyNormalKarmaUpgrade(i) {
    if ( !player.karmaUpgrades.nonRepeatable.isBought[i] && player.karma.gte( temp.karmaUpgrades.nonRepeatable.cost[i] ) ) {
        player.karma = player.karma.minus(temp.karmaUpgrades.nonRepeatable.cost[i])
        player.karmaUpgrades.nonRepeatable.isBought[i] = true
    }
}

function buyRepeatableKarmaUpgrade(i, amount) {
    if (amount == "singles") {
        if (  player.karma.gte(temp.karmaUpgrades.repeatable.costFormula[i]())  ) {
            player.karmaUpgrades.repeatable.levels[i] = player.karmaUpgrades.repeatable.levels[i].add(1)
        }
    } else if (amount == "max") {
        if (  player.karma.gte(temp.karmaUpgrades.repeatable.costFormula[i]())  ) {
            player.karmaUpgrades.repeatable.levels[i] = temp.karmaUpgrades.repeatable.levelGain[i]().plus(1)
        }
    }
}

function maxAllRKaUs() {
    for (i = 0; i < 4; i++) {
        buyRepeatableKarmaUpgrade(i, "max")
    }
}

function getRKaUpgradeEffect(text) {
    switch (text+"") {
        case "1":
            return player.karmaUpgrades.repeatable.levels[0].times(0.125)
        case "2":
            return Decimal.log(player.cakes.plus(10), 10).pow(1/6).pow(player.karmaUpgrades.repeatable.levels[1])
        case "3":
            return Decimal.log(player.karma.plus(10), 10).pow(player.karmaUpgrades.repeatable.levels[2])
        case "4-BaseMult": case "4-Base":
            return new Decimal(4)
            .times( (player.karmaUpgrades.nonRepeatable.isBought[13]) ? getNKaUpgradeEffect("14") : new Decimal(1) )
        case "4": case "4-OverallEffect":
            return getRKaUpgradeEffect("4-Base").pow(player.karmaUpgrades.repeatable.levels[3])
    }
}

function getNKaUpgradeEffect(text) {
    switch (text+"") {
        case "1":
            return player.gainedKarma.plus(1).pow(3)
        case "2":
            return player.gainedKarma.times(100).plus(1).pow(1.25)
        case "3":
            return player.cakeUpgrades.repeatable.levels[2].plus(1)
        case "4":
            return player.cakeUpgrades.repeatable.levels[2].times(0.35).plus(1)
            .plus(player.cakeUpgrades.repeatable.levels[2].max(20).minus(20).pow(2).times(Math.PI / 100))//bruh
        case "5":
            return Decimal.log(player.preciousForks.plus(10), 10)
        case "6":
            return new Decimal(3)
        case "7":
            return new Decimal(250)
        case "8":
            return Decimal.log(player.karma.plus(10), 10)
            .pow( Decimal.log(Decimal.log(player.karma.plus(10), 10).plus(9), 10).pow(3) )
            
        case "9":
            return player.NEUpgrades.repeatable.levels[0].times(0.001).plus(1).pow(3)
        case "10":
            return Decimal.log(Decimal.log(player.repelledForks.plus(10), 10).plus(9), 10).pow(1/8)
        case "11":
            return Decimal.log(player.karma.plus(10), 10).root(2)
        case "12":
            return Decimal.log(player.justicePoints.plus(1), 2).pow(1.5).div(100)
        case "13.1": case "13-Karma":
            return Decimal.log(player.justicePoints.plus(10), 10)
            .pow( Decimal.log(Decimal.log(player.justicePoints.plus(10), 10).root(5).plus(9), 10).pow(4) )
            .pow(4)
        case "13.2": case "13-JusticePoints":
            return Decimal.log(player.karma.plus(10), 10)
            .pow( Decimal.log(Decimal.log(player.karma.plus(10), 10).root(5).plus(9), 10).pow(4) )
            .pow(4)
        case "14":
            return Decimal.log(player.karma.plus(10), 10)
            .pow( (player.karmaUpgrades.nonRepeatable.isBought[19]) ? getNKaUpgradeEffect("20") : new Decimal(1) )
        case "15":
            return Decimal.log(Decimal.log(player.repelledForks.plus(1), 10).plus(1), 10).times(0.2).plus(1)
        case "16":
            return new Decimal(1.2)
        case "17":
            return new Decimal(1.125)
        case "18":
            return Decimal.log(Decimal.log(player.justicePoints.div("1e400").plus(1), 10).plus(1), 10).times(0.2).plus(1)
            .pow(1.5)
        case "19":
            return Decimal.log(Decimal.log(player.karma.div("1e1125").plus(1), 10).plus(1), 10).times(0.2).plus(1)
            .pow(4)
        case "20":
            return Decimal.log(Decimal.log(player.karma.div("1e1125").plus(1), 10).plus(1), 10).times(0.1).plus(1)
            .pow(10)
    }
}

function getRKaUScalingWeaknesses(x) {
    switch(x+1) {
        case 1:
            return new Decimal(1)
        case 2:
            return new Decimal(1)
        case 3:
            return new Decimal(1)
        case 4:
            return new Decimal(1)
        default:
            return new Decimal(1)
    }
}

function unlockNKaUs() {
    getNKaUsUnlocked = function() {
        if (temp.unlockCondition.theJudgement()) {
            return 20
        } else {
            return 10
        }
    }

    for (i = 0; i < getNKaUsUnlocked(); i++) {
        temp.karmaUpgrades.nonRepeatable.isUnlocked[i] = true
    }
    for (i = getNKaUsUnlocked(); i < temp.karmaUpgrades.nonRepeatable.isUnlocked.length; i++) {
        temp.karmaUpgrades.nonRepeatable.isUnlocked[i] = false
        player.karmaUpgrades.nonRepeatable.isBought[i] = false
    }
}

function enableDisableTheJudgement() {
    if (player.theJudgement.isActive == true) {
        player.theJudgement.isActive = false

        player.justicePoints = player.justicePoints.add(getJusticePointGain())
        prestige(2, false)
    } else {
        player.theJudgement.isActive = true

        prestige(2, false)
    }
}

function getJusticePointGain() {
    let boost = function() {
        return new Decimal(1)
        .times( (player.karmaUpgrades.nonRepeatable.isBought[10]) ? getNKaUpgradeEffect("11") : new Decimal(1) )
        .times( (player.achievementsGotten[41]) ? getAchRewards("42") : new Decimal(1) )
        .times( (temp.preciousEffect.isUnlocked[9]) ? getPFEffects("10") : new Decimal(1) )
        .times( (player.karmaUpgrades.nonRepeatable.isBought[12]) ? getNKaUpgradeEffect("13-JusticePoints") : new Decimal(1) )
    }
    return Decimal.floor(
        Decimal.log(player.cakes.div(1e20).plus(2), 3).pow(1/3)
        .times(boost())
    )
}

function getJusticePointEffects(x) {
    switch (x+"") {
        case "1": case "Karma":
            return player.justicePoints.plus(1).root(2)
            .pow( (player.karmaUpgrades.nonRepeatable.isBought[15]) ? getNKaUpgradeEffect("16") : new Decimal(1) )
        case "2": case "KarmaReq":
            return player.justicePoints.plus(1).pow(3)
            .pow( (player.karmaUpgrades.nonRepeatable.isBought[15]) ? getNKaUpgradeEffect("16") : new Decimal(1) )
            .pow( (player.karmaUpgrades.nonRepeatable.isBought[17]) ? getNKaUpgradeEffect("18") : new Decimal(1) )
    }
}

function generateJusticePoints(diff) {
    player.justicePoints = player.justicePoints.add(
        getJusticePointGain()
        .times(diff)
        .times( (player.karmaUpgrades.nonRepeatable.isBought[11]) ? getNKaUpgradeEffect("12") : new Decimal(0) )
    )
}