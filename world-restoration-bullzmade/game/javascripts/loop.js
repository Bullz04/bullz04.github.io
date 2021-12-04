function getTimeSpeed() {
    return new Decimal(1)
}

function gameLoop() {
    let now = Date.now();
    let diff = new Decimal((now - player.lastUpdate) / 1000).times(getTimeSpeed());
    if (diff.lt(0)) diff = new Decimal(0)

    generateJusticePoints(diff)
    generatePF(diff)
    generateCakes(diff)
    generateEmpoweredCakes()
    generateKeys(diff)
    forkTick(diff)

    player.lastUpdate = now
}