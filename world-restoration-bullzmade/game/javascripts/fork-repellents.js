function getForkBaseProduction() {
    let baseProduction = new Decimal(0)
    for (i = 0; i < player.forkRepellentAmounts.length; i++) {
        if (i == 0) {
            baseProduction = baseProduction.add(
                player.forkRepellentAmounts[i]
                .times(
                    Decimal.pow(1.1, player.forkRepellentAmounts[i])
                )
                .div(1.1)
            )
        } else {
            baseProduction = baseProduction.add(
                player.forkRepellentAmounts[i]
                .times(
                    Decimal.pow(1.1, player.forkRepellentAmounts[i])
                )
            )
        }
    }
    return baseProduction
}

function buyForkRepellents(amount, i) {
    if (amount == "singles") {
        if ( player.repelledForks.gte(temp.forkRepellent.costFormula[i]()) && temp.forkRepellent.isUnlocked[i] ) {
            player.forkRepellentAmounts[i] = player.forkRepellentAmounts[i].add(1)
        }
    } else if (amount == "max") {
        if ( player.repelledForks.gte(temp.forkRepellent.costFormula[i]()) && temp.forkRepellent.isUnlocked[i] ) {
            player.forkRepellentAmounts[i] = temp.forkRepellent.amountGain[i]().plus(1)
        }
    }
}

function maxAllFRs() {
    for (i = 0; i < 12; i++) {
        buyForkRepellents("max", i)
    }
}

function getTotalFRs() {
    let totalAmount = new Decimal(0)
    for (i = 0; i < player.forkRepellentAmounts.length; i++) {
        totalAmount = totalAmount.add(player.forkRepellentAmounts[i])
    }
    return totalAmount
}

function unlockForkRepellents() {
    let getFRsUnlocked = function() {
        if (player.karma.gt(0) || player.gainedKarma.gt(0) || player.prestigeStat[2].gt(0)) {
            return 12
        } else if (player.cakes.gt(0) || player.gainedCakes.gt(0) || player.prestigeStat[1].gt(0)) {
            return 8
        } else if (player.keys.gt(0) || player.gainedKeys.gt(0) || player.prestigeStat[0].gt(0)) {
            return 4
        } else {
            return 1
        }
    }

    for (i = 0; i < getFRsUnlocked(); i++) {
        temp.forkRepellent.isUnlocked[i] = true
    }
    for (i = getFRsUnlocked(); i < temp.forkRepellent.isUnlocked.length; i++) {
        temp.forkRepellent.isUnlocked[i] = false
        player.forkRepellentAmounts[i] = new Decimal(0)
    }

}