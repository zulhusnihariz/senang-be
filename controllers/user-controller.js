const Models = require('../models/');
const bcrypt = require('bcrypt');

const user = {
  getAllUser: async (req, res) => {
    let users = [];
    try {
      users = await Models.User.findAll({
        include: { all: true, nested: true },
        attributes: { exclude: ['password'] },
      });
    } catch (error) {
      console.log(error);
    }

    res.send(users);
    // res.json(results);
  },
  getUserById: async (req, res) => {
    let user = {};
    try {
      user = await Models.User.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ['password'] },
      });

      res.json(user);
    } catch (error) {
      console.log(error);
    }
  },
  postUser: async (req, res) => {
    console.log(req.body);

    let user = {};
    let address = {};
    let userAddress = req.body.address;

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
      console.log(req.body.address);
      user = await Models.User.create({
        username: req.body.username,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        birthDate: req.body.birthDate,
      });

      address = await Models.Address.create({
        userId: user.id,
        addressLine1: userAddress.addressLine1,
        addressLine2: userAddress.addressLine2,
        city: userAddress.city,
        postalCode: userAddress.postalCode,
        country: userAddress.country,
        contactNumber: userAddress.contactNumber,
      });

      res.json({ user, address });
    } catch (error) {
      console.log(error);
    }

    // res.json(results);
  },
  patchUser: async (req, res) => {
    console.log(req.body);
    try {
      await Models.User.update(req.body, {
        where: { id: req.params.id },
      });

      res.json({ message: 'User info updated' });
    } catch (error) {
      console.log(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      await Models.User.destroy({
        where: { id: req.params.id },
      });

      res.json({ message: 'User deleted' });
    } catch (error) {
      console.log(error);
    }
  },
  getUserByEmailAndPassword: async (req, res) => {
    let user = {};
    try {
      user = await Models.User.findOne({ where: { email: req.body.email } });

      console.log('this is user password', user);
      if (!user) res.json({ message: 'User does not exists.' });
      const validated = await bcrypt.compare(req.body.password, user.password);
      if (validated) res.json(user);
      if (!validated) res.json({ message: 'Invalid credentials' });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = user;
// const user = {
//   getAllSchedules: async (req, res) => {
//     let schedules = [];
//     try {
//       schedules = await Model.Schedules.findAll({
//         include: { all: true, nested: true },
//         order: [
//           ['createdAt', 'ASC'],
//           ['scheduleFiles', 'createdAt', 'ASC'],
//           ['scheduleReminders', 'createdAt', 'ASC'],
//           ['scheduleReminders', 'reminderFiles', 'createdAt', 'ASC'],
//         ],
//       });
//     } catch (error) {
//       console.log(error);
//     }
//     res.json(schedules);
//   },

//   getScheduleById: async (req, res) => {
//     let schedule = [];
//     try {
//       schedule = await Model.Schedules.findOne({
//         include: ['scheduleReminders'],
//         where: { id: req.params.id },
//       });
//     } catch (error) {
//       console.log(error);
//     }
//     res.json(schedule);
//   },

//   postNewScheduleEquipment: async (req, res) => {
//     let schedule = {};
//     try {
//       schedule = await Model.Schedules.create({
//         type: req.body.type,
//         pin: req.body.pin,
//         brand: req.body.brand,
//         model: req.body.model,
//         label: req.body.label,
//         category: req.body.category,
//         comissioningDate: req.body.comissioningDate,
//         vendor: req.body.vendor,
//         description: req.body.description,
//         pmFrequency: req.body.pmFrequency,
//         assignTo: req.body.assignTo,
//         hotlineNo: req.body.hotlineNo,
//         scheduleType: 'Equipment',
//         reminder: true,
//       });

//       // create schedule files
//       if (req.body.scheduleFiles) {
//         for (const sFile of req.body.scheduleFiles) {
//           let location = await s3Bucket.uploadFile(sFile);
//           await Model.ScheduleFiles.create({
//             ScheduleId: schedule.id,
//             file: location,
//           });
//         }
//       }

//       // create schedule reminder
//       if (
//         req.body.pmFrequency === 'Monthly' ||
//         req.body.pmFrequency === 'Weekly' ||
//         req.body.pmFrequency === 'Quarterly'
//       ) {
//         for (i = 0; i < 12; i++) {
//           await Model.Reminders.create({
//             ScheduleId: schedule.id,
//             dateTime: '',
//           });
//         }
//       } else if (req.body.pmFrequency === 'Daily') {
//         for (i = 0; i < 31; i++) {
//           await Model.Reminders.create({
//             ScheduleId: schedule.id,
//             dateTime: '',
//           });
//         }
//       }

//       // get firebasetoken
//       let token = '';
//       let userToken = await sequelize.query(
//         'SELECT [User].id, [User].name, b.user_uuid, b.token FROM [User] ' +
//           'INNER JOIN UserFirebaseRegistrationToken b ' +
//           'ON b.user_uuid = [User].id ' +
//           'WHERE [User].id = :userId',
//         {
//           replacements: { userId: req.body.assignTo },
//           type: QueryTypes.SELECT,
//         },
//       );
//       token = userToken[0].token;

//       // scheduled notification
//       if (req.body.pmFrequency === 'Monthly' && schedule.reminder === true) {
//         let d = new Date(schedule.createdAt);
//         let year = d.getFullYear();
//         scheduler.scheduleReminder(req.body.pmFrequency, year, token, schedule.id);
//       } else if (req.body.pmFrequency === 'Daily' && schedule.reminder === true) {
//         let d = new Date(schedule.createdAt);
//         let month = d.getMonth();
//         let year = d.getFullYear();

//         scheduler.scheduleReminder(req.body.pmFrequency, month, token, schedule.id);
//         scheduler.resetDailySchedule(schedule.id, year);
//       } else if (req.body.pmFrequency === 'Weekly' && schedule.reminder === true) {
//         let d = new Date(schedule.createdAt);
//         let year = d.getFullYear();
//         scheduler.scheduleReminder(req.body.pmFrequency, year, token, schedule.id);
//       } else if (req.body.pmFrequency === 'Quarterly' && schedule.reminder === true) {
//         let d = new Date(schedule.createdAt);
//         let year = d.getFullYear();
//         scheduler.scheduleReminder(req.body.pmFrequency, year, token, schedule.id);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     res.json(schedule);
//   },

//   postNewScheduleService: async (req, res) => {
//     let schedule = {};
//     try {
//       schedule = await Model.Schedules.create({
//         type: req.body.type,
//         pin: req.body.pin,
//         label: req.body.label,
//         category: req.body.category,
//         vendor: req.body.vendor,
//         description: req.body.description,
//         pmFrequency: req.body.pmFrequency,
//         assignTo: req.body.assignTo,
//         hotlineNo: req.body.hotlineNo,
//         scheduleType: 'Service',
//         reminder: true,
//       });

//       // create schedule files
//       if (req.body.scheduleFiles) {
//         for (const sFile of req.body.scheduleFiles) {
//           let location = await s3Bucket.uploadFile(sFile);
//           await Model.ScheduleFiles.create({
//             ScheduleId: schedule.id,
//             file: location,
//           });
//         }
//       }

//       // create schedule reminder
//       if (
//         req.body.pmFrequency === 'Monthly' ||
//         req.body.pmFrequency === 'Weekly' ||
//         req.body.pmFrequency === 'Quarterly'
//       ) {
//         for (i = 0; i < 12; i++) {
//           await Model.Reminders.create({
//             ScheduleId: schedule.id,
//             dateTime: '',
//           });
//         }
//       } else if (req.body.pmFrequency === 'Daily') {
//         for (i = 0; i < 31; i++) {
//           await Model.Reminders.create({
//             ScheduleId: schedule.id,
//             dateTime: '',
//           });
//         }
//       }

//       // get firebasetoken
//       let token = '';
//       let userToken = await sequelize.query(
//         'SELECT [User].id, [User].name, b.user_uuid, b.token FROM [User] ' +
//           'INNER JOIN UserFirebaseRegistrationToken b ' +
//           'ON b.user_uuid = [User].id ' +
//           'WHERE [User].id = :userId',
//         {
//           replacements: { userId: req.body.assignTo },
//           type: QueryTypes.SELECT,
//         },
//       );
//       token = userToken[0].token;

//       // scheduled notification
//       if (req.body.pmFrequency === 'Monthly' && schedule.reminder === true) {
//         let d = new Date(schedule.createdAt);
//         let year = d.getFullYear();
//         scheduler.scheduleReminder(req.body.pmFrequency, year, token, schedule.id);
//       } else if (req.body.pmFrequency === 'Daily' && schedule.reminder === true) {
//         let d = new Date(schedule.createdAt);
//         let month = d.getMonth();
//         let year = d.getFullYear();

//         scheduler.scheduleReminder(req.body.pmFrequency, month, token, schedule.id);
//         scheduler.resetDailySchedule(schedule.id, year);
//       } else if (req.body.pmFrequency === 'Weekly' && schedule.reminder === true) {
//         let d = new Date(schedule.createdAt);
//         let year = d.getFullYear();
//         scheduler.scheduleReminder(req.body.pmFrequency, year, token, schedule.id);
//       } else if (req.body.pmFrequency === 'Quarterly' && schedule.reminder === true) {
//         let d = new Date(schedule.createdAt);
//         let year = d.getFullYear();
//         scheduler.scheduleReminder(req.body.pmFrequency, year, token, schedule.id);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     res.json(schedule);
//   },

//   updateSchedule: async (req, res) => {
//     let schedule = {};
//     try {
//       schedule = await Model.Schedules.update(req.body, {
//         where: { id: req.params.id },
//       });

//       if (req.body.scheduleFiles) {
//         for (const sFile of req.body.scheduleFiles) {
//           let location = await s3Bucket.uploadFile(sFile);
//           await Model.ScheduleFiles.create({
//             ScheduleId: req.params.id,
//             file: location,
//           });
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     res.json(schedule);
//   },

//   onReminder: async (req, res) => {
//     let schedule = {};
//     try {
//       schedule = await Model.Schedules.update({ reminder: true }, { where: { id: req.params.id } });

//       // get assignTo, createdAt, pmFrequency info
//       let dt = await sequelize.query(
//         'SELECT Schedules.assignTo, Schedules.pmFrequency, Schedules.createdAt ' +
//           'FROM Schedules WHERE Schedules.id = :id',
//         {
//           replacements: { id: req.params.id },
//           type: QueryTypes.SELECT,
//         },
//       );

//       // get token
//       let token = '';
//       let userToken = await sequelize.query(
//         'SELECT [User].id, [User].name, b.user_uuid, b.token FROM [User] ' +
//           'INNER JOIN UserFirebaseRegistrationToken b ' +
//           'ON b.user_uuid = [User].id ' +
//           'WHERE [User].id = :userId',
//         {
//           replacements: { userId: dt[0].assignTo },
//           type: QueryTypes.SELECT,
//         },
//       );
//       token = userToken[0].token;

//       // run scheduler
//       if (dt[0].pmFrequency === 'Monthly') {
//         let d = new Date(dt[0].createdAt);
//         let year = d.getFullYear();
//         scheduler.scheduleReminder(dt[0].pmFrequency, year, token, req.params.id);
//       }
//       if (dt[0].pmFrequency === 'Daily') {
//         let d = new Date(dt[0].createdAt);
//         let month = d.getMonth();
//         scheduler.scheduleReminder(dt[0].pmFrequency, month, token, req.params.id);
//       }
//       if (dt[0].pmFrequency === 'Weekly') {
//         let d = new Date(dt[0].createdAt);
//         let year = d.getFullYear();
//         scheduler.scheduleReminder(dt[0].pmFrequency, year, token, req.params.id);
//       }
//       if (dt[0].pmFrequency === 'Quarterly') {
//         let d = new Date(dt[0].createdAt);
//         let year = d.getFullYear();
//         scheduler.scheduleReminder(dt[0].pmFrequency, year, token, req.params.id);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     res.json(schedule);
//   },

//   offReminder: async (req, res) => {
//     let schedule = {};
//     try {
//       schedule = await Model.Schedules.update(
//         { reminder: false },
//         { where: { id: req.params.id } },
//       );

//       // off scheduler
//       scheduler.cancelSchedule(req.params.id);
//     } catch (error) {
//       console.log(error);
//     }
//     res.json(schedule);
//   },

//   deleteSchedule: async (req, res) => {
//     // delete scheduleReminders-files
//     await sequelize.query(
//       'DELETE FROM ReminderFiles FROM ReminderFiles ' +
//         'INNER JOIN Reminders ON ReminderFiles.ReminderId = Reminders.id ' +
//         'INNER JOIN Schedules ON Reminders.ScheduleId = Schedules.id ' +
//         'WHERE Schedules.id = :id',
//       {
//         replacements: { id: req.params.id },
//         type: QueryTypes.DELETE,
//       },
//     );

//     // delete scheduleReminders
//     await Model.Reminders.destroy({
//       where: { ScheduleId: req.params.id },
//       force: true,
//     });

//     // delete scheduleFiles
//     await Model.ScheduleFiles.destroy({
//       where: { ScheduleId: req.params.id },
//     });

//     // delete schedules
//     await Model.Schedules.destroy({
//       where: { id: req.params.id },
//     });
//     res.status(200).json({
//       status: 'Deleted',
//     });
//   },
// };

// module.exports = user;
