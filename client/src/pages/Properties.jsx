import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const fetchPropertyWithSellerDetails = async (id) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/properties/${id}`
  );
  return data;
};
const fetchFilteredProperties = async (filters) => {
  console.log(filters);
  const validFilters = Object.keys(filters)
    .filter((key) => filters[key] !== '')
    .reduce((obj, key) => {
      obj[key] = filters[key];
      return obj;
    }, {});

  const params = new URLSearchParams(validFilters).toString();
  console.log(params);
  const { data } = await axios.get(
    `http://localhost:3000/api/properties/filter?${params}`
  );
  return data;
};
const Properties = () => {
  // const { data, error, isLoading, isFetching } = useQuery({
  //   queryKey: ['properties'],
  //   queryFn: fetchProperties,
  // });
  const [sellerDetails, setSellerDetails] = useState({});
  const handleSellerDetails = async (propertyId) => {
    const data = await fetchPropertyWithSellerDetails(propertyId);
    const seller = data.data.seller;
    setSellerDetails(seller);
  };
  const [filters, setFilters] = useState({
    minBhk: '',
    minArea: '',
    location: '',
    minBathrooms: '',
    minPrice: '',
    maxPrice: '',
  });
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ['filteredProperties', filters],
    queryFn: () => fetchFilteredProperties(filters),
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading properties</div>;
  }
  // Ensure the data structure matches what you expect
  // const properties = isFetching && data;
  // console.log(properties);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Trigger the query refetch by setting filters state
    setFilters((prev) => ({ ...prev }));
  };

  return (
    <div className='flex items-center'>
      <form
        onSubmit={handleSubmit}
        className='bg-indigo-500 w-[400px] h-[90vh] p-4'
      >
        <h2 className='text-xl font-bold mb-4'>Filter Properties</h2>
        <div className='mb-4'>
          <label className='block text-white mb-1'>BHK</label>
          <input
            type='number'
            name='minBhk'
            value={filters.minBhk}
            onChange={handleInputChange}
            className='w-full px-2 py-1 rounded'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-white mb-1'>Min Area (sq ft)</label>
          <input
            type='number'
            name='minArea'
            value={filters.minArea}
            onChange={handleInputChange}
            className='w-full px-2 py-1 rounded'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-white mb-1'>Location</label>
          <input
            type='text'
            name='location'
            value={filters.location}
            onChange={handleInputChange}
            className='w-full px-2 py-1 rounded'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-white mb-1'>Bathrooms</label>
          <input
            type='number'
            name='minBathrooms'
            value={filters.minBathrooms}
            onChange={handleInputChange}
            className='w-full px-2 py-1 rounded'
          />
        </div>
        <button
          type='submit'
          className='w-full bg-teal-500 py-2 rounded text-white'
        >
          Apply Filters
        </button>
      </form>
      <div className='h-[90vh] flex-grow bg-slate-500 p-[3rem] overflow-y-auto grid-cols-3'>
        {!isFetching &&
          data.data.map((property) => (
            <div
              key={property._id}
              className='mb-4 p-4 bg-white rounded shadow flex items-center gap-[200px]'
            >
              <div>
                <p className='text-xl font-bold'>{property.title}</p>
                <p className='text-sm'>{property.description}</p>
                <p className='text-sm'>BHK: {property.bhk}</p>
                <p className='text-sm'>Area: {property.area} sq ft</p>
                <p className='text-sm'>Bathrooms: {property.bathrooms}</p>
                <p className='text-sm'>
                  Hospitals nearby: {property.hospitalsNearby}
                </p>
                <p className='text-sm'>
                  Colleges nearby: {property.collegesNearby}
                </p>
              </div>
              <div>
                <p className='text-xl font-bold'>Seller Details</p>
                <p>Seller name: {sellerDetails?.name}</p>
                <p>Seller email: {sellerDetails?.email}</p>
                <p>Seller phone number: {sellerDetails?.phoneNumber}</p>
              </div>
              <button
                className='bg-blue-400 rounded-md p-2'
                onClick={() => handleSellerDetails(property._id)}
              >
                See Seller Details
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Properties;
