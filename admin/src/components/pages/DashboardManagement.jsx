const DashboardManagement = () => {
  return (
    <div className="w-full">
      {/* Container lai max-width rakheko */}
      <div className="max-w-5xl mx-auto px-0">
        {/* Dashboard Heading */}
        <h1 className="text-3xl font-bold directi mb-10">Dashboard</h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          {/* Province */}
          <div
            className="bg-blue-500 text-white rounded-xl px-6 py-12 shadow-md
                          transform transition duration-300 hover:-translate-y-1 hover:scale-105"
          >
            <p className="text-base opacity-80">Total Provinces</p>
            <h2 className="text-4xl font-bold mt-6">0</h2>
          </div>

          {/* District */}
          <div
            className="bg-green-500 text-white rounded-xl px-6 py-12 shadow-md
                          transform transition duration-300 hover:-translate-y-1 hover:scale-105"
          >
            <p className="text-base opacity-80">Total Districts</p>
            <h2 className="text-4xl font-bold mt-6">0</h2>
          </div>

          {/* Branch */}
          <div
            className="bg-purple-500 text-white rounded-xl px-6 py-12 shadow-md
                          transform transition duration-300 hover:-translate-y-1 hover:scale-105"
          >
            <p className="text-base opacity-80">Total Branches</p>
            <h2 className="text-4xl font-bold mt-6">0</h2>
          </div>

          {/* Manager */}
          <div
            className="bg-orange-500 text-white rounded-xl px-6 py-12 shadow-md
                          transform transition duration-300 hover:-translate-y-1 hover:scale-105"
          >
            <p className="text-base opacity-80">Total Managers</p>
            <h2 className="text-4xl font-bold mt-6">0</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardManagement;
