import { useState } from 'react';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase'; // Firestore konfiguratsiyasi
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';

const Registration = () => {
  const [isLogin, setIsLogin] = useState(true); // Login yoki Signup rejimni boshqaradi
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    department: '',
    course: '',
    group: '',
    image: null,
  });

  const navigate = useRouter();
  const [groupOptions, setGroupOptions] = useState([]);

  const departmentOptions = {
    'B.Tech': { 1: 10, 2: 4, 3: 6, 4: 2 },
    'B.Science': { 1: 8, 2: 6, 3: 3, 4: 5 },
    'BBA': { 1: 5, 2: 7, 3: 4, 4: 3 },
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      // Maksimal hajmni cheklash: 2 MB
      alert('Rasm hajmi juda katta. Iltimos, kichikroq rasm yuklang.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800; // Maksimal kenglik
        const MAX_HEIGHT = 600; // Maksimal balandlik
        let width = img.width;
        let height = img.height;

        // O'lchamlarni moslashtirish
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          if (width > height) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          } else {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Base64 formatga aylantirish
        const base64Image = canvas.toDataURL('image/jpeg', 0.7); // Sifatni 70% ga pasaytirish
        setFormData({ ...formData, image: base64Image });

        // Hajmni tekshirish
        console.log(`Optimallashtirilgan hajm: ${Math.round((base64Image.length * 3) / 4 / 1024)} KB`);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDepartmentChange = (department) => {
    setFormData({ ...formData, department, course: '', group: '' });
    setGroupOptions([]);
  };

  const handleCourseChange = (course) => {
    setFormData({ ...formData, course, group: '' });
    if (formData.department && course) {
      const groups = Array.from(
        { length: departmentOptions[formData.department][course] },
        (_, i) => `${formData.department} - ${course}0${i + 1}`
      );
      setGroupOptions(groups);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin) {
      // Signup mode
      if (formData.password !== formData.confirmPassword) {
        alert('Parollar mos kelmadi!');
        return;
      }
  
      try {
        // Register user
        const res = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
  
        // Create the user document
        const userDoc = {
          userId: res.user.uid,  // Corrected this line to use res.user.uid
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          department: formData.department,
          course: formData.course,
          group: formData.group,
          image: formData.image, // Store image as base64
        };
        
        // Save the user document in Firestore
        await setDoc(doc(db, 'users', res.user.uid), userDoc); // Use res.user.uid to set the document ID
  
        alert('Ro‘yxatdan muvaffaqiyatli o‘tildi!');
        navigate.push("/dashboard"); // Redirect to the dashboard after successful registration
      } catch (error) {
        console.error('Xatolik ma’lumotlarni saqlashda:', error.message);
        alert('Xatolik yuz berdi. Qaytadan urinib ko‘ring.');
      }
    } else {
      // Login mode
      try {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        alert(`Email: ${formData.email}, Parol: ${formData.password}`);
        navigate.push("/dashboard"); // Redirect to dashboard after successful login
      } catch (error) {
        console.error('Xatolik tizimga kirishda:', error.message);
        alert('Email yoki parol noto‘g‘ri. Qaytadan urinib ko‘ring.');
      }
    }
  };
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500">
      <div className="md:w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {isLogin ? 'Kirish' : "Ro'yxatdan o'tish"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="firstName">
                  Ism
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm sm:text-sm"
                  placeholder="Ismingizni kiriting"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="lastName">
                  Familiya
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm sm:text-sm"
                  placeholder="Familiyangizni kiriting"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
                  Telefon raqam
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 rounded-l-md">
                    +998
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="flex-1 block w-full px-4 py-2 border rounded-r-md shadow-sm sm:text-sm"
                    placeholder="Telefon raqamingizni kiriting"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="department">
                  Department tanlang
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={(e) => handleDepartmentChange(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm sm:text-sm"
                  required
                >
                  <option value="">Tanlang</option>
                  {Object.keys(departmentOptions).map((dep) => (
                    <option key={dep} value={dep}>
                      {dep}
                    </option>
                  ))}
                </select>
              </div>
              {formData.department && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="course">
                    Kursni tanlang
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={(e) => handleCourseChange(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm sm:text-sm"
                    required
                  >
                    <option value="">Kursni tanlang</option>
                    {[1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>
                        {num}-kurs
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {groupOptions.length > 0 && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="group">
                    Guruhni tanlang
                  </label>
                  <select
                    name="group"
                    value={formData.group}
                    onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                    className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm sm:text-sm"
                    required
                  >
                    <option value="">Guruhni tanlang</option>
                    {groupOptions.map((group, index) => (
                      <option key={index} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="image">
                  Rasm yuklash
                </label>
                <input
                  type="file"
                  id="image"
                  onChange={handleImageUpload}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm sm:text-sm"
                  accept="image/*"
                  required
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm sm:text-sm"
              placeholder="Emailni kiriting"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Parol
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm sm:text-sm"
              placeholder="Parolni kiriting"
              required
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="confirmPassword">
                Parolni tasdiqlang
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm sm:text-sm"
                placeholder="Parolni qayta kiriting"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            {isLogin ? 'Kirish' : "Ro'yxatdan o'tish"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          {isLogin
            ? "Ro'yxatdan o'tmaganmisiz?"
            : "Allaqachon hisobingiz bormi?"}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? "Ro'yxatdan o'tish" : 'Kirish'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Registration;
