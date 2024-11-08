const ProfileInfo = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600">Business name:</label>
          <input
            type="text"
            placeholder="Current business name"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-600">Phone number:</label>
          <input
            type="text"
            placeholder="Current phone number"
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <div className="">
        <button className="mt-4 px-4 py-2 bg-black text-white rounded">
          Update personal info
        </button>
      </div>
    </div>
  )
}

export default ProfileInfo
