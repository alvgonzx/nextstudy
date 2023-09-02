import Classroom from './Classroom.model.js';
import Exam from './Exam.model.js';
import Task from './Task.model.js'

Classroom.hasMany(Exam, { foreignKey: 'classroom_id' });
Exam.belongsTo(Classroom, { foreignKey: 'classroom_id' });

Classroom.hasMany(Task, { foreignKey: 'classroom_id' });
Task.belongsTo(Classroom, { foreignKey: 'classroom_id' });