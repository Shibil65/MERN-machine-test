class Student {
  constructor() {
    this.studentName = 'shibil';
  }

  setStudent(name) {
    this.studentName = name;
  }
}

class HOD extends Student {
  constructor() {
    super();
    this.hodName = 'Arun';
    this.collegeName = 'MES';
  }

  setHod(name) {
    this.hodName = name;
  }

  setCollege(name) {
    this.collegeName = name;
  }

  info() {
    return `Student: ${this.studentName}\nHOD: ${this.hodName}\nCollege: ${this.collegeName}`;
  }
} 


if (require.main === module) {
  const args = process.argv.slice(2);
  const hod = new HOD();

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--student':
        hod.setStudent(args[i + 1]);
        i++;
        break;
      case '--hod':
        hod.setHod(args[i + 1]);
        i++;
        break;
      case '--college':
        hod.setCollege(args[i + 1]);
        i++;
        break;
    }
  }

  console.log(hod.info());
}

module.exports = { Student, HOD };