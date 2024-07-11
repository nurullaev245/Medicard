// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [storedUser, setStoredUser] = useState({});
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userList, setUserList] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('storedUser'));
    const loggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    const users = JSON.parse(localStorage.getItem('userList')) || [];
    if (savedUser) {
      setStoredUser(savedUser);
    }
    if (loggedIn) {
      setIsLoggedIn(loggedIn);
    }
    setUserList(users);
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    const user = { name, number, email, password };
    setStoredUser(user);
    localStorage.setItem('storedUser', JSON.stringify(user));

    const updatedUserList = [...userList, user];
    setUserList(updatedUserList);
    localStorage.setItem('userList', JSON.stringify(updatedUserList));

    setShowRegisterModal(false);
    setRegisterSuccess(true);
    setTimeout(() => setRegisterSuccess(false), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = userList.find(user => user.email === email && user.password === password);
    if (user) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', true);
      setShowLoginModal(false);
      setLoginSuccess(true);
      setTimeout(() => setLoginSuccess(false), 3000);
    } else {
      alert('Invalid email or password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', false);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const updatedUser = { ...storedUser, name, number, email, password };
    const updatedUserList = userList.map(user =>
      user.email === storedUser.email ? updatedUser : user
    );
    setStoredUser(updatedUser);
    setUserList(updatedUserList);
    localStorage.setItem('storedUser', JSON.stringify(updatedUser));
    localStorage.setItem('userList', JSON.stringify(updatedUserList));
    setIsEditingProfile(false);
  };

  const shouldShowCards = location.pathname === '/';
  const isEmployees = location.pathname.toLowerCase() === '/employees';
  const isProducts = location.pathname.toLowerCase() === '/products';
  const isUserList = location.pathname.toLowerCase() === '/userlist';

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">daisyUI</Link>
        </div>
        <div className="flex-none">
          <ul className='flex gap-5'>
            <li>
              <Link to="/employees">Employees</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/userlist">Userlist</Link>
            </li>
          </ul>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              {isLoggedIn ? (
                <>
                  <li><a onClick={() => setShowProfileModal(true)}>Profile</a></li>
                  <li><a onClick={handleLogout}>Logout</a></li>
                </>
              ) : (
                <>
                  <li>
                    <a onClick={() => setShowRegisterModal(true)}>Register</a>
                  </li>
                  <li>
                    <a onClick={() => setShowLoginModal(true)}>Login</a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      <progress className="progress w-100" value={0} max="100"></progress>

      {shouldShowCards && (
        <div className='flex justify-between my-5'> {/*card start */}
          <div className="card card-compact bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
          <div className="card card-compact bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
          <div className="card card-compact bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEmployees && (
        <div>
          <h1 className="text-3xl font-bold my-5">My Team</h1>
          <div className='flex justify-between m-10'>
            <div className="card card-compact bg-indigo-600 w-96 shadow-xl">
              <figure>
                <img src="https://media.istockphoto.com/id/538665020/photo/internet-meme-why-you-no-rage-face-3d-illustration.jpg?s=612x612&w=0&k=20&c=5D_g8Jy8kqg5Op2bb4RvcH8_6y0HGPqt29TKDrEqLyM=" alt="Manager" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Manager: Abdurazzoq</h2>
                <p>Abdurazzoq: frontend developer writing code in React</p>
                <p>Abdurazzoq made a Navbar and email with password</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">View Details</button>
                </div>
              </div>
            </div>

            <div className="card card-compact bg-indigo-600 w-96 shadow-xl">
              <figure>
                <img src="https://media.istockphoto.com/id/538665020/photo/internet-meme-why-you-no-rage-face-3d-illustration.jpg?s=612x612&w=0&k=20&c=5D_g8Jy8kqg5Op2bb4RvcH8_6y0HGPqt29TKDrEqLyM=" alt="Worker" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Colleague: Abror</h2>
                <p>Abror is also a frontend developer</p>
                <p>Abror made an outline when someone clicks employees</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">View Details</button>
                </div>
              </div>
            </div>

            <div className="card card-compact bg-indigo-600 w-96 shadow-xl">
              <figure>
                <img src="https://media.istockphoto.com/id/538665020/photo/internet-meme-why-you-no-rage-face-3d-illustration.jpg?s=612x612&w=0&k=20&c=5D_g8Jy8kqg5Op2bb4RvcH8_6y0HGPqt29TKDrEqLyM=" alt="Worker" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Colleague: Saidazim</h2>
                <p>Saidazim is a React frontend developer</p>
                <p>Saidazim makes products and maybe cards</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">View Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isProducts && (
        <div>
          <h1 className="text-3xl font-bold my-5">Products</h1>
          <div className='flex justify-between m-10'>
            <div className="card card-compact bg-green-600 w-96 shadow-xl">
              <figure>
                <img src="https://via.placeholder.com/150" alt="Product 1" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Product 1</h2>
                <p>Description for Product 1</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">View Details</button>
                </div>
              </div>
            </div>

            <div className="card card-compact bg-green-600 w-96 shadow-xl">
              <figure>
                <img src="https://via.placeholder.com/150" alt="Product 2" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Product 2</h2>
                <p>Description for Product 2</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">View Details</button>
                </div>
              </div>
            </div>

            <div className="card card-compact bg-green-600 w-96 shadow-xl">
              <figure>
                <img src="https://via.placeholder.com/150" alt="Product 3" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Product 3</h2>
                <p>Description for Product 3</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">View Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isUserList && (
        <div>
          <h1 className="text-3xl font-bold my-5">User List</h1>
          <div className="flex flex-col m-10">
            {userList.map((user, index) => (
              <div key={index} className="card card-compact bg-blue-600 w-full shadow-xl mb-4">
                <div className="card-body">
                  <h2 className="card-title">{user.name}</h2>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Number:</strong> {user.number}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Register Modal */}
      <dialog id="register-modal" className="modal" open={showRegisterModal}>
        <form method="dialog" className="modal-box" onSubmit={handleRegister}>
          <h3 className="font-bold text-lg">Register</h3>
          <div className="py-4">
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full mb-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Number"
              className="input input-bordered w-full mb-2"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">Register</button>
            <button className="btn" onClick={() => setShowRegisterModal(false)}>Cancel</button>
          </div>
        </form>
      </dialog>

      {/* Login Modal */}
      <dialog id="login-modal" className="modal" open={showLoginModal}>
        <form method="dialog" className="modal-box" onSubmit={handleLogin}>
          <h3 className="font-bold text-lg">Login</h3>
          <div className="py-4">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">Login</button>
            <button className="btn" onClick={() => setShowLoginModal(false)}>Cancel</button>
          </div>
        </form>
      </dialog>

      {/* Profile Modal */}
      <dialog id="profile-modal" className="modal" open={showProfileModal}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Profile Information</h3>
          {isEditingProfile ? (
            <form onSubmit={handleProfileUpdate}>
              <div className="py-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full mb-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="number"
                  placeholder="Number"
                  className="input input-bordered w-full mb-2"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full mb-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full mb-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Save</button>
                <button className="btn" onClick={() => setIsEditingProfile(false)}>Cancel</button>
              </div>
            </form>
          ) : (
            <div className="py-4">
              <p><strong>Name:</strong> {storedUser.name}</p>
              <p><strong>Number:</strong> {storedUser.number}</p>
              <p><strong>Email:</strong> {storedUser.email}</p>
            </div>
          )}
          <div className="modal-action">
            {isEditingProfile ? null : (
              <button className="btn" onClick={() => setIsEditingProfile(true)}>Edit</button>
            )}
            <button className="btn" onClick={() => setShowProfileModal(false)}>Close</button>
          </div>
        </div>
      </dialog>

      {registerSuccess && (
        <div className="fixed top-5 right-5">
          <button className="btn btn-success">Register Successful</button>
        </div>
      )}

      {loginSuccess && (
        <div className="fixed top-5 right-5">
          <button className="btn btn-success">Login Successful</button>
        </div>
      )}

      {(shouldShowCards || isEmployees || isProducts || isUserList) && (
        <footer className="bg-base-100 py-4 mt-10">
          <div className="text-center">
            <img className="w-10 inline-block mb-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png" alt="Telegram Logo" />
            <p>&copy; 2024 Your Company. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-2">
              <Link to="/support" className="link link-hover">Support</Link>
              <Link to="/privacy-policy" className="link link-hover">Privacy Policy</Link>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Navbar;
