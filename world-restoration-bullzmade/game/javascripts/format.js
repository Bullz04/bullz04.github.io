var shortPrefixes1_1 = ['', 'U', 'D', 'T', 'Qa', 'Qt', 'Sx', 'Sp', 'O', 'N']
var shortPrefixes1_2 = ['', 'Dc', 'Vg', 'Tg', 'Qd', 'Qi', 'Se', 'St', 'Og', 'Nn']
var shortPrefixes1_3 = ['', 'Ce', 'Dn', 'Tc', 'Qe', 'Qu', 'Sc', 'Si', 'Oe', 'Ne']

var longPrefixes1_1 = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion']
var longPrefixes1_2 = ['', 'un', 'duo', 'tre', 'quattuor', 'quin', 'sex', 'septen', 'octo', 'novem']
var longPrefixes2_1 = ['', 'decillion', 'vigintillion', 'trigintillion', 'quadragintillion', 'quinquagintillion', 'sexagintillion', 'septuagintillion', 'octogintillion', 'nonagintillion']
var longPrefixes2_2 = ['', 'deci', 'viginta', 'triginta', 'quadraginta', 'quinquaginta', 'sexaginta', 'septuaginta', 'octoginta', 'nonaginta']






function format(amount, places = 3, placesUnder1000 = 1, notation = player.options.notation) {
    amount = new Decimal(amount)
    if (places >= player.options.maxPrecision) places = Math.min(places, player.options.maxPrecision)
    if (placesUnder1000 >= player.options.maxPrecisionUnder1000) placesUnder1000 = Math.min(placesUnder1000, player.options.maxPrecisionUnder1000)
    

    let power = amount.log10().floor()
    let powerAntime = amount.log10().div(3).floor()
    let mantissa = Decimal.div(amount, Decimal.pow(10, power))
        //.times(Decimal.pow(10, places))
        //.floor()
        //.div(Decimal.pow(10, places))
    let mantissaAntime = Decimal.div(amount, Decimal.pow(1000, powerAntime))
        //.times(Decimal.pow(10, places))
        //.floor()
        //.div(Decimal.pow(10, places))
    let lol = mantissa.toNumber()
    let lolAntime = mantissaAntime.toNumber()
    //Ignore the "antime" stuff you cannot understand it


    /*
    if (amount instanceof Decimal) {
	   var power = amount.e
	   var matissa = amount.mantissa
	} else {
		var matissa = value / Math.pow(10, Math.floor(Math.log10(value)));
		var power = Math.floor(Math.log10(value));
	}
    
    
    */

    if (amount.lt(0)) return "-" + format(amount.times(-1), places, placesUnder1000, notation)

    if (amount.lt(1e3)) return amount.toNumber().toFixed(placesUnder1000)

    if (notation === "scientific") {
        if (power.gte("1e15")) return "e" + format(Decimal.log10(amount), 5, placesUnder1000, "scientific")
        if (power.gte("1e9")) return lol.toFixed(places) + "e" + format(Decimal.log10(amount), 5, placesUnder1000, "scientific")
        return lol.toFixed(places) + "e" + power.toNumber().toLocaleString("en-US")
    }

    if (notation === "engineering") {
        if (power.gte("1e15")) return "e" + format(Decimal.log10(amount), 5, placesUnder1000, "engineering")
        if (power.gte("1e9")) return lolAntime.toFixed(places) + "e" + format(Decimal.log10(amount), 5, placesUnder1000, "engineering")
        return lolAntime.toFixed(places) + "e" + (powerAntime.times(3)).toNumber().toLocaleString("en-US")
    }

    if (notation === "true-scientific") {
        if (power.gte("1e15")) return "10<sup>" + format(Decimal.log10(amount), 5, placesUnder1000, "true-scientific") + "</sup>"
        if (power.gte("1e9")) return lol.toFixed(places)  + "&times;10<sup>" + format(Decimal.log10(amount), 5, placesUnder1000, "true-scientific") + "</sup>"
        return lol.toFixed(places) + "&times;10<sup>" + power.toNumber().toLocaleString("en-US") + "</sup>"
    }

    if (notation === "true-engineering") {
        if (power.gte("1e15")) return "10<sup>" + format(Decimal.log10(amount), 5, placesUnder1000, "true-engineering") + "</sup>"
        if (power.gte("1e9")) return lolAntime.toFixed(places) + "&times;10<sup>" + format(Decimal.log10(amount), 5, placesUnder1000, "true-engineering") + "</sup>"
        return lolAntime.toFixed(places) + "&times;10<sup>" + powerAntime.times(3).toNumber().toLocaleString("en-US") + "</sup>"
    }

    if (notation === "standard") {
        let AAA = Math.floor(power.toNumber() - 3)
        let tempShortSuffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qt', 'Sx', 'Sp', 'Oc', 'No', 'Dc']
        let result = shortPrefixes1_1[Math.floor((Math.max(AAA, 0) / 3)) % 10] + shortPrefixes1_2[Math.floor((Math.max(AAA, 0) / 30)) % 10] + shortPrefixes1_3[Math.floor((Math.max(AAA, 0) / 300)) % 10]
        let result2 = ((Math.floor((Math.max(AAA, 0))) % 3000000) >= 6000) ? shortPrefixes1_1[Math.floor((Math.max(AAA, 0) / 3000)) % 10] + shortPrefixes1_2[Math.floor((Math.max(AAA, 0) / 30000)) % 10] + shortPrefixes1_3[Math.floor((Math.max(AAA, 0) / 300000)) % 10] + "MI" : (((Math.floor((Math.max(AAA, 0))) % 3000000) >= 3000) ? "MI" : "")
        let result3 = ((Math.floor((Math.max(AAA, 0))) % 3000000000) >= 6000000) ? shortPrefixes1_1[Math.floor((Math.max(AAA, 0) / 3000000)) % 10] + shortPrefixes1_2[Math.floor((Math.max(AAA, 0) / 30000000)) % 10] + shortPrefixes1_3[Math.floor((Math.max(AAA, 0) / 300000000)) % 10] + "MC" : (((Math.floor((Math.max(AAA, 0))) % 3000000000) >= 3000000) ? "MC" : "")
        if (power.gte(1e15)) return "e" + format(Decimal.log10(amount), 5, placesUnder1000, "standard")
        if (power.gte(3000000003)) return lol.toFixed(places) + "e" + format(Decimal.log10(amount), 5, placesUnder1000, "standard")
        if (power.lt(33)) return lolAntime.toFixed(places) + " " + tempShortSuffixes[Math.floor((power.toNumber()) / 3) % 13];
        return lolAntime.toFixed(places) + " " + result3 + ( power.gte(3000003) ? (result+result2 == "" ? "" : "-") : "") + result2 + ( power.gte(3003) ? (result == "" ? "" : "-") : "") + result
    }

    if (amount.gte(new Decimal(NaN))) return "NaN"
}