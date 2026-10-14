expect(Math.max(3, 7, 1), 'the largest').toBe(7);
expect(Math.min(...[3, 7, 1]), 'spread an array into Math.min').toBe(1);
expect(Math.round(2.5), 'Math.round rounds halves up').toBe(3);
expect(Math.round(-2.5), 'up, toward plus infinity').toBe(-2);
expect(Math.floor(-1.5), 'floor rounds down').toBe(-2);
expect(Math.ceil(1.2), 'ceil rounds up').toBe(2);
expect(Math.sqrt(81), 'a square root').toBe(9);
expect(Math.hypot(3, 4), 'the hypotenuse').toBe(5);
