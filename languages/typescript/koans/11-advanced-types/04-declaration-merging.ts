// title: Declaration merging
// intro: Two interfaces with the same name merge into one. An interface can also add members to a class of the same name, without changing the class itself.
interface Settings {
  theme: string;
}
interface Settings {
  size: number;
}
expectTypeOf<keyof Settings>().toEqualTypeOf<___>(); // the two declarations merged
const settings: Settings = { theme: 'dark', size: 12 };
expect(settings.size, 'a value needs every merged property').toBe(___);
class Robot {
  name = 'R2';
}
interface Robot {
  serial?: number;
}
const robot = new Robot();
robot.serial = 7;
expect(robot.serial, 'an interface adds to a class').toBe(___);
expectTypeOf<keyof Robot>().toEqualTypeOf<___>(); // both sets of members
expect(Object.keys(new Robot()), 'but only the class makes fields').toEqual(___);
