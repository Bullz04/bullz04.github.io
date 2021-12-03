function getCakeGain() {
    let boost = function() {
        return new Decimal(1)
        .times(getRCUpgradeEffect("2"))
        .times(getRCUpgradeEffect("3"))
        .times( (player.cakeUpgrades.nonRepeatable.isBought[6]) ? getNCUpgradeEffect("7-Cakes") : new Decimal(1) )
        .times( (player.karmaUpgrades.nonRepeatable.isBought[0]) ? getNKaUpgradeEffect("1") : new Decimal(1) )
        .times( (player.achievementsGotten[39]) ? getAchRewards("40") : new Decimal(1) )
        .times( (temp.preciousEffect.isUnlocked[7]) ? getPFEffects("8") : new Decimal(1) )
        .times(
            (temp.preciousEffect.isUnlocked[10])
            ? Decimal.log(player.empoweredCakes.plus(2), 2).pow(getPFEffects("11"))
            : new Decimal(1)
        )

        .root( (player.theJudgement.isActive) ? new Decimal(10) : new Decimal(1) )
    }
    return Decimal.floor(
        Decimal.log(player.keys.div(1e10).plus(2), 3).pow(1/2)
        .times(boost())
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

function getEmpoweredCakeGain() {
    return Decimal.log(player.keys.div(1e10).max(1), 1e8).pow(2)
    .times(getEmpoweredCakeBoosts())
    .floor()
    .minus(player.empoweredCakes)
    .max(0)
}

function getNextEmpoweredCake() {
    return Decimal.pow(
        1e8,
        
        player.empoweredCakes.plus( (player.brakeAtFlake.isActive) ? getEmpoweredCakeGain() : 0 )
        .plus(1)
        .div(getEmpoweredCakeBoosts())
        .pow(1/2)
    )
    .times(1e10)
}

function getEmpoweredCakeEffect() {
    return Decimal.log(player.keys.plus(10), 10)
    .pow(Decimal.log(player.empoweredCakes.plus(1), 2))
}

function getNCaSGain() {
    return new Decimal(1)
}

function getRCUpgradeEffect(text) {
    switch (text+"") {
        case "1":
            return player.cakeUpgrades.repeatable.levels[0].times(0.1)
        case "2":
            return Decimal.log(player.keys.plus(10), 10).pow(1/6).pow(player.cakeUpgrades.repeatable.levels[1])
        case "3":
            return Decimal.log(player.cakes.plus(10), 10).pow(player.cakeUpgrades.repeatable.levels[2])
            .pow( (temp.preciousEffect.isUnlocked[6]) ? getPFEffects("7") : new Decimal(1) )
        case "4":
            return (
                player.cakeUpgrades.repeatable.levels[3].min(2000)
                .add(player.cakeUpgrades.repeatable.levels[3].max(2000).minus(2000).pow(0.5))
            ).div(3).plus(1)
    }
}

function getNCUpgradeEffect(text) {
    switch (text+"") {
        case "1":
            return player.gainedCakes.plus(1).pow(2)
            .pow( (player.brakeAtFlake.isActive) ? 0 : 1 )
            .pow(getRCUpgradeEffect("4"))
        case "2":
            return Decimal.log(player.repelledForks.plus(10), 10).times(1.2).pow(4)
        case "3":
            return Decimal.log(Decimal.log(player.gainedCakes.plus(1.5), 1.5).plus(9), 10)
        case "4":
            return player.NEUpgrades.repeatable.levels[0].times(0.02).plus(1)
        case "5":
            return Decimal.log(player.cakes.plus(10), 10)
            .pow( (player.karmaUpgrades.nonRepeatable.isBought[3]) ? getNKaUpgradeEffect("4") : new Decimal(1) )
        case "6":
            return Decimal.log(player.repelledForks.plus(1000), 1000).times(1.05).pow(16)
            .pow(
                Decimal.log(Decimal.log(player.repelledForks.plus(10), 10).plus(9), 10)
            )
        case "7.1": case "7-Cakes"://To cakes
            return Decimal.log(player.empoweredCakes.plus(10), 10).pow(3)
            .pow( (player.karmaUpgrades.nonRepeatable.isBought[2]) ? getNKaUpgradeEffect("3") : new Decimal(1) )
        case "7.2": case "7-EmpoweredCakes": case "7-EmpCakes"://To Empowered Cakes
            return Decimal.log(player.cakes.plus(10), 10)
            .pow( (player.karmaUpgrades.nonRepeatable.isBought[2]) ? getNKaUpgradeEffect("3") : new Decimal(1) )
        case "8":
            return player.empoweredCakes.plus(1)
    }
}

function getUniversalRCUDiscs() {
    return new Decimal(1)
    .times( (player.karmaUpgrades.nonRepeatable.isBought[1]) ? getNKaUpgradeEffect("2") : new Decimal(1) )
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
        case 3:
            return new Decimal(1)
        case 4:
            return new Decimal(1)
            .times( (temp.preciousEffect.isUnlocked[5]) ? getPFEffects("6") : new Decimal(1) )
        default:
            return new Decimal(1)
    }
}

function buyNormalCakeUpgrade(i) {
    if (!player.cakeUpgrades.nonRepeatable.isBought[i] && player.cakes.gte(temp.cakeUpgrades.nonRepeatable.cost[i])) {
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
        getEmpoweredCakeGain()
        .times(getAutoEmpCakeGainRate())
    )
}