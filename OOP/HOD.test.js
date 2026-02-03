const { HOD } = require('./HOD');

test('HOD info formatting works correctly', () => {
  const hod = new HOD();
  hod.setStudent('Alice');
  hod.setHod('Rahul');
  hod.setCollege('MES');

  expect(hod.info()).toBe('Student: Alice\nHOD: Rahul\nCollege: MES'
);
}); 