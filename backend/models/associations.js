import Classroom from './Classroom.model.js';
import Exam from './Exam.model.js';

Classroom.hasMany(Exam, { foreignKey: 'classroom_id' });
Exam.belongsTo(Classroom, { foreignKey: 'classroom_id' });