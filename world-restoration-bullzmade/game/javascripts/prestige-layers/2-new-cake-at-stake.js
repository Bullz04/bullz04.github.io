function getCakeGain() {
    let boost = function() {
        return new Decimal(1)
        .times(getRCUpgradeEffect("3"))
        .times( (player.cakeUpgrades.nonRepeatable.isBought[6]) ? getNCUpgradeEffect("7-Cakes") : new Decimal(1) )
        .times( (player.karmaUpgrades.nonRepeatable.isBought[0]) ? getNKaUpgradeEffect("1") : new Decimal(1) )
        .times( (player.achievementsGotten[39]) ? getAchRewards("40") : new Decimal(1) )
        .times( (temp.preciousEffect.isUnlocked[7]) ? getPFEffects("8") : new Decimal(1) )
        .times(getRKaUpgradeEffect("2"))
        .times(
            (temp.preciousEffect.isUnlocked[10])
            ? Decimal.log(player.empoweredCakes.plus(2), 2).pow(getPFEffects("11"))
            : new Decimal(1)
        )
        .times( (temp.preciousEffect.isUnlocked[13]) ? getPFEffects("14") : new Decimal(1) )

        .root( (player.theJudgement.isActive) ? new Decimal(10) : new Decimal(1) )
    }
    return Decimal.floor(
        player.keys.div(1e10).root(15)
        .times(boost())
        .times( (eval(temp.prestigeRequirements.resource[1]).gte(temp.prestigeRequirements.amountRequired[1])) ? 1 : 0 )
    )
}

function getEmpoweredCakeBoosts() {
    return new Decimal(1)
    .times( (player.cakeUpgrades.nonRepeatable.isBought[4]) ? getNCUpgradeEffect("5") : new Decimal(1) )
    .times( (player.cakeUpgrades.nonRepeatable.isBought[6]) ? getNCUpgradeEffect("7-EmpoweredCakes") : new Decimal(1) )
    .times( (temp.preciousEffect.isUnlocked[2]) ? getPFEffects("3") : new Decimal(1) )
    .times(
        (temp.preciousEffect.isUnlocked[10])
        ? Decimal.log(player.cakes.plus(2), 2).pow(getPFEffects("11"))
        : new Decimal(1)
    )


    .root( (player.theJudgement.isActive) ? new Decimal(10) : new Decimal(1) )
}

function enableDisableBrakeAtFlake() {
    if (player.brakeAtFlake.isActive == true) {
        player.brakeAtFlake.isActive = false

        player.empoweredCakes = player.empoweredCakes.add(getEmpoweredCakeGain())
        prestige(1, false)
    } else {
        player.brakeAtFlake.isActive = true

        prestige(1, false)
    }
}

function getAutoEmpCakeGainRate() {
    return new Decimal(1)
    .times( (player.achievementsGotten[36]) ? getAchRewards("37") : new Decimal(0) )
}

function getEmpoweredCakeGain(type = "normal") {
    if (type == "normal") {
        return player.keys.div(1e30).root(45)
        .times(getEmpoweredCakeBoosts())
        .floor()
        .minus(player.empoweredCakes)
        .max(0)
    } else if (type == "passive") {
        return player.keys.div( (player.cakeUpgrades.nonRepeatable.isBought[0]) ? getNCUpgradeEffect("1") : new Decimal(1) ).div(1e30).root(45)
        .times(getEmpoweredCakeBoosts())
        .floor()
        .minus(player.empoweredCakes)
        .max(0)
    }
}

function getNextEmpoweredCake(type = "normal") {
    if (type = "normal") {
        return player.empoweredCakes.plus( (player.brakeAtFlake.isActive) ? getEmpoweredCakeGain() : 0 ).plus(1)
        .div(getEmpoweredCakeBoosts())
        .pow(45)
        .times(1e30)
    } else if (type == "passive") {
        return player.empoweredCakes.plus( (player.brakeAtFlake.isActive) ? getEmpoweredCakeGain() : 0 ).plus(1)
        .div(getEmpoweredCakeBoosts())
        .pow(45)
        .times(1e30)
        .times( (player.cakeUpgrades.nonRepeatable.isBought[0]) ? getNCUpgradeEffect("1") : new Decimal(1) )
    }
}

function getEmpoweredCakeEffect() {
    return Decimal.log(player.repelledForks.plus(10), 10).root(2).pow(1.5)
    .pow(Decimal.log(player.empoweredCakes.plus(1), 2).root(3))
    .pow( (player.karmaUpgrades.nonRepeatable.isBought[27]) ? getNKaUpgradeEffect("28") : new Decimal(1) )
}

function getNCaSGain() {
    return new Decimal(1)
}

function getRCUpgradeEffect(text) {
    switch (text+"") {
        case "1":
            return player.cakeUpgrades.repeatable.levels[0].times(0.5)
        case "2":
            return Decimal.log(player.keys.plus(10), 10).root(6).pow(player.cakeUpgrades.repeatable.levels[1])
        case "3":
            return Decimal.log(player.cakes.plus(10), 10).root(2).pow(player.cakeUpgrades.repeatable.levels[2])
            .pow( (temp.preciousEffect.isUnlocked[6]) ? getPFEffects("7") : new Decimal(1) )
        case "4": {
            let sc = getRCUpgradeSoftcap("4")
            return (
                player.cakeUpgrades.repeatable.levels[3].min(sc)
                .add(player.cakeUpgrades.repeatable.levels[3].max(sc).minus(sc).pow(0.5))
            ).div(2).plus(1)
        }
    }
}

function getRCUpgradeSoftcap(text) {
    switch (text+"") {
        case "4":
            return new Decimal(1000)
            .times( (player.karmaUpgrades.nonRepeatable.isBought[19]) ? getNKaUpgradeEffect("20") : new Decimal(1) )
    }
}

function getNCUpgradeEffect(text) {
    switch (text+"") {
        case "1":
            return player.gainedCakes.times(0.05).plus(1).pow(1.5)
            .times(Decimal.log(player.gainedCakes.plus(10), 10).pow(6))
            .pow( (player.brakeAtFlake.isActive) ? 0 : 1 )
            .pow( (player.karmaUpgrades.nonRepeatable.isBought[6]) ? getNKaUpgradeEffect("7") : new Decimal(1) )
        case "2":
            return Decimal.log(player.repelledForks.plus(10), 10).root(3).times(4)
            .pow( (player.karmaUpgrades.nonRepeatable.isBought[2]) ? getNKaUpgradeEffect("3") : new Decimal(1) )
        case "3":
            return Decimal.log(Decimal.log(player.gainedCakes.plus(1.5), 1.5).plus(9), 10)
        case "4":
            return new Decimal(2)
        case "5":
            return Decimal.log(player.cakes.plus(10), 10)
            .pow( (player.karmaUpgrades.nonRepeatable.isBought[3]) ? getNKaUpgradeEffect("4") : new Decimal(1) )
        case "6-Forks": case "6.1":
            return Decimal.log(player.keys.plus(10), 10).times(3)
            .pow(
                Decimal.log(Decimal.log(player.keys.plus(10), 10).plus(9), 10)
            )
            .pow( (player.karmaUpgrades.nonRepeatable.isBought[22]) ? getNKaUpgradeEffect("23") : new Decimal(1) )
        case "6-Keys": case "6.2":
            return Decimal.log(player.repelledForks.plus(10), 10).times(3)
            .pow(
                Decimal.log(Decimal.log(player.repelledForks.plus(10), 10).plus(9), 10)
            )
        case "7.1": case "7-Cakes"://To cakes
            return Decimal.log(player.empoweredCakes.plus(10), 10)
        case "7.2": case "7-EmpoweredCakes": case "7-EmpCakes"://To Empowered Cakes
            return Decimal.log(player.cakes.plus(10), 10)
        case "8":
            return player.empoweredCakes.div(1e4).plus(1)
    }
}

function getUniversalRCUDiscs() {
    return new Decimal(1)
}

function getRCUDiscounts(x) {
    switch (x+1) {
        case 1:
            return new Decimal(1)
            .times(getUniversalRCUDiscs())
        case 2:
            return new Decimal(1)
            .times( (player.cakeUpgrades.nonRepeatable.isBought[7]) ? getNCUpgradeEffect("8") : new Decimal(1) )
            .times(getUniversalRCUDiscs())
        case 3:
            return new Decimal(1)
            .times( (player.cakeUpgrades.nonRepeatable.isBought[7]) ? getNCUpgradeEffect("8") : new Decimal(1) )
            .times(getUniversalRCUDiscs())
        case 4:
            return new Decimal(1)
            .times(getUniversalRCUDiscs())
        default:
            return new Decimal(1)
    }
}

function getRCUScalingWeaknesses(x) {
    switch(x+1) {
        case 1:
            return new Decimal(1)
        case 2:
            return new Decimal(1)
            .times( (player.achievementsGotten[48]) ? getAchRewards("49-SW-RCU-2") : new Decimal(1) )
        case 3:
            return new Decimal(1)
            .times( (player.achievementsGotten[48]) ? getAchRewards("49-SW-RCU-3") : new Decimal(1) )
            .times( (player.karmaUpgrades.nonRepeatable.isBought[10] && player.theJudgement.isActive) ? getNKaUpgradeEffect("11") : new Decimal(1) )
        case 4:
            return new Decimal(1)
            .times( (temp.preciousEffect.isUnlocked[5]) ? getPFEffects("6") : new Decimal(1) )
        default:
            return new Decimal(1)
    }
}

function buyNormalCakeUpgrade(i) {
    if (!player.cakeUpgrades.nonRepeatable.isBought[i] && player.cakes.gte(temp.cakeUpgrades.nonRepeatable.cost[i]) && temp.cakeUpgrades.nonRepeatable.isUnlocked[i]) {
        player.cakeUpgrades.nonRepeatable.isBought[i] = true
        player.cakes = player.cakes.minus(temp.cakeUpgrades.nonRepeatable.cost[i])
    }
}

function buyRepeatableCakeUpgrade(i, amount) {
    if (amount == "singles") {
        if (  player.cakes.gte(temp.cakeUpgrades.repeatable.costFormula[i]())  ) {
            player.cakeUpgrades.repeatable.levels[i] = player.cakeUpgrades.repeatable.levels[i].add(1)
        }
    } else if (amount == "max") {
        if (  player.cakes.gte(temp.cakeUpgrades.repeatable.costFormula[i]())  ) {
            player.cakeUpgrades.repeatable.levels[i] = temp.cakeUpgrades.repeatable.levelGain[i]().plus(1)
        }
    }
}

function unlockNCUs() {
    getNCUsUnlocked = function() {
        if (temp.unlockCondition.empCakes()) {
            return 8
        } else {
            return 4
        }
    }

    for (i = 0; i < getNCUsUnlocked(); i++) {
        temp.cakeUpgrades.nonRepeatable.isUnlocked[i] = true
    }
    for (i = getNCUsUnlocked(); i < temp.cakeUpgrades.nonRepeatable.isUnlocked.length; i++) {
        temp.cakeUpgrades.nonRepeatable.isUnlocked[i] = false
        player.cakeUpgrades.nonRepeatable.isBought[i] = false
    }
}

function maxAllRCUs() {
    for (i = 0; i < 4; i++) {
        buyRepeatableCakeUpgrade(i, "max")
    }
}

function generateCakes(diff) {
    basePassiveCakeGain = function() {
        return getCakeGain()
        .times(getRKaUpgradeEffect("1").div(100))
        .times(diff)
    }

    player.cakes = player.cakes.add(basePassiveCakeGain())
    player.gainedCakes = player.gainedCakes.add(basePassiveCakeGain())
}

function generateEmpoweredCakes() {
    player.empoweredCakes = player.empoweredCakes.add(
        getEmpoweredCakeGain("passive")
        .times(getAutoEmpCakeGainRate())
    )
}