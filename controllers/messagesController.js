import messagesModel from "../models/messagesModel.js";

export const createMesage = async (req, res) => {
  try {
    const newMessage = await messagesModel.create(req.body);

    res.json(newMessage);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Fail creating",
    });
  }
};

export const getAllMessagesByCourseId = async (req, res) => {
  try {
    let messages;

    if (req.query.groupMessage === "true") {
      messages = await messagesModel
        .find({
          course: req.params.id,
          group: req.query.group,
        })
        .populate({
          path: "userWhoSent",
          model: "User",
        })
        .sort({ createdAt: 1 });
    } else if (req.query.groupMessage === "false") {
      messages = await messagesModel
        .find({
          course: req.params.id,
          $or: [
            {
              userWhoSent: req.query.firstUser,
              anotherUser: req.query.secondUser,
            },
            {
              userWhoSent: req.query.secondUser,
              anotherUser: req.query.firstUser,
            },
          ],
        })
        .populate({
          path: "userWhoSent",
          model: "User",
        })
        .sort({ createdAt: 1 });
    }
    res.json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Fail creating",
    });
  }
};

// export const updateMaterial = async (req, res) => {
//   try {
//     const newMaterial = await materialsModel.findByIdAndUpdate(
//       req.params.id,
//       req.body
//     );

//     res.json(newMaterial);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Fail creating",
//     });
//   }
// };

// export const deleteMaterial = async (req, res) => {
//   try {
//     const newMaterial = await materialsModel.findByIdAndDelete(req.params.id);

//     res.json(newMaterial);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Fail creating",
//     });
//   }
// };

// export const getCourseById = async (req, res) => {
//   try {
//     const courseId = req.params.id;

//     const course = await coursesModel
//       .findById(courseId)
//       .populate([
//         {
//           path: "teachers",
//           model: "User",
//         },
//         {
//           path: "groups",
//           model: "Group",
//         },
//       ])
//       .exec();

//     res.json(course);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Fail creating",
//     });
//   }
// };

// export const getCoursesByTeacherId = async (req, res) => {
//   try {
//     const teacherId = req.params.id;

//     const courses = await coursesModel
//       .find({
//         teachers: { $in: [teacherId] },
//       })
//       .populate([
//         {
//           path: "teachers",
//           model: "User",
//         },
//         {
//           path: "groups",
//           model: "Group",
//         },
//       ])
//       .sort({ createdAt: -1 });

//     res.json(courses);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Fail creating",
//     });
//   }
// };

// export const getCoursesByGroup = async (req, res) => {
//   try {
//     const groupId = req.params.groupId;

//     const courses = await coursesModel
//       .find({
//         groups: { $in: [groupId] },
//       })
//       .populate([
//         {
//           path: "teachers",
//           model: "User",
//         },
//         {
//           path: "groups",
//           model: "Group",
//         },
//       ])
//       .sort({ createdAt: -1 });

//     res.json(courses);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: "Fail creating",
//     });
//   }
// };
