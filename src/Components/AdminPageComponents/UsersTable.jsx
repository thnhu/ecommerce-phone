const UsersTable = () => {
  const userData = [
    {
      id: '1',
      displayName: 'Admin',
      email: 'admin@gmail.com',
      phoneNumber: '0123456789',
      dob: '1990-01-01',
      addresses: ['123 Street, City'],
    },
    {
      id: '2',
      displayName: 'User 2',
      email: 'user2@example.com',
      phoneNumber: '0123456788',
      dob: '1989-02-02',
      addresses: ['456 Avenue, City'],
    },
    // More users here...
  ];
  return (
    // <div className='pt-10'>
    //   <h1 className='text-2xl text-gray-600 font-medium pl-5'>Quản lý danh sách người dùng</h1>
    //   <div className='pt-5 pl-8'>
    //     <p className='text-xl pb-3'>Danh sách người dùng</p>
    //     <div>
    //       <p className='text-l opacity-80'>Danh sách toàn bộ người dùng hệ thống</p>
    //     </div>
    //   </div>

      {/* User Grid }
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 pt-6">
        {userData.map((user) => (
          <div key={user.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-white">{user.displayName}</h3>
            <p className="text-white">Email: {user.email}</p>
            <p className="text-white">Phone: {user.phoneNumber}</p>
            <p className="text-white">Date of Birth: {user.dob || 'N/A'}</p>
            <p className="text-white">Addresses:</p>
            <ul className="text-white">
              {user.addresses.length > 0 ? (
                user.addresses.map((address, idx) => (
                  <li key={idx}>{address}</li>
                ))
              ) : (
                <li>No address available</li>
              )}
            </ul>
          </div>
        ))}
      </div> */}
    // </div> 
    
  )
}

export default UsersTable
