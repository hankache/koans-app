interface Settings {
  theme: string;
}
interface Settings {
  size: number;
}
expectTypeOf<keyof Settings>().toEqualTypeOf<'theme' | 'size'>(); // the two declarations merged
const settings: Settings = { theme: 'dark', size: 12 };
expect(settings.size, 'a value needs every merged property').toBe(12);
class Robot {
  name = 'R2';
}
interface Robot {
  serial?: number;
}
const robot = new Robot();
robot.serial = 7;
expect(robot.serial, 'an interface adds to a class').toBe(7);
expectTypeOf<keyof Robot>().toEqualTypeOf<'name' | 'serial'>(); // both sets of members
expect(Object.keys(new Robot()), 'but only the class makes fields').toEqual(['name']);
