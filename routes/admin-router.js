const express = require("express");
const {
  getAllUsers,
  getAllContacts,
  deleteUserById,
  getUserById,
  updateUserById,
  deleteContactsById
} = require("../controllers/admin-controller");
const router = express.Router();
const authmiddleware = require("../middlewares/auth-middleware");
const adminmiddleware = require("../middlewares/admin-middleware");

router.get("/users", authmiddleware, adminmiddleware, getAllUsers);
router.get("/users/:id", authmiddleware, adminmiddleware, getUserById);
router.patch(
  "/users/update/:id",
  authmiddleware,
  adminmiddleware,
  updateUserById
);

router.delete(
  "/users/delete/:id",
  authmiddleware,
  adminmiddleware,
  deleteUserById
);

router.get("/contacts", authmiddleware, adminmiddleware, getAllContacts);
router.delete("/contacts/delete/:id", authmiddleware, adminmiddleware, deleteContactsById);
module.exports = router;
