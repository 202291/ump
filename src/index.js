/* eslint-disable @typescript-eslint/no-var-requires */
const pf = require('./libmath/primeFactorization');
const conversionFactors = require('./libmath/convTable.json');
const {Distance, Area, Volume} = require('./libmath/Units')

const DinRatio = (x, y, z, round = false) =>  {
    var a = parseFloat(y) + parseFloat(z)
    var ans = []

    var q = ( parseFloat(y) / a ) * parseFloat(x)
    if (  /[.]/.test(q) === true  ) {
        q = round ? q.toFixed(2) : q
        ans.push(parseFloat(q))
    } else {
        ans.push(q)
    }

    var w = ( parseFloat(z) / a ) * parseFloat(x)
    if ( /[.]/.test(w) === true  ) {
        w = round ? w.toFixed(2) : w
        ans.push(parseFloat(w))
    } else {
        ans.push(w)
    }

    return ans
}

const PropRatio = (x, y, z, which) => {
	// if which == false
	//
	// x : y
	// ? : z
	// ----------------
	// if which == true
	//
	// x : y
	// z : ?
	let ans; let mult
	
	if ( which === true ) {
		mult = parseFloat(z) / parseFloat(x)
		ans = parseFloat(y) * parseFloat(mult)
	} else if ( which === false || which === undefined || which === null ) {
		mult = parseFloat(y) / parseFloat(z)
		ans = parseFloat(x) / parseFloat(mult)
	}

	return ans
}

const PrimeFactorize = (num) => {
	let primeFactors = [];
	let prime = 2;

	while (num > 1) {
		while (num % prime === 0) {
			primeFactors.push(prime);
			num = num /prime;
		}
		prime = pf.nextPrime(prime);
	}
	
	return primeFactors
}

const ConvUnit = (unit, n, fromUnit, toUnit) => {
	const fromFactor = conversionFactors[fromUnit];
	const toFactor = conversionFactors[toUnit];
	const distance = ["nanometer", "nm", "micrometer", "millimeter", "mm", "centimeter", "cm", "meter", "m", "kilometer", "km", "nautical-mile", "nmi", "inch", "foot", "ft", "yard", "yd", "mile", "mi"]
	const area = ["square-centimeter", "cm2", "square-foot", "ft2", "square-inch", "2inch", "2in", "square-meter", "2m", "acre", "hectare"]
	const volume = ["milliliter", "ml", "centiliter", "cl", "deciliter", "dl", "liter",  "l", "kiloliter", "kl", "decaliter", "dal", "hectoliter",, "hl", "cubic-millimeter", "3mm", "cubic-centimeter", "3cm", "cubic-meter","3m", "cubic-inch", "3inch", "fluid-ounce", "floz", "gill", "pint", "quart", "gallon"]
	if (!fromFactor || !toFactor) {
		return `invalid from/to Unit, ${fromUnit} or ${toUnit} is not a valid unit.`;
	}

	if (unit !== "dist" && unit !== "area" && unit !== "vol") {
		return "invalid unit. unit must be either 'dist', 'area' or 'vol'"
	} else if ( ( unit === "area" && ( !area.includes(fromUnit) || !area.includes(toUnit) ) ) || ( unit === "dist" && ( !distance.includes(fromUnit) || !distance.includes(toUnit) ) ) || (unit === "vol" && ( !volume.includes(fromUnit) || !volume.includes(toUnit)  ) )  ) {
		return `unit parameter is not equal to it's units of conversion. ${fromUnit} and ${toUnit}`;
	} else {
		return n * fromFactor / toFactor
	}
}

const ConvTemp = (n, from, to) => {
	const units = ["K", "F", "C", "Kelvin", "Fahrenheit", "Celsius", "kelvin", "celsius", "fahrenheit", "k", "f", "c"]
	if ( !units.includes(from) || !units.includes(to) ) {
		console.log("error")
	}

	if (from === "K" || from === "Kelvin" || from === "kelvin" || from === "k") {
		switch(to) {
			case "Celsius":
			case "celsius":
			case "C":
			case "c":
				return n - 273.15 // Kelvin to Celcuis
			case "Fahrenheit":
			case "fahrenheit":
			case "F":
			case "f":
				return (n - 273.15) * 9/5 + 32 // Kelvin to Fahrenheit
		}
	} else if (from === "C" || from === "Celsius" || from === "celsius" || from === "c") {
		switch(to) {
			case "Kelvin":
			case "kelvin":
			case "K":
			case "k":
				return n + 273.15 // Celsius to Kelvin
			case "Fahrenheit":
			case "fahrenheit":
			case "F":
			case "f":
				return (n * 9/5) + 32 // Celsius to Fahrenheit
		}
	} else if ( from === "Fahrenheit" || from === "fahrenheit" || from === "F" || from === "f") {
		switch(to) {
			case "Celsius":
			case "celsius":
			case "C":
			case "c":
				return (n - 32) * 5/9 // Fahrenheit to Celsius
			case "Kelvin":
			case "kelvin":
			case "K":
			case "k":
				return (n - 32) * 5/9 + 273.15 // Fahrenheit to Kelvin
		}
	}
}

module.exports = {DinRatio, PropRatio, PrimeFactorize, ConvUnit, ConvTemp, Distance, Area, Volume}

