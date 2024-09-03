import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Slide, toast } from 'react-toastify';

export default function VerifyPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [inputCount, setInputCount] = useState(5); // Start with 5 inputs
  const navigate = useNavigate();

  // Define the validation schema dynamically
  const validationSchema = Yup.object().shape({
    code1: Yup.string().required('Required').matches(/^\d$/, 'Enter a valid number'),
    code2: Yup.string().required('Required').matches(/^\d$/, 'Enter a valid number'),
    code3: Yup.string().required('Required').matches(/^\d$/, 'Enter a valid number'),
    code4: Yup.string().required('Required').matches(/^\d$/, 'Enter a valid number'),
    code5: Yup.string().required('Required').matches(/^\d$/, 'Enter a valid number'),
    code6: inputCount === 6
      ? Yup.string().required('Required').matches(/^\d$/, 'Enter a valid number')
      : Yup.string().notRequired(),
  });

  const { handleSubmit, values, handleChange, handleBlur, setFieldValue } = useFormik({
    initialValues: {
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      code5: '',
      code6: '',
    },
    onSubmit: handleVerifyPassword,
    validationSchema: validationSchema,
  });

  async function handleVerifyPassword() {
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    let verificationCode = '';
    for (let i = 1; i <= inputCount; i++) {
      verificationCode += values[`code${i}`];
    }

    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
        resetCode: verificationCode,
      });

      toast.success('success', {
        position: "bottom-right",
        autoClose: 2000,
        transition: Slide,
        theme: "colored"
      });

      setSuccessMessage(response.data.message);
      navigate('/updatePassword');
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred', {
        position: "bottom-right",
        autoClose: 2000,
        transition: Slide,
        theme: "colored"
      });
      setErrorMessage(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    if (/^\d?$/.test(value)) {
      setFieldValue(`code${index + 1}`, value);
      if (value && index < inputCount - 1) {
        document.getElementById(`code${index + 2}`).focus();
      }
    }
  };

  const handleInputKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !values[`code${index + 1}`] && index > 0) {
      document.getElementById(`code${index}`).focus();
    }
  };

  const handleInputBlur = (e, index) => {
    if (e.target.value === '' && index < inputCount - 1 && values[`code${index + 1}`]) {
      setFieldValue(`code${index + 1}`, '');
    }
  };

  const addInput = () => {
    if (inputCount < 6) {
      setInputCount(inputCount + 1);
    }
  };

  const removeInput = () => {
    if (inputCount > 5) {
      setFieldValue(`code${inputCount}`, '');
      setInputCount(inputCount - 1);
    }
  };

  return (
    <>
      <Helmet>
        <title>Verify Password</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-950">
        <div className="w-full md:w-1/2 lg:w-1/3 mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center mt-5">
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="flex items-center justify-center gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                index < inputCount && (
                  <input
                    key={index}
                    id={`code${index + 1}`}
                    name={`code${index + 1}`}
                    type="text"
                    maxLength="1"
                    value={values[`code${index + 1}`]}
                    onChange={(e) => handleInputChange(e, index)}
                    onBlur={(e) => handleInputBlur(e, index)}
                    onKeyDown={(e) => handleInputKeyDown(e, index)}
                    className="w-12 h-12 text-2xl text-center px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-100 dark:bg-gray-900 text-gray-950 dark:text-white"
                  />
                )
              ))}
              {inputCount < 6 && (
                <button
                  type="button"
                  onClick={addInput}
                  className="text-green-500 hover:text-green-600"
                >
                  +
                </button>
              )}
              {inputCount > 5 && (
                <button
                  type="button"
                  onClick={removeInput}
                  className="text-red-500 hover:text-red-600 "
                >
                  -
                </button>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500 mt-4"
              disabled={isLoading}
            >
              Verify{isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}
            </button>
            <Link to={'/forgetPassword'} className='text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500 mt-4'>Back</Link>
          </form>
        </div>
      </div>
    </>
  );
}





