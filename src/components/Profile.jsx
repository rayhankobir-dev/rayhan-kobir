import { FaUserCircle } from 'react-icons/fa';
import Layout from './Layout';
import PageTitle from './PageTitle';
import { useEffect, useState } from 'react';
import { updateUserData } from '../utils/userController';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';

export default function Profile() {
  const { auth, updateUserInfo } = useAuth();
  const { user } = auth;
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    bio: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const response = updateUserData(user.id, formData);
    if(response.success) {
      updateUserInfo(response.data)
      toast.success(response.message);
    }else {
      toast.error(response.message);
    }
  }

  const updateUserAvatar = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.addEventListener('change', (e) => {
      const selectedFile = e.target.files[0];

      if (selectedFile) {
        const reader = new FileReader();

        reader.onload = (readerEvent) => {
          const avatarData = readerEvent.target.result;
          
          const response = updateUserData(user.id, { avatar: avatarData });
          if(response.success) {
            updateUserInfo({ ...user, avatar: avatarData });
            toast.success(response.message);
          }else {
            toast.error(response.message);
          }

        };
        reader.readAsDataURL(selectedFile);
      }
    });
    fileInput.click();
  };

  useEffect(() => {
    setFormData(user)
  }, []);

  return (
    <Layout>

      <PageTitle 
          title={'Profile'}
          subTitle={'This information will be displayed publicly so be careful what you share.'}
      />
      <section className='mt-2 px-6 border-t'>
        <div className='max-w-xl'>
          <form className="mt-10 grid grid-cols-1 sm:grid-cols-6 gap-3" onSubmit={submitHandler}>
            <div className="col-span-full items-center justify-center">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                { user?.avatar? <img src={user.avatar} alt="Avatar" className="h-12 w-12 rounded-full" /> : <FaUserCircle className="h-12 w-12 text-gray-300" aria-hidden="true" />}
                <button
                  type="button"
                  onClick={updateUserAvatar}
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
                
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Full name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3 py-1.5 focus:outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    placeholder="janesmith"
                    name='userName'
                    value={formData.userName}
                    onChange={handleChange}
                    className="block flex-1 border-0 bg-transparent py-1.5 px-3 focus:outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Bio
              </label>
              <div className="mt-2">
                <textarea
                  rows={3}
                  name='bio'
                  value={formData.bio}
                  onChange={handleChange}
                  className="px-3 block w-full rounded-md border-0 py-1.5 focus:outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-1 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>

            <button
              type="submit"
              className="sm:col-span-2 mt-2 h-fit self-end rounded-md bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </form>
        </div>
      </section>
    </Layout>
  )
}
