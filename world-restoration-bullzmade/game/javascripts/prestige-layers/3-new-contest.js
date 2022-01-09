function getKarmaGain() {
    let boost = function() {
        return new Decimal(1)
        .times(getRKaUpgradeEffect("3"))
        .times( (player.karmaUpgrades.nonRepeatable.isBought[4]) ? getNKaUpgradeEffect("5") : new Decimal(1) )
        .times( (temp.preciousEffect.isUnlocked[4]) ? getPFEffects("5") : new Decimal(1) )
        .times( (player.achievementsGotten[34]) ? getAchRewards("35-Karma") : new Decimal(1))
        .times( (player.achievementsGotten[35]) ? getAchRewards("36-Karma") : new Decimal(1))
        .times( (player.karmaUpgrades.nonRepeatable.isBought[12]) ? getNKaUpgradeEffect("13-Karma") : new Decimal(1) )
        .times( (player.karmaUpgrades.nonRepeatable.isBought[15]) ? getNKaUpgradeEffect("16-Karma") : new Decimal(1) )
        .times( (player.karmaUpgrades.nonRepeatable.isBought[18]) ? getNKaUpgradeEffect("19-Karma") : new Decimal(1) )
        .times( (player.karmaUpgrades.nonRepeatable.isBought[20]) ? getNKaUpgradeEffect("21") : new Decimal(1) )
    }
    return Decimal.floor(
        player.cakes.div(1e20).root(24).pow(1.1)
        .times(boost())
        .times( (eval(temp.prestigeRequirements.resource[2]).gte(temp.prestigeRequirements.amountRequired[2])) ? 1 : 0 )
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
    if ( !player.karmaUpgrades.nonRepeatable.isBought[i] && player.karma.gte( temp.karmaUpgrades.nonRepeatable.cost[i] ) && temp.karmaUpgrades.nonRepeatable.isUnlocked[i]) {
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
            return player.karmaUpgrades.repeatable.levels[0].times(2)
        case "2":
            return Decimal.log(player.cakes.plus(10), 10).pow(player.karmaUpgrades.repeatable.levels[1])
        case "3":
            return Decimal.log(player.karma.plus(10), 10).root(3).pow(player.karmaUpgrades.repeatable.levels[2])
        case "4-BaseMult": case "4-Base":
            return new Decimal(5)
            .times( (player.karmaUpgrades.nonRepeatable.isBought[13]) ? getNKaUpgradeEffect("14") : new Decimal(1) )
            .times( (player.karmaUpgrades.nonRepeatable.isBought[21]) ? getNKaUpgradeEffect("22") : new Decimal(1) )
        case "4": case "4-OverallEffect":
            return getRKaUpgradeEffect("4-Base").pow(player.karmaUpgrades.repeatable.levels[3])
    }
}

function getNKaUpgradeEffect(text) {
    switch (text+"") {
        case "1":
            return player.gainedKarma.div(100).plus(1).pow(3)
            .times(Decimal.log(player.gainedKarma.plus(10), 10).pow(3))
            .pow( (player.theJudgement.isActive) ? 0 : 1 )
        case "2":
            return (
                Decimal.min(player.gainedKarma, getNKaUpgradeSoftcap("2"))
                .times(   ExpPower(Decimal.max(player.gainedKarma, getNKaUpgradeSoftcap("2")).div(getNKaUpgradeSoftcap("2")), 4, 1/2).root(3)  )
            ).plus(1).pow(18)
        case "3":
            return player.cakeUpgrades.repeatable.levels[2].times(2).plus(1)
        case "4":
            return player.cakeUpgrades.repeatable.levels[2].times(0.15).plus(1)//bruh
        case "5":
            return Decimal.log(player.preciousForks.plus(10), 10).root(3)
        case "6":
            return new Decimal(3)
        case "7":
            return new Decimal(2)
        case "8":
            return Decimal.log(player.karma.plus(10), 10).pow(2)
            .pow( Decimal.log(Decimal.log(player.karma.plus(10), 10).plus(9), 10) )
            .pow( (player.karmaUpgrades.nonRepeatable.isBought[23]) ? getNKaUpgradeEffect("24") : new Decimal(1) )
            .pow( (player.karmaUpgrades.nonRepeatable.isBought[26]) ? getNKaUpgradeEffect("27-NKaU-8") : new Decimal(1) )
        case "9":
            return player.NEUpgrades.repeatable.levels[0].times(0.003).plus(1)
        case "10":
            return Decimal.log(Decimal.log(player.repelledForks.plus(10), 10).plus(9), 10).root(8).pow(1.5)
        case "11":
            return new Decimal(5.75)
        case "12":
            return Decimal.log(player.justicePoints.plus(2), 2).div(75)
        case "13.1": case "13-Karma":
            return Decimal.log(player.justicePoints.plus(10), 10).pow(2)
            .pow( Decimal.log(Decimal.log(player.justicePoints.plus(10), 10).root(5).plus(9), 10).pow(4) )
            .pow( (player.karmaUpgrades.nonRepeatable.isBought[22]) ? getNKaUpgradeEffect("23") : new Decimal(1) )
        case "13.2": case "13-JusticePoints":
            return Decimal.log(player.karma.plus(10), 10).root(2)
            .pow( Decimal.log(Decimal.log(player.karma.plus(10), 10).root(5).plus(9), 10).pow(4) )
            .pow( (player.karmaUpgrades.nonRepeatable.isBought[22]) ? getNKaUpgradeEffect("23") : new Decimal(1) )
        case "14":
            return player.karmaUpgrades.repeatable.levels[3].times(0.015).plus(1)
        case "15":
            return Decimal.log(Decimal.log(player.repelledForks.plus(1), 10).plus(1), 10)
            .times(0.5).plus(1).root(3)
        case "16.1": case "16-JusticePoints":
            return Decimal.log(player.repelledForks.plus(10), 10).pow(1.3)
        case "16.2": case "16-Karma":
            return Decimal.log(player.repelledForks.plus(10), 10).root(2).pow(1.05)
            .pow(
                Decimal.log(Decimal.log(player.repelledForks.plus(1), 10).plus(1), 10)
                .times(1.5).plus(1)
            )
        case "17":
            return new Decimal(1.2)
        case "18":
            return Decimal.log(Decimal.log(player.karma.plus(1), 10).plus(1), 10)
            .times(0.02).plus(1)
        case "19-Karma": case "19.1":
            return Decimal.log(player.preciousForks.plus(10), 10)
            .pow(
                Decimal.log(Decimal.log(player.preciousForks.plus(1), 10).plus(1), 10)
                .plus(1).pow(2)
            )
        case "19-PreciousForks": case "19-PF": case "19.2":
            return Decimal.log(player.karma.plus(10), 10).pow(1.4)
            .pow(
                Decimal.log(Decimal.log(player.karma.plus(1), 10).plus(1), 10)
                .times(1/3).plus(1)
            )
        case "20":
            return Decimal.log(player.karma.div("1e414").plus(1), 10).times(0.09).plus(1)
            .root(4)
        case "21":
            return Decimal.log(player.repelledForks.plus(10), 10)
            .pow(
                Decimal.log(Decimal.log(player.repelledForks.root(1000).plus(1), 10).plus(1), 1.5)
            )
        case "22":
            return player.karmaUpgrades.repeatable.levels[3].times(0.01).plus(1).pow(3)
        case "23":
            return Decimal.log(Decimal.log(player.repelledForks.plus(1), 10).plus(1), 10)
            .times(0.25).plus(1)
            .pow(2)
        case "24":
            return Decimal.log(Decimal.log(player.karma.plus(1), 10).plus(1), 10)
            .times(0.2).plus(1).pow(4)
        case "25":
            return Decimal.log(Decimal.log(player.karma.plus(1), 10).plus(1), 10)
            .times(0.3).plus(1)
        case "26":
            return new Decimal(2)
        case "27-NKaU-8": case "27-Eff-NKaU-8": case "27.1":
            return Decimal.log(Decimal.log(player.karma.root(10).plus(1), 10).plus(1), 10)
            .times(0.07).plus(1).pow(5)
        case "27-PFE-9": case "27.2":
            return Decimal.log(Decimal.log(player.karma.root(10).plus(1), 10).plus(1), 10)
            .times(0.5).plus(1)
        case "28":
            return Decimal.log(Decimal.log(player.empoweredCakes.plus(1), 10).plus(1), 10)
            .times(0.55).plus(1).pow(4)
    }
}

function getNKaUpgradeSoftcap(text) {
    switch (text+"") {
        case "2":
            return new Decimal(1e3)
            .times(getJusticePointEffects("Softcap-NKaU-2"))
    }
}

function getUniversalRKaUDiscs() {
    return new Decimal(1)
}

function getRKaUDiscounts(x) {
    switch (x+1) {
        case 1:
            return new Decimal(1)
            .times(getUniversalRKaUDiscs())
        case 2:
            return new Decimal(1)
            .times(getUniversalRKaUDiscs())
        case 3:
            return new Decimal(1)
            .times(getUniversalRKaUDiscs())
        case 4:
            return new Decimal(1)
            .times(getUniversalRKaUDiscs())
        default:
            return new Decimal(1)
    }
}

function getRKaUScalingWeaknesses(x) {
    switch(x+1) {
        case 1:
            return new Decimal(1)
        case 2:
            return new Decimal(1)
            .times( (player.achievementsGotten[49]) ? getAchRewards("50") : new Decimal(1) )
        case 3:
            return new Decimal(1)
            .times( (player.achievementsGotten[49]) ? getAchRewards("50") : new Decimal(1) )
        case 4:
            return new Decimal(1)
            .times( (player.achievementsGotten[49]) ? getAchRewards("50") : new Decimal(1) )
        default:
            return new Decimal(1)
    }
}

function unlockNKaUs() {
    getNKaUsUnlocked = function() {
        if (temp.unlockCondition.theJudgement()) {
            return 28
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
        player.repelledForks = new Decimal(0)
        player.keys = new Decimal(0)
        player.gainedKeys = new Decimal(0)
        player.cakes = new Decimal(0)
        player.gainedCakes = new Decimal(0)
        player.empoweredCakes = new Decimal(0)
    }
}

function getJusticePointGain(type = "normal") {
    let boost = function() {
        return new Decimal(1)
        .times( (player.achievementsGotten[46]) ? getAchRewards("47") : new Decimal(1) )
        .times( (temp.preciousEffect.isUnlocked[9]) ? getPFEffects("10") : new Decimal(1) )
        .times( (player.karmaUpgrades.nonRepeatable.isBought[12]) ? getNKaUpgradeEffect("13-JusticePoints") : new Decimal(1) )
        .times( (player.karmaUpgrades.nonRepeatable.isBought[15]) ? getNKaUpgradeEffect("16-JusticePoints") : new Decimal(1) )
    }
    if (type == "normal") {
        return Decimal.floor(
            player.cakes.div(1e20).root(24).root(7.5).pow(1.1)
            .times(boost())
        )
    } else if (type == "passive") {
        return Decimal.floor(
            player.cakes
            .div( (player.karmaUpgrades.nonRepeatable.isBought[0]) ? getNKaUpgradeEffect("1") : new Decimal(1) )
            .div(1e20).root(240).root(8).pow(1.1)
            .times(boost())
        )
    }
}

function getJusticePointEffects(x) {
    switch (x+"") {
        case "1": case "Softcap-NKaU-2":
            return player.justicePoints.plus(1).pow(1.1)
            .pow( (player.karmaUpgrades.nonRepeatable.isBought[25]) ? getNKaUpgradeEffect("26") : new Decimal(1) )
        case "2": case "KarmaPreExtReq":
            return player.justicePoints.plus(1).pow(4)
    }
}

function generateJusticePoints(diff) {
    player.justicePoints = player.justicePoints.add(
        getJusticePointGain("passive")
        .times(diff)
        .times( (player.karmaUpgrades.nonRepeatable.isBought[11]) ? getNKaUpgradeEffect("12") : new Decimal(0) )
    )
}