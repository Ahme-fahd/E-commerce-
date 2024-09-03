import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import { Slide, toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem('token');

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required')
  });

  const formik = useFormik({
    initialValues: {
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.put(
          'https://ecommerce.routemisr.com/api/v1/users/updateMe/',
          values,
          {
            headers: {
              token
            }
          }
        );
        toast.success('Your data has successfully been updated', {
          position: "bottom-right",
          autoClose: 2000,
          transition: Slide,
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        });
        setUser(response.data.user);
        console.log('User updated:', response.data.user);
      } catch (error) {
        toast.error("Failed to update your data!", {
          position: "bottom-right",
          autoClose: 2000,
          transition: Slide,
          theme: "colored"
        });
        console.error('Error updating user:', error);
      } finally {
        setIsLoading(false);
        setIsEditing(false); 
      }
    }
  });

  const handleButtonClick = () => {
    if (isEditing) {
      formik.handleSubmit(); // Submit form when in edit mode
    } else {
      setIsEditing(true); // Enter edit mode
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-950 min-h-screen py-10 px-4 grid items-center">
      <div className="container mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 md:flex md:items-center md:justify-between">
        <div className="md:w-1/3 flex justify-center mb-4 md:mb-0">
          <img
            src="https://res.cloudinary.com/dboafhu31/image/upload/v1625318266/imagen_2021-07-03_091743_vtbkf8.png"
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-gray-300 dark:border-gray-600"
          />
        </div>

        <div className="md:w-2/3 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Profile Information
          </h2>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-bold text-gray-700 dark:text-gray-300">
                  Name:
                </label>
                <input
                  className={`px-4 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-900 dark:text-white ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : ""
                  }`}
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  readOnly={!isEditing}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-gray-700 dark:text-gray-300">
                  Email:
                </label>
                <input
                  className={`px-4 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-900 dark:text-white ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : ""
                  }`}
                  type="text"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  readOnly={!isEditing}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-gray-700 dark:text-gray-300">
                  Role:
                </label>
                <input
                  className="px-4 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                  type="text"
                  name="role"
                  value={"user"}
                  readOnly
                />
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-gray-700 dark:text-gray-300">
                  Phone:
                </label>
                <input
                  className={`px-4 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-900 dark:text-white ${
                    formik.touched.phone && formik.errors.phone
                      ? "border-red-500"
                      : ""
                  }`}
                  type="text"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  readOnly={!isEditing}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.phone}
                  </div>
                ) : null}
              </div>
            </div>
          </form>
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              className={`${
                isEditing
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-green-500 hover:bg-green-600"
              } text-white px-4 py-2 rounded-md shadow-sm transition`}
              onClick={handleButtonClick}
              disabled={isLoading}
            >
              {isEditing ? (
                !isLoading ? (
                  "Update"
                ) : (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                )
              ) : (
                "Edit"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


